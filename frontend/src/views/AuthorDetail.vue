<template>

  <div class="content" style="background-color:#F7F8FA">
    <div style="background:#8965E0;height:90px"></div>
    <div style="height:50px"></div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="1">
        <div class="grid-content" style="height:380px">
          <div style="height:60px"></div>
          <div style="margin-left:50px;margin-right:100px;height:220px">
            <img :src="authoricon" style="float:left;heigth:120px;width:120px;margin-top:40px">
            <!-- <img :src="button" style="float:right;margin-top:0px;width:180px"> -->

            <div style="float:right" @click="changestate()">
              <base-checkbox class="mb-3" v-model="switches" disabled>
                收藏
              </base-checkbox>
            </div>
            <p style="font-size:32px">{{authorName}}</p>
            <i class="nc-icon nc-atom" style="font-size:20px"></i>
            <p class="hov" style="font-size:15px;color:grey;display:inline" @click="viewAuthorAff(authorAff)">
              {{authorAff}}</p>
            <br>
            <br>
            <i class="nc-icon nc-align-center" style="font-size:20px"></i>
            <p style="font-size:15px;color:grey;display:inline;">Main research directions</p>
            <br>
            <div v-for="(dire,index) in dires" style="color:grey; display:inline;background-color:#F5F5F5" :key="index">
              {{dire}};
            </div>

          </div>
          <div style="height:100px;background-color:#F9FAFC">
            <el-col :span="4" :offset="4">
              <div style="margin-top:5px">
                <div style="font-size:32px;color:#2688BE">{{paperNum}}</div>
                <div>paper</div>
              </div>
            </el-col>
            <el-col :span="4" :offset="2">
              <div style="margin-top:5px">
                <div style="font-size:32px;color:#2688BE">{{citationNum}}</div>
                <div>citation</div>
              </div>
            </el-col>
            <el-col :span="7" :offset="2">
              <div style="margin-top:5px">
                <div style="font-size:32px;color:#2688BE">{{activationNum}}</div>
                <div>activation</div>
              </div>
            </el-col>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content" style="height:380px" id="box12">
          <div style="margin-left:30px;">
            <div style="height:20px"></div>
            <div style="font-size:20px;margin-left:10px">Author Map</div>
            <img :src="authormap" style="height:320px;width:340px;cursor: pointer" @click="getAuthorMap()">
          </div>
        </div>
      </el-col>
    </el-row>
    <!--    <el-row style="height: 1000px;width: 1000px" >-->
    <!--      <div  class="echartLayout" id="container" style="width: 1000px;height: 1000px;z-index: 999">-->
    <!--        <RelationGraph class="relationGraph"-->
    <!--                       :chart-data="realationNodes"-->
    <!--                       :chart-link="realationLink"-->
    <!--                       v-if="getdata"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </el-row>-->
    <el-row :gutter="20">
      <el-col :offset="1" :span="22">
        <!-- <div class="grid-content" style="height:200px">
          <p style="font-size:26px;margin-left:20px;">related authors</p>
          <el-col :span="8">
            <div class="grid-content" style="cursor: pointer;height:135px"
                 @click="viewRelateAuthor(relatedAuthor[0].authorId)">
              <img :src="authoricon" style="float:left;heigth:120px;width:120px;margin-top:5px;float:left">
              <div style="height:50px"></div>
              <div style="font-size:20px">{{relatedAuthor[0].authorName}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content" style="cursor: pointer;height:135px"
                 @click="viewRelateAuthor(relatedAuthor[1].authorId)">
              <img :src="authoricon" style="float:left;heigth:120px;width:120px;margin-top:5px">
              <div style="height:50px"></div>
              <div style="font-size:20px">{{relatedAuthor[1].authorName}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content" style="cursor: pointer;height:135px"
                 @click="viewRelateAuthor(relatedAuthor[2].authorId)">
              <img :src="authoricon" style="float:left;heigth:120px;width:120px;margin-top:5px">
              <div style="height:50px"></div>
              <div style="font-size:20px">{{relatedAuthor[2].authorName}}</div>
            </div>
          </el-col>
        </div> -->
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content" style="height:400px">
          <div id="box" style="height:400px;width:100%"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="22" :offset="1">
         <div style="font-size:26px;color:grey;margin-bottom:15px">Interest changes</div>
        <div class=" flexbox" style="height:150px">
         
          <div v-for="(item,index) in aithorInterst1" :key="index" class="flexinnerbox" style="height:150px;width:150px">
                <div style="height:74px;text-aligh:center;line-height:74px;font-size:24px">{{item.year}}</div>
              
                <div style="height:74px;text-aligh:center;line-height:74px"> <p> {{item.keyword}}</p></div>
            
            
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3">
        <div style="font-size:26px;color:grey">papers</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-for="(paper,index) in papers" :key="index">
      <el-col :span="18" :offset="3">
        <div class="grid-content" style="height:250px">
          <div style="height:20px"></div>
          <div
            style="background-color:#2688BE;width:36px;height:36px;margin-left:20px;float:left;margin-right:10px"></div>
          <a style="display:inline;font-size:26px;width:100px;color:black" :href="paper.pdfLink">
            {{paper.docTitle}}
          </a>
          <br>
          <div style="height:10px"></div>
          <div style="display:inline;font-style:italic;margin-left:20px;font-size:18px">{{paper.publicationTime}}</div>
          <div style="display:inline;margin-left:10px;color:grey;font-style:italic" class="hov"
               @click="viewPublication(paper.publicationTitle)">{{paper.publicationTitle}}
          </div>
          <br>
          <div style="margin-left:20px">
            <div v-for="(author,index) in paper.authors" style="color:#2688BE; display:inline;font-size:18px" class="hov" @click="viewAuthor(author.authorId)" :key="index">
              {{author.authorName}}&nbsp;
            </div>
          </div>
          <hr>
          <div style="float:right;margin-right:50px;font-size:20px;color:grey;postition:fixed;margin-bottom:10px">
            citations({{paper.refs}})
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LTable from '@/components/Table.vue'
  import authoricon from '@/assets/img/autho.png'
  import button from '@/assets/img/fake.png'
  import authormap from '@/assets/img/authormap2.png'
  import BaseNav from '@/components/BaseNav'
  import CloseButton from '@/components/CloseButton'

  var echarts = require('echarts')
  var axios = require('axios')
  export default {

    components: {
      LTable,
      ChartCard,
      StatsCard,
      BaseNav,
      CloseButton
    },
    props: {
      chartData: {
        type: Array,
        default: () => []
      },
      chartLink: {
        type: Array,
        default: () => []
      },
    },
    data () {
      return {
        getdata: false,
        myChart: null,
        authoricon: authoricon,
        button: button,
        authormap: authormap,
        paperNum: 0,
        citationNum: 0,
        authorid: this.$route.params.id,
        authorName: '0',
        authorAff: '0',
        activationNum: 0,
        relationNodes: [],
        relationLinks: [],
        switches: false,
        starstate: -1,
        userId: -1,
        id: -1,
        papers: [],
        temp: '1',
        dires: [],
        relatedAuthor: [],
        aithorInterst1:[
        {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },
                {
          year:'',
          keyword:''
        },

        ]
      }
    },
    methods: {
      changestate () {
        if (this.switches == true) {
          this.switches = false
          this.$axios.post('http://47.100.55.51:3180/user/delSavedEntityByType',
            {
              'userId': this.userId,
              'entityType': '0',
              'entityId': this.id
            }
          ).then(function (response) {

          }).catch(function (error) {

          })
        } else if (this.switches == false) {
          this.switches = true
          this.$axios.post('http://47.100.55.51:3180/user/saveEntity',
            {
              'userId': this.userId,
              'entityType': '0',
              'entityId': this.id
            }
          ).then(function (response) {

          }).catch(function (error) {

          })
        }
        console.log(this.switches)
      },
      viewRelateAuthor: function (e) {
        this.$router.push('/author/' + e)
        location.reload()
      },
      getAuthorMap () {
        let authorid = this.$route.params.id
        this.$router.push('/echartsAuthor/' + authorid)
      },
      viewPublication: function (e) {
        if (e.indexOf('ASE') != -1) {
          this.$router.push('/conference/ASE')
        } else {
          this.$router.push('/conference/ICSE')
        }
      },
      viewAuthor (e) {
        this.$router.push('/author/' + e)
        location.reload()
      },
      viewAuthorAff (e) {
        var _this = this
        console.log(e)
        this.$axios.get('http://47.100.55.51:3180/utils/getAffiliationIdByName', {
          params: {
            affiliationName: e
          }
        }).then(function (response) {
          console.log('sdf' + response.data.data)
          let temo = response.data.data
          _this.$router.push('/afflication/' + temo)
        }).catch(function (error) {

        })
      },

      drawchart () {
        let authorid = this.$route.params.id
        let x = []
        let y = []
        // console.log(authorid);
        this.$axios.get('http://47.100.55.51:3180/chart/referencePerYearByAuthor', {
          params: {
            authorId: authorid
          }
        }).then(function (response) {
          console.log(response.data.data)
          x = response.data.data.yearList
          console.log('要改动的表格年份',x)
          y = response.data.data.referenceList
          console.log('要改动的表格年份对应数量',y)
          var mychart3 = echarts.init(document.getElementById('box'))
          let startPosition=0;
          for(let i = 0;i<x.length;i++){
            if(y[i]==0){
              startPosition++;
            }else{
              break;
            }
          }
          x=x.slice(startPosition,x.length-1);
          y=y.slice(startPosition,y.length-1);
          let option = {
            title: {
              text: 'citation amount statics'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['充值', '消费']
            },

            calculable: true,

            xAxis: [
              {
                axisLabel: {
                  rotate: 30,
                  interval: 0
                },
                axisLine: {},
                type: 'category',

                data: x,
              }
            ],
            yAxis: [
              {

                type: 'value',
                axisLine: {}
              }
            ],
            series: [
              {

                type: 'line',
                symbol: 'none',

                color: ['#66AEDE'],
                data: y
              },

            ]
          }
          mychart3.setOption(option)
        }).catch(function (error) {
          console.log('获得引用失败！')
          console.log(error)
        })
      },
      getRandomColor () {
        console.log('#' + Math.floor(Math.random() * 16777215).toString(16))
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
      },
      initEchart () {
        var getRandomColor = function () {
          return '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
        let dom = document.getElementById('container')
        this.myChart = echarts.init(dom)
        this.chartData = this.dataEChart()
        this.chartLink = this.linkEChart()
        this.chartData.forEach(function (node) {
          node.itemStyle = {
            normal: {
              //symbolSize: (parseFloat(node.symbolSize)+2)*100,
              color: getRandomColor()
            }
          }
        })
        this.chartLink.forEach(function (link) {
          link.lineStyle = {
            normal: {
              width: 5,
              curveness: 0.3,
              opacity: 0.9
            },
            emphasis: {
              width: 10
            }
          }
          link.label = {
            normal: {
              show: true,
              formatter: function (link) {
                return link.data.value
              }
            }
          }
        })
        let option = {
          tooltip: {
            show: false
          },
          series: [
            {
              edgeLabel: {
                normal: {
                  formatter: '{c}',
                  show: true
                }
              },
              force: {
                repulsion: 2000
              },
              layout: 'force',
              // circular:{
              //     rotateLabel:false
              // },
              forceNodeAdjancy: 'true',
              roam: true,
              focusNodeAdjacency: true,
              itemStyle: {
                normal: {
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
              label: {
                normal: {
                  show: true
                }
              },
              //头像
              symbol: 'circle',
              //symbol: `image://${imgSrc}`,
              symbolSize: 86,
              type: 'graph',
              links: this.chartLink,
              data: this.chartData
            }
          ]
        }
        this.myChart.setOption(option)
        this.myChart.on('click', function (params) {
          console.log(params.data)//获取点击的头像的数据信息
        })
        // console.log(this.chartLink)
      },
      /**
       * 数据集合
       */
      dataEChart () {
        var _this = this
        this.$axios.get('http://47.100.55.51:3180/chart/linkedDataByAuthor', {
          params: {
            authorId: this.$route.params.id
          }
        }).then(function (response) {
          console.log('responseNodes:', response)
          _this.relationNodes = response.data.data.nodes
          let data = _this.relationNodes
          data.forEach(o => {
            o.id = String(o.id)
          })
          console.log('data:', data)
          return data
        })

      },
      /**
       * 关系数据集合
       */
      linkEChart () {
        var links = []
        var _this = this
        this.$axios.get('http://47.100.55.51:3180/chart/linkedDataByAuthor', {
          params: {
            authorId: this.$route.params.id
          }
        }).then(function (response) {
          console.log('responseLink:', response)
          _this.relationLinks = response.data.data.edges
          let dataLink = _this.relationLinks
          dataLink.forEach(o => {
            o.value = String(o.value)
            o.source = String(o.source)
            o.target = String(o.target)
          })
          console.log('datalinks:', dataLink)

          _this.getdata = true
          return dataLink
        })

      },
      addViewHistory (authorId) {
        const _this = this
        let entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 0,
          entityId: authorId,
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
    },
    mounted () {
      var _this = this
      let id = this.$route.params.id
      // this.switches=true;
      let userid = localStorage.getItem('userId')
      _this.userId = userid
      _this.id = id
      console.log(userid)
      console.log(id)
      this.addViewHistory (_this.id)
      this.starstate = -1
      this.$axios.post('http://47.100.55.51:3180/user/isEntityStar',
        {
          'userId': this.userId,
          'entityType': '0',
          'entityId': this.id
        }
      ).then(function (response) {
        console.log(response.data.data)
        _this.starstate = response.data.data
        // this.starstate=response.data.data;
        if (_this.starstate == 0) {
          _this.switches = false
        } else {
          _this.switches = true
        }
      }).catch(function (error) {
        console.log('获得相关收藏失败！')
        console.log(error)
      })
      this.$axios.get('http://47.100.55.51:3180/entity/authorPortrait', {
        params: {
          authorId: id
        }

      }).then(function (response) {
        console.log("获取作者画像response.data.data::",response.data.data)
        let tem = []
        _this.authorName = response.data.data.name
        _this.authorAff = response.data.data.affiliations[0]
        tem = response.data.data.keywords
        _this.paperNum = response.data.data.publicationNum.aseNum + response.data.data.publicationNum.icseNum
        _this.citationNum = response.data.data.reference
        _this.activationNum = response.data.data.activation
        if (tem.length <= 5) {
          _this.dires = tem
        } else {
          for (var i = 0; i < 5; i++) {
            _this.dires.push(tem[i])
          }
        }

        console.log("获取作者画像的response.data.data.name",response.data.data.name)
      }).catch(function (error) {
        console.log('获得作者画像失败！')
        console.log(error)
      })
      //兴趣变化
      this.$axios.get('http://47.100.55.51:3180/entity/getAuthorInterestByTime', {
        params: {
          authorId: id
        }
      }).then(function (response) {
        console.log("获取兴趣变化.data.data",response.data.data)
        let tmpdata = response.data.data;
        let index=0;
    
        for(let i in tmpdata){
            _this.aithorInterst1[index].year=i;
            _this.aithorInterst1[index].keyword=tmpdata[i];
            index++;
        }

      }).catch(function (error) {
        console.log('获取兴趣变化失败')
        console.log(error)
      })

      this.$axios.get('http://47.100.55.51:3180/entity/articleListByAuthor', {
        params: {
          authorId: id
        }
      }).then(function (response) {
        console.log("获取作者文章列表.data.data",response.data.data)
        _this.papers = response.data.data
        for (var i = 0; i < _this.papers.length; i++) {
          if (_this.papers[i].docTitle.length > 65) {
            console.log('over:' + _this.papers[i].docTitle)
            _this.papers[i].docTitle = _this.papers[i].docTitle.slice(0, 65) + '...'
          }
        }
      }).catch(function (error) {
        console.log('获得作者文章失败！')
        console.log(error)
      })

      // this.$axios.get('http://47.100.55.51:3180/entity/relatedAuthors', {
      //   params: {
      //     authorId: id
      //   }
      // }).then(function (response) {
      //   console.log("相关作者.data",response.data)
      //   _this.relatedAuthor = response.data.data

      // }).catch(function (error) {
      //   console.log('获得相关作者失败！')
      //   console.log(error)
      // })

      this.$axios.get('http://47.100.55.51:3180/chart/referencePerYearByAuthor', {
        params: {
          authorId: id
        }

      }).then(function (response) {
        console.log("获取该作者每年引用数量.data.data",response.data.data)

      }).catch(function (error) {
        console.log('获得该作者每年引用数量失败！')
        console.log(error)
      })
      this.drawchart()
      this.initEchart()
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

  .hov:hover {
    text-decoration: underline;
    
  }

  #box12:hover {

    cursor: pointer;
    transition: 0.2s;
    transition-duration: 1s;
    transform: scale(1.1);
    transition-timing-function: ease-in-out;
  }
    .flexbox{
   
    height:200px;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .flexinnerbox{
    background: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: black;
    border: rgba(0, 0, 0, 0.05) 1px solid;
  }
 
</style>
