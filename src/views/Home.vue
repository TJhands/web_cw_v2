<template>
   <div class="block" id="banner">
    <span class="demonstration">showgames</span>
    <el-carousel height="450px">
      <el-carousel-item v-for="item in img_list" :key="item">
        <!-- <img :src= "item.url" item alt=""  width=100%> -->
         <img :src="require('../../static/img/'+item.url+'.png')" item alt=""  width=100%>
        
        <!-- <img src="../../static/img/p1.png" width=100%>
        <img src="../../static/img/p1.png" width=100%>
        <img src="../../static/img/p1.png" width=100%>  -->
        <!-- <h3>{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
   <el-row>
   <!-- <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index  > 0 ? 2 : 0" class="cardcol">
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
   </el-col> -->
   </el-row>
   <el-row>
   <div class="goods" id="goods" name="goods" >
   <div class="nav">
      <div class="product-nav">
        <div class="title">Game Categories</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.id"
            :label="item.gameTypeName"
            :name="''+item.id"
          />
        </el-tabs>
      </div>
    </div>
    <div class="main">
      <div class="list">

        <MyList :list="game" v-if="game.length>0"></MyList>
        <div v-else class="none-product">No games</div>
      </div>
      <!-- 分页 -->
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div> -->
      <!-- 分页END -->
    </div>
   






  </div>
   </el-row>
   <el-row>
    <router-link  to="/categories">See More</router-link>
    </el-row>


   </div>
</template>
<script>
  export default {
    // name: "Banner",
    data() {
      return {
          // img_list:[
          //    require("../../static/img/p1.png"),
          //    require("../../static/img/p1.png"),
          //    require("../../static/img/p1.png"),
          //    require("../../static/img/p1.png"),
          //   ],
            //   img_list:[{url:require('../../static/img/'+'p1'+'.png')},
            //   {url:require('../../static/img/p1.png')},
            //   {url:require('../../static/img/p1.png')}
           
            // ],

          img_list:[{url:'avatar'},
          {url:'p1'},
          {url:'p1'},
          
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

        filename: "",
      game:"",
      categoryList:"",
      categoryID: [], // 分类id
      product: [{url:'avatar', product_id:1},
          {url:'p1',product_id:2},
          {url:'p1',product_id:3},

          ], // 商品列表
      productList: "",
      total: 0, // 商品总量
      pageSize: 5, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "0", // 分类列表当前选中的id
      search: "" // 搜索条件
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
      },
        // 返回顶部
    backtop() {
      const timer = setInterval(function() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
      }
      this.backtop();
    },
    // 向后端请求分类列表数据a
    getCategory() {
      this.$axios
        .post("/api/getAllGameTypes",{})
        .then(({data})=> {
          const val = {
            id: 0,
            gameTypeName: "All"
          };
          // const cate = res.data.category;
          const cate = data;
          cate.unshift(val);
           console.log(data);
          this.categoryList = cate;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      const api =
        this.categoryID.length == 0
          ? "/api/getAllGames"
          : "/api/getGamesByType";
      this.$axios
        .post(api, {
          gameTypeId: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(({data})=> {
          console.log(data);
          this.game = data.rows;
          this.total = data.count;
          console.log("ismygame");
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    },
    created() {
    // 获取分类列表
    this.getCategory();
    this.getData();
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function(val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/",
        query: { categoryID: this.categoryID }
      });
    },
    // 监听搜索条件，响应相应的商品
    search: function(val) {
      if (val != "") {
        this.getProductBySearch(val);
      }
    },
    // 监听分类id，响应相应的商品
    categoryID: function() {
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function(val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    }
  },
  activated() {
    this.categoryID = [];
    this.activeName = "0"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    console.log(this.$route.query);
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
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