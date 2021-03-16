<template>

  <div class="content" style="background-color:#F7F8FA">
    <div style="background:#8965E0;height:80px"></div>
    <div style="height:20px"></div>
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content" style="height:290px">
          <div style="height:60px"></div>
          <div style="margin-left:60px;margin-right:100px;height:220px">
            <div style="float:right;width:450px">
              <el-col :span="6">
                <p style="color:#2688BE;font-size:26px">{{paperNum}}</p>
                <p style="font-size:18px">papers</p>
              </el-col>
              <el-col :span="6" :offset="2">
                <p style="color:#2688BE;font-size:26px">{{citationNum}}</p>
                <p style="font-size:18px">citations</p>
              </el-col>
              <el-col :span="8" :offset="2">
                <p style="color:#2688BE;font-size:26px">{{indexNum}}</p>
                <p style="font-size:18px">H-index</p>
              </el-col>
            </div>
            <img :src="conferenceicon" style="float:left;heigth:60px;width:60px;">
                        <div style="float:right;margin-right:30px" @click="changestate()">
            <base-checkbox class="mb-3" v-model="switches" disabled>
                收藏
            </base-checkbox>
         </div>
            <p style="font-size:36px;margin-left:30px">{{conferenceName}}</p>

            <!-- <i class="nc-icon nc-atom" style="font-size:20px"></i> -->
            <p style="font-size:18px;color:grey;">{{fullName}}</p>
            <br>


            <button style="margin-left:10px;border:none;width:160px;height:50px;background-color:#2688BE">
              <div style="font-size:28px;color:white">source</div>

            </button>

          </div>

          <!-- <div style="height:100px;background-color:#F9FAFC">
            <el-col :span="7" :offset="6">
              <div style="margin-top:5px">
                <div style="font-size:32px">{{paperNum}}</div>
               <div>paper</div>
              </div>
            </el-col>
            <el-col :span="4" :offset="2">
              <div style="margin-top:5px">
               <div style="font-size:32px">{{citationNum}}</div>
               <div>citation</div>
               </div>
             </el-col>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7" :offset="1">
        <div class="grid-content" style="height:400px">
          <div id="chart1" style="height:400px;width:100%"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content" style="height:400px">
          <div id="chart2" style="height:400px;width:100%"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content" style="height:400px">
          <div id="chart3" style="height:400px;width:100%"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LTable from '@/components/Table.vue'
  import conferenceicon from '@/assets/img/conference.png'
  import button from '@/assets/img/fake.png'

  var echarts = require('echarts')

  export default {

    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        conferenceicon: conferenceicon,
        button: button,
        id: this.$route.params.id,
        paperNum: 0,
        conferenceName: '1',
        citationNum: 0,
        indexNum: 0,
        fullName: 'a',
        id:-1,
        userId:-1,
        switches:false,
        dires: [
          { name: 'Runoob' },
          { name: 'Google' },
          { name: 'Taobao' }
        ],
        relatedAuthor: [
          { name: 'Runoob' },
          { name: 'Google' },
          { name: 'Taobao' }
        ],

      }
    },
    mounted () {
      let id = this.$route.params.id
      this.addViewHistory(id)
      var _this = this
      

      _this.userId=localStorage.getItem('userId')
      this.$axios.get('http://47.100.55.51:3180/entity/publicationPortrait', {
        params: {
          publicationTitle: id
        }

      }).then(function (response) {
        console.log(response.data.data)
        _this.conferenceName = id.toUpperCase()
        _this.fullName = response.data.data.publicationTitle
        _this.paperNum = response.data.data.articleNum
        _this.citationNum = response.data.data.reference
        _this.indexNum = response.data.data.hindex
      }).catch(function (error) {
        console.log('获得画像失败！')
        console.log(error)
      })

      if(_this.conferenceName=="ASE"){
        _this.id=0
      }
      else{
        _this.id=1
      }

      this.$axios.post('http://47.100.55.51:3180/user/isEntityStar',
          {
               "userId":this.userId,
               "entityType":"2",
               "entityId":this.id
           }
        ).then(function (response) {
          console.log(response.data.data);
          // this.starstate=response.data.data;
          if(response.data.data==0){
            _this.switches=false;
          }
          else{
            _this.switches=true;
          }
        }).catch(function (error) {
          console.log("获得相关收藏失败！");
          console.log(error);
        })

      this.drawchart1()
      this.drawchart2()
      this.drawchart3()

    },
    methods: {
             changestate(){
        if(this.switches==true){
          this.switches=false;
           this.$axios.post('http://47.100.55.51:3180/user/delSavedEntityByType',
          {
               "userId":this.userId,
               "entityType":"3",
               "entityId":this.id
           }
      ).then(function(response){
          
        }).catch(function(error){

        });
        }
        else if(this.switches==false){
          this.switches=true;
           this.$axios.post('http://47.100.55.51:3180/user/saveEntity',
          {
               "userId":this.userId,
               "entityType":"2",
               "entityId":this.id
           }
      ).then(function(response){
         
        }).catch(function(error){

        });
        }
        console.log(this.switches);
      },
      drawchart1 () {
        let id = this.$route.params.id
        let x = []
        let y = []

        this.$axios.get('http://47.100.55.51:3180/chart/hindexPerYearByPublication', {
          params: {
            publicationTitle: id
          }
        }).then(function (response) {
          console.log(response.data.data)
          var mychart1 = echarts.init(document.getElementById('chart1'))
          x = response.data.data.yearList
          console.log(x)
          y = response.data.data.hindexList
          console.log('成功获得引用！')
          let option = {
            title: {
              text: 'H-index amount statics'
            },
            tooltip: {},
            legend: {},
            xAxis: {
              data: x
            },
            yAxis: {},
            series: [
              {

                type: 'bar',
                data: y,
                itemStyle: {
                  normal: {
                    color: '#2688BE',//设置柱子颜色
                    label: {
                      show: true,//柱子上显示值
                      position: 'top',//值在柱子上方显示
                      textStyle: {
                        color: '#2688BE'//值得颜色
                      }
                    }
                  }
                },
                barWidth: 40

              }
            ]
          }
          mychart1.setOption(option)
        }).catch(function (error) {
          console.log('获得引用失败！')
          console.log(error)
        })
      },
      drawchart2 () {
        let id = this.$route.params.id
        let x = []
        let y = []

        this.$axios.get('http://47.100.55.51:3180/chart/articlePerYearByPublication', {
          params: {
            publicationTitle: id
          }
        }).then(function (response) {
          console.log(response.data.data)
          var mychart2 = echarts.init(document.getElementById('chart2'))
          x = response.data.data.yearList
          console.log(x)
          y = response.data.data.articleNumList
          console.log('成功获得引用！')
          let option = {
            title: {
              text: 'paper amount statics'
            },
            tooltip: {},
            legend: {},
            xAxis: {
              data: x
            },
            yAxis: {},
            series: [
              {

                type: 'bar',
                data: y,
                itemStyle: {
                  normal: {
                    color: '#2688BE',//设置柱子颜色
                    label: {
                      show: true,//柱子上显示值
                      position: 'top',//值在柱子上方显示
                      textStyle: {
                        color: '#2688BE'//值得颜色
                      }
                    }
                  }
                },
                barWidth: 40

              }
            ]
          }
          mychart2.setOption(option)
        }).catch(function (error) {
          console.log('获得引用失败！')
          console.log(error)
        })
      },
      drawchart3 () {
        let id = this.$route.params.id
        let x = []
        let y = []

        this.$axios.get('http://47.100.55.51:3180/chart/referencePerYearByPublication', {
          params: {
            publicationTitle: id
          }
        }).then(function (response) {
          console.log(response.data.data)
          var mychart3 = echarts.init(document.getElementById('chart3'))
          x = response.data.data.yearList
          console.log(x)
          y = response.data.data.referenceList
          console.log('成功获得引用！')
          let option = {
            title: {
              text: 'citation amount statics'
            },
            tooltip: {},
            legend: {},
            xAxis: {
              data: x
            },
            yAxis: {},
            series: [
              {

                type: 'bar',
                data: y,
                itemStyle: {
                  normal: {
                    color: '#2688BE',//设置柱子颜色
                    label: {
                      show: true,//柱子上显示值
                      position: 'top',//值在柱子上方显示
                      textStyle: {
                        color: '#2688BE'//值得颜色
                      }
                    }
                  }
                },
                barWidth: 40

              }
            ]
          }
          mychart3.setOption(option)
        }).catch(function (error) {
          console.log('获得引用失败！')
          console.log(error)
        })
      },
      addViewHistory (publicationTitle) {
        const _this = this
        let publicationId = -1
        switch (publicationTitle) {
          case 'ASE':
            publicationId = 0
            break
          case 'ICSE':
            publicationId = 1
            break
          default:
            break
        }
        let entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 2,
          entityId: publicationId,
          time: new Date().getTime()
        }
        this.$axios.post('http://47.100.55.51:3180/user/addHistory', entityInfo).then(function (response) {
        }).catch(function (error) {
          _this.$notify({
            type: 'danger',
            title: '添加浏览记录失败!'
          })
        })
      }
    }
  }

</script>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: white;
  }

  .bg-purple {
    background: white;
    -webkit-box-shadow: rgb(145, 144, 144) 0px 0px 10px;
    -moz-box-shadow: rgb(145, 144, 144) 0px 0px 10px;
    box-shadow: rgb(145, 144, 144) 0px 0px 10px;

  }

  .bg-purple-light {
    background: white;
  }

  .grid-content {
    background: white;
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: white;
  }
</style>
