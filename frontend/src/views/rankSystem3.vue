<template>
  <div class="page">
    <div style="height:80px;background-color:#8965E0"></div>
    <div class="rankBox">

      <div v-if="affrank" class="rua-filter">


        <div style="clear:both"></div>
        <input v-model="message1" style="width:25px">
        <button @click="change(0)" class="btn">Activation</button>
        <input v-model="message2" style="width:25px">
        <button @click="change(1)" class="btn">H-index</button>
        <input v-model="message3" style="width:25px">
        <button @click="change(2)" class="btn">SubAuthorNum</button>
        <input v-model="message4" style="width:25px">
        <button @click="change(3)" class="btn">Reference</button>
        <input v-model="message5" style="width:25px">
        <button @click="change(4)" class="btn2">recent 1 year paper number</button>
        <input v-model="message6" style="width:25px">
        <button @click="change(5)" class="btn2">recent 3 year paper number</button>
        <!-- <span style="width:40px"></span> -->
        <button @click="customsend(0)" class="btn" style="float:right">custom</button>
      </div>
      <div v-if="authorrank" class="rua-filter">
        <!-- <a href="javascript: ;" class="filtera" @click="change(0)">
            <span>Activation</span>
        </a>
        <a href="javascript: ;"  class="filtera" @click="change(1)">
            <span>H-Index</span>
        </a>
        <a href="javascript: ;"  class="filtera" @click="change(2)">
            <span>PublicationNum</span>
        </a>
        <a href="javascript: ;"  class="filtera" @click="change(3)">
            <span>Reference</span>
        </a> -->
        <div style="clear:both"></div>
        <input v-model="message7" style="width:25px">
        <button @click="change(0)" class="btn">Activation</button>
        <input v-model="message8" style="width:25px">
        <button @click="change(1)" class="btn">H-index</button>
        <input v-model="message9" style="width:25px">
        <button @click="change(2)" class="btn">PublicationNum</button>
        <input v-model="message10" style="width:25px">
        <button @click="change(3)" class="btn">Reference</button>
        <!-- <span style="width:40px"></span> -->
        <button @click="customsend(1)" class="btn" style="float:right">custom</button>
      </div>
      <div v-if="keyrank" class="rua-filter">
        <!-- <a href="javascript: ;" class="filtera" @click="change(0)">
            <span>Activation</span>
        </a>
        <a href="javascript: ;"  class="filtera" @click="change(1)">
            <span>Reference</span>
        </a>
        <a href="javascript: ;"  class="filtera" @click="change(2)">
            <span>ArticleNum</span>
        </a> -->
        <div style="clear:both"></div>
        <input v-model="message11" style="width:25px" class="in" id="in1">
        <button @click="change(0)" class="btn">Activation</button>
        <input v-model="message12" style="width:25px" class="in" id="in2">
        <button @click="change(1)" class="btn">Reference</button>
        <input v-model="message13" style="width:25px" class="in" id="in3">
        <button @click="change(2)" class="btn">ArticleNum</button>
                <input v-model="message14" style="width:25px" class="in" id="in4">
        <button @click="change(3)" class="btn">Ratio</button>
        <!-- <span style="width:40px"></span> -->
        <button @click="customsend(2)" class="btn3" style="float:right">custom</button>
      </div>
      <div class="resultBox">
        <!-- <h1></h1> -->
        <ul>
          <li v-for="(item,index) in items" :key="item.id">
            <div class="card" @click="jumpto(item.id)">
              <!-- 排名牌 -->

              <span class="ranknumbox">{{index+1}}</span>
              <div class="ranknumbox2">🔥{{item.rank}}</div>
              <div class="cardname">
                <p>{{item.name}}</p>
              </div>
            </div>
          </li>
        </ul>
        <div style="clear:both; height:10px"></div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {

    name: 'rankSystem',
    data () {
      return {
        affrank: false,
        authorrank: true,
        keyrank: false,
        type: 0,
        message1: 1,
        message2: 1,
        message3: 1,
        message4: 1,
        message5: 1,
        message6: 1,
        message7: 1,
        message8: 1,
        message9: 1,
        message10: 1,
        message11: 1,
        message12: 1,
        message13: 1,
        message14:1,
        items: [
          //     {
          //     rank:'0.1',
          //     name:'nanjddddddddsaadafadsfadfaffdsfdfsdfsdfsdfsasdsafasfadsfadfaing',
          //     id:0
          // }, {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:1
          // },
          // {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:2
          // },
          // {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:3
          // },
          // {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:4
          // },
          // {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:5
          // },
          // {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:6
          // },        {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:53
          // },
          //         {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:54
          // },
          //         {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:55
          // },
          //         {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:50
          // },
          //         {
          //     rank:'0.1',
          //     name:'nanjing',
          //     id:59
          // },
        ]
      }
    },
    mounted () {
      //加入默认选中
      this.affrank = false
      this.authorrank = false
      this.keyrank = true
      // var topas = document.getElementsByClassName('topfiltera')
      // var as =document.getElementsByClassName("filtera");
      // topas[0].style.backgroundColor = '#8965E0'
      // topas[0].style.color = 'white'
      // as[0].style.backgroundColor='purple';
      // as[0].style.color='white';
      var that = this
      that.$axios.get('http://47.100.55.51:3180/rank/getKeywordRank', {
        params:
          {
            rankType: that.type,
            rankParam: ''
          }
      }).then(function (response) {
        console.log(response.data.data)
        that.items = response.data.data
      }).catch(function (error) {
        console.log('get affliation  rank失败!!')
        console.log(error)
      })
    },
    methods: {
      customsend: function (e) {
        var _this = this
        console.log(e)
 document.getElementById("in1").classList.remove("in")
        document.getElementById("in2").classList.remove("in")
        document.getElementById("in3").classList.remove("in")
                document.getElementById("in4").classList.remove("in")
        if (e == 0) {
          let temp = this.message1 + '-' + this.message2 + '-' + this.message3 + '-' + this.message4 + '-' + this.message5 + '-' + this.message6
          console.log(temp)
          _this.$axios.get('http://47.100.55.51:3180/rank/getAffiliationRank', {
            params:
              {
                rankType: 6,
                rankParam: temp
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data
          }).catch(function (error) {
            console.log('get affliation  rank失败!!')
            console.log(error)
          })
        }
        if (e == 1) {
          let temp = this.message7 + '-' + this.message8 + '-' + this.message9 + '-' + this.message10
          console.log(temp)
          _this.$axios.get('http://47.100.55.51:3180/rank/getAuthorRank', {
            params:
              {
                rankType: 4,
                rankParam: temp
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data
          }).catch(function (error) {
            console.log('get affliation  rank失败!!')
            console.log(error)
          })
        }
        if (e == 2) {
          var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
          
          if(!reg.test(this.message11)||!reg.test(this.message14)||!reg.test(this.message12)||!reg.test(this.message13)){
                        _this.$notify({
              position: 'top-center',
              type: 'warning',
              title: 'Please input non-negative number!'
            })
            return
          }

          let temp = this.message11 + '-' + this.message12 + '-' + this.message13+"-"+this.message14
          console.log(temp)
          _this.$axios.get('http://47.100.55.51:3180/rank/getKeywordRank', {
            params:
              {
                rankType: 4,
                rankParam: temp
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data
          }).catch(function (error) {
            console.log('get affliation  rank失败!!')
            console.log(error)
          })
        }
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].rank = Math.floor(this.items[i].rank)
        }

      },
      change: function (type) {
        // var as = document.getElementsByClassName('filtera')
        //改变点击按钮样式
        this.type = type
        console.log('type', type)
        console.log('affrank', this.affrank)
        console.log('authorrank', this.authorrank)
        console.log('keyrank', this.keyrank)
        // for (let i = 0; i < as.length; i++) {
        //   as[i].onclick = function () {
        //     //排他思想，先把所有的元素样式去掉
        //     for (var j = 0; j < as.length; j++) {
        //       as[j].style.backgroundColor = ''
        //       as[j].style.color = 'black'
        //     }
        //     //再只改变这一个元素的样式
        //     this.style.backgroundColor = '#8965E0'
        //     this.style.color = 'white'
        //   }
        // }
        var _this = this
        //触发点击按钮请求，获取后端排序后的结果
        if (this.affrank) {
          if (type == 0) {
            _this.message1 = 1
            _this.message2 = 0
            _this.message3 = 0
            _this.message4 = 0
            _this.message5 = 0
            _this.message6 = 0

          }
          if (type == 1) {
            _this.message1 = 0
            _this.message2 = 1
            _this.message3 = 0
            _this.message4 = 0
            _this.message5 = 0
            _this.message6 = 0

          }
          if (type == 2) {
            _this.message1 = 0
            _this.message2 = 0
            _this.message3 = 1
            _this.message4 = 0
            _this.message5 = 0
            _this.message6 = 0

          }
          if (type == 3) {
            _this.message1 = 0
            _this.message2 = 0
            _this.message3 = 0
            _this.message4 = 1
            _this.message5 = 0
            _this.message6 = 0

          }
          if (type == 4) {
            _this.message1 = 0
            _this.message2 = 0
            _this.message3 = 0
            _this.message4 = 0
            _this.message5 = 1
            _this.message6 = 0

          }
          if (type == 5) {
            _this.message1 = 0
            _this.message2 = 0
            _this.message3 = 0
            _this.message4 = 0
            _this.message5 = 0
            _this.message6 = 1

          }
          //发送请求获取到afflication
          _this.$axios.get('http://47.100.55.51:3180/rank/getAffiliationRank', {
            params:
              {
                rankType: _this.type,
                rankParam: ''
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data
          }).catch(function (error) {
            console.log('get affliation  rank失败!!')
            console.log(error)
          })
        } else if (this.authorrank) {
          if (type == 0) {
            _this.message7 = 1
            _this.message8 = 0
            _this.message9 = 0
            _this.message10 = 0
          }
          if (type == 1) {
            _this.message7 = 0
            _this.message8 = 1
            _this.message9 = 0
            _this.message10 = 0
          }
          if (type == 2) {
            _this.message7 = 0
            _this.message8 = 0
            _this.message9 = 1
            _this.message10 = 0
          }
          if (type == 3) {
            _this.message7 = 0
            _this.message8 = 0
            _this.message9 = 0
            _this.message10 = 1
          }
          //发送请求获取到author
          _this.$axios.get('http://47.100.55.51:3180/rank/getAuthorRank', {
            params:
              {
                rankType: _this.type,
                rankParam: ''
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data

          }).catch(function (error) {
            console.log('get author  rank失败!!')
            console.log(error)
          })
        } else if (this.keyrank) {
          if (type == 0) {
            _this.message11 = 1
            _this.message12 = 0
            _this.message13 = 0
          }
          if (type == 1) {
            _this.message11 = 0
            _this.message12 = 1
            _this.message13 = 0
          }
          if (type == 2) {
            _this.message11 = 0
            _this.message12 = 0
            _this.message13 = 1
          }
          //发送请求获取到keyword
          _this.$axios.get('http://47.100.55.51:3180/rank/getKeywordRank', {
            params:
              {
                rankType: _this.type,//type 对应相应到ranktype直接赋值了
                rankParam: ''
              }
          }).then(function (response) {
            console.log(response.data.data)
            _this.items = response.data.data

          }).catch(function (error) {
            console.log('get keyword rank失败!!')
            console.log(error)
          })
        }
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].rank = Math.floor(this.items[i].rank)
        }
      },
      jumpto: function (id) {
        console.log(id)
        if (this.affrank) {
          this.$router.push('/afflication/' + id)

        } else if (this.authorrank) {
          //跳转到author id详情
          this.$router.push('/author/' + id)

        } else if (this.keyrank) {
          this.$router.push('/keyword/' + id)
        }

      },
      // changeState: function (state) {
      //   var topas = document.getElementsByClassName('topfiltera')
      //   //改变点击上面筛选按钮样式
      //   for (let i = 0; i < topas.length; i++) {
      //     topas[i].onclick = function () {
      //       //排他思想，先把所有的元素样式去掉
      //       for (var j = 0; j < topas.length; j++) {
      //         topas[j].style.backgroundColor = ''
      //         topas[j].style.color = 'black'
      //       }
      //       //再只改变这一个元素的样式
      //       this.style.backgroundColor = '#8965E0'
      //       this.style.color = 'white'
      //     }
      //   }
      //   var as = document.getElementsByClassName('filtera')
      //   //再把下面到元素样式清空，让用户重新选择
      //   for (let i = 0; i < as.length; i++) {
      //     for (var j = 0; j < as.length; j++) {
      //       as[j].style.backgroundColor = ''
      //       as[j].style.color = 'black'
      //     }
      //   }
      //   if (state == 0) {
      //     this.affrank = true
      //     this.authorrank = false
      //     this.keyrank = false
      //   } else if (state == 1) {
      //     this.affrank = false
      //     this.authorrank = true
      //     this.keyrank = false
      //   } else {
      //     this.affrank = false
      //     this.authorrank = false
      //     this.keyrank = true
      //   }
      // }
    }
  }

</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  .rankBox {
    width: 1000px;
    margin: 0 auto;
  }

  .topfiltera, .rua-filter {
    font: 15px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;
    margin-bottom: 30px;
    /*background-color: rgba(0, 0, 0, .1);*/
    height: 50px;
  }

  .rankBox .rua-filter a {
    float: left;
    padding: 0 9px;
    height: 23px;
    border: 1px solid #CCC;
    color: black;
    line-height: 23px;
    margin-right: -1px;
    margin-top: 40px;
  }

  .resultBox {
    border-top: 1px solid rgb(179, 149, 179);
    padding-top: 10px;
    perspective: 900px;
  }

  .resultBox ul {
    list-style-type: none;
  }

  .card {
    position: relative;
    width: 300px;
    height: 120px;
    line-height: 120px;
    border: 1px solid purple;
    float: left;
    margin-left: 25px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 18px;
    text-align: center;
    padding: 10px;
    transition: all .3s;
    overflow: hidden;
  }

  .card:hover {
    transform: translateZ(10px);
  }

  .ranknumbox {
    display: block;
    position: absolute;
    width: 40px;
    height: 30px;
    line-height: 30px;
    color: snow;
    background-color: #8965E0;
    border-radius: 7px;
    left: 0;
    top: 0;
  }

  .ranknumbox2 {
    display: block;
    position: absolute;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: black;
    /* background-color: #8965E0; */
    border-radius: 7px;
    right: 0;;
    top: 0;
  }

  .cardname p {
    font-size: 18px;
    margin-top: 40px;
  }

  .btn {
    width: 130px;
    height: 30px;
    background: #8965E0;
    border: none;
    color: white;
    margin: 6px 10px;
    border-radius: 6px;
    line-height: 10px;

  }
    .btn2 {
    width: 220px;
    height: 30px;
    background: #8965E0;
    border: none;
    color: white;
    margin: 6px 10px;
    border-radius: 6px;
    line-height: 10px;

  }
        .btn3 {
    width: 130px;
    height: 30px;
    background: #2688BE;
    border: none;
    color: white;
    margin: 6px 10px;
    border-radius: 6px;
    line-height: 10px;

  }
      .in{
    display: none;
  }


  /* .price{
      float: left;
  }
  em{
      float: left;
      display: inline;
  }
  .price > .input-txt{
      width: 52px;
      border-color: #ccc;
      float: left;
      display: inline;
      margin-left: 20px;
  } */
</style>
