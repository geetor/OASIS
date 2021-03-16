<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="content" style="height:100%">
      <div v-if="ok" class="container-fluid" style="margin-left:50px;">
        <div style="height:100px"></div>
        <div class="row" style="height:150px;font-size:80px;margin-left:26.5%;color:white">OASIS SEARCH</div>
      </div>
    </div>

    <div class="content " style="height:100%">
      <div v-if="ok" class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-xl-9 order-xl-1">
              <oasis-card style="background-color:rgba(0,0,0,0.2)">
                <div style="height: 20px"></div>
                <div class="row" style="height: 50px;margin-left: 5px">
                  <div class="el-col-md-4">
                    <p style="font-size:22px;color:white">Search Info:</p>
                  </div>
                  <div class="col-md-8">
                    <el-input placeholder="Use * to connect different target" v-model="input1"
                              class="input-with-select placeholder"
                              style="font-family: Consolas,Monaco,'Courier New',monospace;font-size: medium">
                      <template slot="prepend" style="">Author(s)&nbsp;&nbsp;&nbsp;&nbsp;</template>
                    </el-input>
                  </div>
                </div>

                <div class="row" style="height: 50px;margin-left: 5px">
                  <div class="el-col-md-4">
                  </div>
                  <div class="col-md-8">
                    <el-input placeholder="Use * to connect different target" v-model="input4" class="input-with-select"
                              style="font-family:Consolas,Monaco,'Courier New',monospace;font-size: medium">
                      <template slot="prepend">Keyword(s)&nbsp;&nbsp;&nbsp;</template>
                    </el-input>
                  </div>
                  <div class="col-md-1" style="margin-top: 22px">
                    <base-button type="primary" icon="fa fa-search" @click="search">SEARCH</base-button>
                  </div>
                </div>

                <div class="row" style="height: 50px;margin-left: 5px">
                  <div class="el-col-md-4">
                  </div>
                  <div class="col-md-8">
                    <el-input placeholder="ASE or ICSE" v-model="input2" class="input-with-select"
                              style="font-family:Consolas,Monaco,'Courier New',monospace;font-size: medium">
                      <template slot="prepend">Publication&nbsp;&nbsp;</template>
                    </el-input>
                  </div>
                  <div class="col-md-2">
                  </div>
                </div>

                <div class="row" style="height: 50px;margin-left: 5px">
                  <div class="el-col-md-4">
                  </div>
                  <div class="col-md-8">
                    <el-input placeholder="Use * to connect different target" v-model="input3" class="input-with-select"
                              style="font-family:Consolas,Monaco,'Courier New',monospace;font-size: medium">
                      <template slot="prepend">Affliction(s)</template>
                    </el-input>
                  </div>
                  <div class="col-md-2">
                  </div>

                </div>

                <div style="height:20px;"></div>

                <div class="row" style="height:40px;margin-left: 5px">
                  <div class="el-col-md-4">
                    <p style="font-size:22px;margin-left:0;color:white">Duration:</p>
                  </div>
                  <div class="col-md-3">
                    <el-input placeholder="The year begins" slot="prepend" v-model="yearFrom"
                              style="font-family: Consolas,Monaco,'Courier New',monospace;font-size: medium">
                    </el-input>
                  </div>
                  <div class="col-md-1" style="margin-left: 80px">
                    <p style="font-size:22px;color:white">To:</p>
                  </div>
                  <div class="col-md-3">
                    <el-input placeholder="The year ends" slot="prepend" v-model="yearTo"
                              style="font-family: Consolas,Monaco,'Courier New',monospace;font-size: medium">
                    </el-input>
                  </div>
                </div>

                <div style="height: 20px"></div>

              </oasis-card>
            </div>
          </div>
      </div>

      <div v-if="no" v-loading="loa" element-loading-text="LOADING..."
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
           style="background-color:#F7F8FA">
        <!-- <div style="background:#8965E0;height:80px"></div> -->
        <h3 v-if="notfind" style="margin-left:270px;">Sorry your search does not return any result...
        </h3>
        <br>
        <el-row :gutter="40" v-for="(paper,index) in papers" :key="index">
          <el-col :span="18" :offset="3">
            <div class="grid-content" style="padding:20px;margin-bottom:20px">
              <div style="height:20px"></div>
              <div
                style="background-color:#2688BE;width:36px;height:36px;margin-left:20px;float:left;margin-right:10px"></div>
              <div style="float:left;font-size:26px;width:900px;">
                <a style="color:black" :href="paper.pdfLink">
                  {{paper.title}}
                </a>
              </div>
              <div></div>
              <br>
              <div style="height:10px"></div>
              <div style="display:inline;font-style:italic;margin-left:10px;font-size:18px">
                {{paper.publicationTime}}
              </div>
              <div style="height:30px"></div>
              <div style="margin-left:10px;color:grey;font-style:italic" class="hov"
                   @click="viewPublication(paper.publicationTitle)">{{paper.publicationTitle}}
              </div>
              <br>
              <div style="margin-left:20px">
                <div v-for="author in paper.authors" :key="author.authorId"
                     style="color:#2688BE; display:inline;font-size:18px" class="hov"
                     @click="viewAuthor(author.authorId)">
                  {{author.authorName}}&nbsp;
                </div>
              </div>
              <hr>
              <p>Abstract:</p>
              <div><p>{{paper.docAbstract}}</p>
                <p style="font-size:30px;color:#2688BE">citations({{paper.refs}})</p></div>
              <!-- <div style="float:right;margin:10px 50px 20px auto;font-size:20px;color:grey;border: 1px solid black">
                <p>citations({{paper.refs}})</p>
                </div> -->
            </div>
          </el-col>
        </el-row>
        <!-- <div class="card" v-if="find">
            <li  v-for="paper in papers" v-bind:key="paper.articleId" class="items">
                <a href="paper.pdfLink" target="_blank" class="articalbtn" @click="checkout(paper)">查看文章</a>
                <span class="score">{{paper.refs}} refs</span>
                <span class="title">
                  <a style="color:navy;" :href=paper.pdfLink>{{paper.title}}</a>
                  <span>({{paper.time}})</span>
                </span>
                <br>
                <br>
                <span class="author" v-for="author in paper.authors">
                  <a style="color: lightskyblue">--{{author.authorName}} </a>
                </span>
                <br>
                <br>
                <span style="color: #E6A23C">abstract:</span>
                <span class="abstract text-wrapper" style="font-size: 16px;color: #828282">
                    {{paper.docAbstract}}
                </span>
                <br>
                <br>
                <span style="color: #943bea">keywords:</span>
                <span class="time" v-for="k in paper.keyWords" style="color: gold">
                  --{{k}}
                </span>
                <br>
                <br>
                <span style="color: #409EFF">publication:</span>
                <span class="text-wrapper"  style="color: #6dc030">
                  {{paper.publicationTitle}}
                </span>
          </li>
        </div> -->
      </div>
    </div>


  </section>

</template>
<script>
  export default {
    components: {},
    data () {
      return {
        papers: [],
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        select1: '',
        select2: '',
        select3: '',
        select4: '',
        yearFrom: '',
        yearTo: '',
        ok: true,
        no: false,
        listIsNull: false,
        loa: true,
        notfind: false,
        find: true
      }
    },
    methods: {
      show () {},
      hide () {},
      created () {
        // 如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        this.select1 = '作者'
      },
      viewAuthor (e) {
        this.$router.push('/author/' + e)
        location.reload()
      },
      viewPublication: function (e) {
        if (e.indexOf('ASE') != -1) {
          this.$router.push('/conference/ASE')
        } else {
          this.$router.push('/conference/ICSE')
        }
      },
      search: function () {
        var vauthor = ''
        var vpublication = ''
        var vaffliction = ''
        var vkeyWords = ''
        var vyears = ''
        var _this = this
        var isValid = true

        vauthor = this.input1
        vpublication = this.input2
        vaffliction = this.input3
        vkeyWords = this.input4

        if (this.yearFrom == '') {
          this.yearFrom = '0'
        }
        if (this.yearTo == '') {
          this.yearTo = '0'
        }
        vyears = this.yearFrom + '-' + this.yearTo
        if (vauthor == '') {
          vauthor = 'null'
        }
        if (vpublication == '') {
          vpublication = 'null'
        }
        if (vaffliction == '') {
          vaffliction = 'null'
        }
        if (vkeyWords == '') {
          vkeyWords = 'null'
        }
        if (vyears == '-') {
          vyears = '0-0'
        }
        console.log('vaut:' + vauthor)
        console.log('vaff:' + vaffliction)
        console.log('vpublic:' + vpublication)
        console.log('vk:' + vkeyWords)
        console.log('vy:' + vyears)

        // 对会议进行验证
        if ((vpublication != 'ASE') && (vpublication != 'ICSE') && (vpublication != 'null')) {
          isValid = false
          this.$notify({
            title: 'input error',
            message: 'Only hav ASE / ICSE publication',
            duration: 0
          })
          return
        } else {
          if ((!isNaN(this.yearFrom)) && (!isNaN(this.yearTo))) {
            // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
            // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
            isValid = true
            this.ok = false
            this.no = true
          } else {
            isValid = false
            this.$notify({
              title: 'input error',
              message: 'please input the valid time format! eg:2019',
              duration: 0
            })
            return
          }
        }
        this.$axios.post('http://47.100.55.51:3180/search/item', {
          author: vauthor,
          affiliation: vaffliction,
          publication: vpublication,
          keyWords: vkeyWords,
          time: vyears
        }).then(function (response) {
          _this.papers = response.data.data

          console.log('成功获得papers列表！')
          console.log(_this.papers)
          _this.loa = false
          console.log(_this.papers.length)
          if (_this.papers.length == 0) {
            _this.notfind = true
            _this.find = false
          }
        }).catch(function (error) {
          console.log('获得papers列表失败！')
          console.log(error)
        })
      }
    }
    // .news-item
//   background-color #fff
//   padding 20px 30px 20px 80px
//   border-bottom 1px solid #0e0e0e
//   margin 0 auto
//   width 80%
//   position relative
//   line-height 20px
//   .score
//     color #ff6600
//     font-size 1.1em
//     font-weight 700
//     position absolute
//     top 50%
//     left 0
//     width 80px
//     text-align center
//     margin-top -10px
//   .meta, .host
//     font-size .85em
//     color #828282
//     a
//       color #828282
//       text-decoration underline
//       &:hover
//         color #ff6600
  }

</script>
<style>
  .hov {
    cursor: pointer;
  }

  .placeholder {
    color: #0e0e0e;
  }

  .text-wrapper {
    word-break: break-all;
    hyphens: auto;
    /* word-wrap: break-word */
  }

  .card {
    margin: 20px auto 20px auto;
    padding: 20px;
    width: 1000px;
    position: relative;
    background-color: rgba(0, 0, 0, 0);
  }

  a:hover {
    color: white;
  }

  .articalbtn {
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: slateblue;
    border-radius: 30px;
    text-align: center;
    color: gainsboro;
    line-height: 50px;
    display: block;
    left: 1000px;
  }

  .card > .items {
    margin: 10px 0 10px 0;
    border: 1px solid black;
    background-color: seashell;
    padding: 20px;
    border-radius: 20px;
  }

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

</style>
