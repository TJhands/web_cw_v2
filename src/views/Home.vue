<template>
  <div class="block" id="banner">
    <span class="demonstration">showgames</span>
    <el-carousel height="450px">
      <el-carousel-item v-for="item in img_list" :key="item">
        <img :src= "item" item alt=""  width=100%>
        <!-- <img src="../../static/img/p1.png" width=100%>
        <img src="../../static/img/p1.png" width=100%>
        <img src="../../static/img/p1.png" width=100%>  -->
        <!-- <h3>{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
  <el-row>
  <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index  > 0 ? 2 : 0" class="cardcol">
    <el-card :body-style="{ padding: '20px' }">
      <img src="../../static/img/p1.png" class="image">
      <div style="padding: 20px; ">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

  </div>
 
</template>
<script>
  export default {
    name: "Banner",
    data() {
      return {
          img_list:[
             require("../../static/img/p1.png"),
             require("../../static/img/p1.png"),
             require("../../static/img/p1.png"),
             require("../../static/img/p1.png"),
            ],
        // tableData:[]
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.$axios.get("/api/getAllUsers/1",).then(({data}) => {
          this.tableData = data;
        });
      }
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
 
 
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  
</style>