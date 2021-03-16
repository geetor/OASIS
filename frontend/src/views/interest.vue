<template> 

  <!-- <el-row :gutter="20" >
   <el-col :span="24" > -->
    <div class="content">
      <div style="background:#8965E0;height:80px"></div>
     <div style="height:50px"></div>
     <div class="grid-content" style="height:550px">
       <div>
       <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="keyword"
        label="keyword"
        >
        <template slot-scope="scope">
      		<span  style="color: blue" @click="opendetail(scope.row.keywordId)">{{scope.row.keyword}}</span>
		      
	      </template>
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="ratio"
       >
      </el-table-column>
      <el-table-column
        prop="time1"
        label="2015-2016"
        >
        <template slot-scope="scope">
      		<span v-if="scope.row.time1.slice(0,1)==='+'" style="color: red">{{scope.row.time1}}</span>
		      <span v-else-if="scope.row.time1.slice(0,1)==='-'" style="color: green">{{scope.row.time1}}</span>
	      </template>

      </el-table-column>
      <el-table-column
        prop="time2"
        label="2016-2017"
       >
       <template slot-scope="scope">
      		<span v-if="scope.row.time2.slice(0,1)==='+'" style="color: red">{{scope.row.time2}}</span>
		      <span v-else-if="scope.row.time2.slice(0,1)==='-'" style="color: green">{{scope.row.time2}}</span>
	      </template>
      </el-table-column>
      <el-table-column
        prop="time3"
        label="2017-2018">
        <template slot-scope="scope">
      		<span v-if="scope.row.time3.slice(0,1)==='+'" style="color: red">{{scope.row.time3}}</span>
		      <span v-else-if="scope.row.time3.slice(0,1)==='-'" style="color: green">{{scope.row.time3}}</span>
	      </template>
      </el-table-column>
      <el-table-column
        prop="time4"
        label="2018-2019"
        >
        <template slot-scope="scope">
      		<span v-if="scope.row.time4.slice(0,1)==='+'" style="color: red">{{scope.row.time4}}</span>
		      <span v-else-if="scope.row.time4.slice(0,1)==='-'" style="color: green">{{scope.row.time4}}</span>
	      </template>
      </el-table-column>
    </el-table>
       </div>
     </div>
    </div>
    <!-- </el-col>
  </el-row> -->
    
</template>

<script>
    export default {
        name: "interest",
      data(){
          return{
            tableData: [
            ]
          }
      },
     
      mounted(){
        var _this=this;
        this.$axios.get('http://47.100.55.51:3180/rank/topKeywordAnalysis',{

        }).then(function (response) {
          console.log(response.data.data);
          _this.tableData=response.data.data;

        }).catch(function (error) {
          console.log("获得作者画像失败！");
          console.log(error);
        });
      }, 
      methods:{
        opendetail(e){
          this.$router.push('/keyword/'+e); 
        }
      },
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background:white;
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
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: white;
  }
</style>
