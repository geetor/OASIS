<template>

  <div class="content" style="background-color:#F7F8FA">
    <div style="background:#8965E0;height:80px"></div>
    <div style="height:20px"></div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="1">
        <div class="grid-content " style="height:300px">
          <br>
          <br>
          <div style="float:right;margin-right:30px" @click="changestate()">
            <base-checkbox class="mb-3" v-model="switches" disabled>
                收藏
            </base-checkbox>
         </div>
          <div style="margin-left:100px;margin-right:100px">
            <img :src="citation" style="height:100px;width:100px">
            <div style="display:inline;margin-left:30px;font-size:30px">{{keywordName}}</div>
            <div style="height:20px"></div>
            <div style="margin-left:30px;font-size:26px;display:inline">activation</div>
            <div style="display:inline;margin-left:30px;color:#2688BE;font-size:30px">{{affActivation}}</div>
            <br>
          </div>
          <div>

          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content" style="height:300px">
          <br>
          <br>
          <br>
          <div style="margin-left:80px">
            <i class="nc-icon nc-notes" style="font-size:30px"></i>
            <div style="font-size:26px;display:inline;color:grey;margin-left:10px">papers</div>
            <div style="font-size:30px;display:inline;color:#2688BE;margin-left:60px">{{paperNum}}</div>
          </div>
          <br>
          <br>
          <div style="margin-left:80px">
            <i class="nc-icon nc-quote" style="font-size:30px"></i>
            <div style="font-size:26px;display:inline;color:grey;margin-left:10px">citation</div>
            <div style="font-size:30px;display:inline;color:#2688BE;margin-left:50px">{{citationNum}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11" :offset="1">
        <div class="grid-content " style="height:400px">
          <div id="box" style="height:400px;width:100%"></div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content" style="height:400px">
          <div id="box2" style="height:400px;width:100%"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11" :offset="1">
        <div class="grid-content " style="height:660px">
          <div>
            <div style="height:20px"></div>
            <img :src="affrank" style="height:60px;width:60px;margin-left:15%;margin-top:0px">
            <div style="display:inline;font-size:30px;margin-left:40px;margin-top:20px">Top 10 Afflication</div>
          </div>
          <el-table @row-click="openDetails1"
                    :data="topaff"
                    style="width: 70%;margin-left:10%">
            <el-table-column

              label="rank"
              width="200">
              <template slot-scope="scope">
                        <span style="font-size:20px">
                        {{ scope.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column

              label="name"
              width="250"
            >
              <template slot-scope="scope">
                        <span
                          style="color:#2688BE;font-size:20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        {{ scope.row.affiliationName }}</span>
              </template>


            </el-table-column>

          </el-table>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content" style="height:660px">
          <div>
            <div style="height:20px"></div>
            <img :src="affrank" style="height:60px;width:60px;margin-left:15%;margin-top:0px">
            <div style="display:inline;font-size:30px;margin-left:40px;margin-top:20px">Top 10 Author</div>
          </div>
          <el-table @row-click="openDetails2"
                    :data="topauthor"
                    style="width: 70%;margin-left:10%">
            <el-table-column

              label="rank"
              width="200">
              <template slot-scope="scope">
                        <span style="font-size:20px;">
                        {{ scope.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="name"
              width="250"
            >
              <template slot-scope="scope">
                        <span
                          style="color:#2688BE;font-size:20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        {{ scope.row.authorName }}</span>
              </template>


            </el-table-column>

          </el-table>
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
        <div class="grid-content " style="height:222px">
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
            <div v-for="author in paper.authors" style="color:#2688BE; display:inline;font-size:18px" class="hov"
                 @click="viewAuthor(author.authorId)">
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
  import citation from '@/assets/img/keyword.png'
  import affrank from '@/assets/img/affrank.png'

  var echarts = require('echarts')
  var axios = require('axios')
  export default {

    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        authoricon: authoricon,
        button: button,
        citation: citation,
        affrank: affrank,
        paperNum: 0,
        citationNum: 0,
        authorid: this.$route.params.id,
        authorName: '0',
        authorAff: '0',
        activationNum: 0,
        keywordName: '1',
        papers: [1, 2, 3],
        temp: '1',
        affActivation: 0,
        dires: [
          'name', 'fdsf'
        ],
        relatedAuthor: ['a', 'f', 'c'],
        topaff: [],
        topauthor: [],
        id:-1,
        userId:-1,
        switches:false

      }
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
               "entityType":"3",
               "entityId":this.id
           }
      ).then(function(response){
         
        }).catch(function(error){

        });
        }
        console.log(this.switches);
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
      },
      openDetails1 (row) {
        this.$router.push('/afflication/' + row.affiliationId)
      },
      openDetails2 (row) {
        this.$router.push('/author/' + row.authorId)
      },
      viewRelateAuthor: function (e) {
        this.$router.push('/author/' + e)
        location.reload()
      },
      drawchart () {
        let authorid = this.$route.params.id
        let x = []
        let y = []

        this.$axios.get('http://47.100.55.51:3180/chart/refPerYearBykeyword', {
          params: {
            keywordId: authorid
          }
        }).then(function (response) {
          console.log(response.data.data)
          var mychart3 = echarts.init(document.getElementById('box'))
          x = response.data.data.yearList
          console.log(x)
          y = response.data.data.refList
          console.log('成功获得引用！')
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
      drawchart2 () {
        let authorid = this.$route.params.id
        let x = []
        let y = []

        this.$axios.get('http://47.100.55.51:3180/chart/articlePerYearByKeyword', {
          params: {
            keywordId: authorid
          }
        }).then(function (response) {
          console.log(response.data.data)
          var mychart2 = echarts.init(document.getElementById('box2'))
          x = response.data.data.yearList
          console.log(x)
          y = response.data.data.articleNumList
          console.log('成功获得引用！')
          let option = {
            title: {
              text: 'paper amount statics'
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
          mychart2.setOption(option)
        }).catch(function (error) {
          console.log('获得引用失败！')
          console.log(error)
        })
      },
      addViewHistory (keywordId) {
        const _this = this
        let entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 3,
          entityId: keywordId,
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
 let id = this.$route.params.id
      var _this = this
      _this.id=id
      _this.userId=localStorage.getItem('userId');
      this.addViewHistory(id)

      this.$axios.post('http://47.100.55.51:3180/user/isEntityStar',
          {
               "userId":this.userId,
               "entityType":"3",
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

      this.$axios.get('http://47.100.55.51:3180/entity/keywordPortrait', {
        params: {
          keywordId: id
        }

      }).then(function (response) {
        console.log(response.data.data)
        _this.keywordName = response.data.data.keyword
        _this.paperNum = response.data.data.articleNum
        _this.citationNum = response.data.data.reference
        _this.affActivation = response.data.data.activation

      }).catch(function (error) {
        console.log('获得作者画像失败！')
        console.log(error)
      })
      this.$axios.get('http://47.100.55.51:3180/entity/articleListByKeyword', {
        params: {
          keywordId: id
        }

      }).then(function (response) {
        console.log(response.data.data)
        _this.papers = response.data.data
        for (var i = 0; i < _this.papers.length; i++) {
          if (_this.papers[i].docTitle.length > 65) {
            console.log('over:' + _this.papers[i].docTitle)
            _this.papers[i].docTitle = _this.papers[i].docTitle.slice(0, 65) + '...'
          }
        }

      }).catch(function (error) {
        console.log('获得作者画像失败！')
        console.log(error)
      })
      this.$axios.get('http://47.100.55.51:3180/rank/topAffiliationByKeyword', {
        params: {
          keywordId: id
        }

      }).then(function (response) {
        console.log('-------------')
        console.log(response.data.data)
        _this.topaff = response.data.data
        for (var i = 1; i < response.data.data.length + 1; i++) {
          _this.topaff[i - 1]['index'] = i
        }

      }).catch(function (error) {
        console.log('获得作者画像失败！')
        console.log(error)
      })
      this.$axios.get('http://47.100.55.51:3180/rank/topAuthorByKeyword', {
        params: {
          keywordId: id
        }

      }).then(function (response) {

        _this.topauthor = response.data.data
        for (var i = 1; i < response.data.data.length + 1; i++) {
          _this.topauthor[i - 1]['index'] = i
        }

      }).catch(function (error) {
        console.log('获得作者画像失败！')
        console.log(error)
      })

      this.drawchart2()
      this.drawchart()
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
</style>
