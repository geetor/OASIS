<template>
    
    <div>
      <div style="height:80px;background-color: #8965E0"></div>
      <div class="predictArea">
          <div class="iparea">
            please input scholors names: scholor1:
            <el-autocomplete v-model="fromAuthor" :fetch-suggestions="querySearchAsync1" placeholder="scholor1" @select="handleSelect1" >
            </el-autocomplete>
            scholor2:
            <el-autocomplete v-model="toAuthor" :fetch-suggestions="querySearchAsync2" placeholder="scholor2" @select="handleSelect2">
            </el-autocomplete>
            <el-button style="background-color: #8965E0;color: white" @click="predict">predict</el-button>
          </div>
          <div class="resarea" v-if="gopredict">
            {{fromAuthor}} and {{toAuthor}} cooperation point is：{{predictPoint}}
          </div>
      </div>
      <div class="echartLayout" id="container"></div>
    </div>


</template>
<script>
  import echarts from 'echarts'
  import $ from  'jquery';

export default {
  name:'echartsAuthor',
  props:{
    chartData:{
      type:Array,
      default: ()=>[]
    },
    chartLink:{
      type:Array,
      default: ()=>[]
    },
  },
  data() {
    return {
      gopredict:false,
      predictPoint:0.45,
      fromAuthor:"",
      fromAuthorid:0,
      toAuthor:"",
      toAuthorid:0,
      authorName:"",
      myChart: null,
      relationNodes:{},
      relationLinks:{},
      programs: {},
    }
  },
  mounted() {
    this.initEchart()

  },
  watch:{
    fromAuthor(val){
      this.gopredict=false;
    },
    toAuthor(val){
      this.gopredict=false;
    }
  },
  methods: {
    getRandomColor(){
      console.log('#'+Math.floor(Math.random()*16777215).toString(16));
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    },
    initEchart() {
      var getRandomColor = function(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
      }
      let dom = document.getElementById("container");
      this.myChart = echarts.init(dom);
      this.dataEChart();
      this.chartData=this.relationNodes;
      // this.chartLink=this.linkEChart();
      this.chartLink=this.relationLinks;
      this.chartData.forEach(function (node) {
        if (node.symbolSize>200){
          node.symbolSize=200;
        }
        node.itemStyle = {
          normal: {
            symbolSize: (parseFloat(node.symbolSize)+5)*100,
            color: getRandomColor()
          }
        };
      });
      this.chartLink.forEach(function (link) {
        link.lineStyle={
          normal: {
            width: 5,
            curveness: 0.3,
            opacity: 0.9,
            value:link.value/4800,
          },
          emphasis: {
            width:10
          }
        };
        link.label={
          normal:{
            show:true,
            formatter:function (link) {
              return link.data.value;
            }
          }
        }
      });
      let option = {
        tooltip:{
          show:false
        },
        series: [
          {
            edgeLabel: {
              normal: {
                formatter:"{c}",
                show:true
              }
            },
            force:{
              repulsion:6500,

            },
            layout:'force',
            // circular:{
            //     rotateLabel:false
            // },
            forceNodeAdjancy:'true',
            roam:true,
            focusNodeAdjacency: true,
            itemStyle:{
              normal:{
                color: this.getRandomColor()
              },
              //鼠标放上去有阴影效果
              emphasis: {
                shadowColor: '#3721db',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
              },
            },
            label:{
              normal:{
                show:true
              }
            },
            //头像
            symbol:'circle',
            //symbol: `image://${imgSrc}`,
            symbolSize:86,
            type:'graph',
            links: this.chartLink,
            data:this.chartData
          }
        ]
      };
      this.myChart.setOption(option);
      var _this=this;
      this.myChart.on('click', function (params) {
        console.log(params.data)//获取点击的头像的数据信息
        var id=params.data.id;//获取作者id
        //TODO
        id=parseInt(id);
        console.log("tid:",id);
        //跳转到对应的author
        _this.$router.push('/author/'+id);
        location.reload();
      });
    },
    /**
     * 数据集合
     */
    /**
     * 数据集合
     */
    dataEChart(){
      var _this=this;
      var tid=this.$route.params.id;
      if (tid!=999999999) {
        $.ajax({
          type: "get",
          async: false,
          url: "http://47.100.55.51:3180/chart/linkedDataByAuthor",
          data: {
            authorId: tid
          },
          success: function (response) {
            console.log("responseNodes and links:", response);
            _this.relationNodes = response.data.nodes;
            _this.relationLinks = response.data.edges;
            // let data=_this.relationNodes;
            _this.relationNodes.forEach(o => {
              o.id = String(o.id);
            });
            _this.relationLinks.forEach(o => {
              o.value = String(o.value);
              o.source = String(o.source);
              o.target = String(o.target);
            });
            console.log("nodes:", _this.relationNodes);
            console.log("links:", _this.relationLinks)
          }
        })
      }
      else {//所有作者的关系图
        $.ajax({
          type: "get",
          async: false,
          url: "http://47.100.55.51:3180/chart/totalAuthorLinkedData",
          success: function (response) {
            console.log("responseNodes:", response);
            _this.relationNodes = response.data.nodes;
            _this.relationLinks = response.data.edges;
            // let data=_this.relationNodes;
            _this.relationNodes.forEach(o => {
              o.id = String(o.id);
            });
            _this.relationLinks.forEach(o => {
              o.value = String(o.value);
              o.source = String(o.source);
              o.target = String(o.target);
            });
            _this.relationNodes=_this.relationNodes.slice(0,300);
            _this.relationLinks= _this.relationLinks.slice(0,300);
            console.log("nodes:", _this.relationNodes);
            console.log("links:", _this.relationLinks);
          }
        })
      }
    },
    //选择学者
    handleSelect1(item){
        console.log("item1",item)
        this.fromAuthorid=item.authorId;
        this.fromAuthor=item.authorName;
        console.log(this.fromAuthorid," ",this.fromAuthor)
    },
    handleSelect2(item){
        console.log("item2",item)
        this.toAuthorid=item.authorId;
        console.log(this.toAuthorid,this.toAuthor)
    },
    //自动匹配学者
    querySearchAsync1:function(queryString, callback) {  
          var list = [{}];  
          var that = this;
          this.$axios.get('http://47.100.55.51:3180/utils/getPredictUser',{
            params: {
              authorName:that.fromAuthor
            } 
          }).then((response)=>{  
              console.log(response.data);
              for(let i of response.data.data){  
                  i.value = i.authorName;
                  i.uid=i.authorId;
              }  
              list = response.data.data;  
              callback(list);  
          }).catch((error)=>{  
          console.log(error);  
          });  
        },
        querySearchAsync2:function(queryString, callback) {  
          var list = [{}];  
          var that = this;
          this.$axios.get('http://47.100.55.51:3180/utils/getPredictUser',{
            params: {
              authorName:that.toAuthor
            } 
          }).then((response)=>{
              console.log(response.data);
              for(let i of response.data.data){  
                  i.value = i.authorName;
                  i.uid=i.authorId;
              }  
              list = response.data.data;
              console.log("list",list)  ;
              callback(list);  
          }).catch((error)=>{  
          console.log(error);  
          });  
        },
  predict:function(){
    var startid=this.fromAuthorid;
    var endid=this.toAuthorid;
    var checklinks=[];
    var checknodes=[];
    this.gopredict=true;
    var _this=this;
    console.log("predict测试作用域",endid);
    $.ajax({
          type: "get",
          async: false,
          url: "http://47.100.55.51:3180/chart/linkedDataByAuthor",
          data: {
            authorId: startid
          },
          success: function (response) {
            console.log("startid的相关相应：", response);
            _this.checknodes = response.data.nodes;
            _this.checklinks = response.data.edges;
            var point=0.00;
            for(var node=0;node< _this.checklinks.length;node++){
              console.log(_this.checklinks[node]);
              if(_this.checklinks[node].target==endid){
                point=_this.checklinks[node].value/21;
                console.log("point get:",point);
                point=point.toFixed(2);
                console.log(point)
                break;
              }
            }
            _this.predictPoint=point;
            console.log("check nodes:", _this.checknodes);
            console.log("check links:", _this.checklinks)
          }
        })
  }
  }

  
}
</script>
<style>
 #container{
   width: 900px;
   height: 600px;
   margin: 30px auto;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   overflow: hidden;
 }
 .iparea
 ,.resarea{
   padding: 10px;
   margin: 30px auto;
   width: 900px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   overflow: hidden;
   text-align: center;
 }
 .inputname{
   display: inline-block;
   width: 240px;
 }
</style>