<template>
  <div>
   <div class="nav">
      <div class="product-nav">
        <div class="title">Game Categories</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :name="''+item.category_id"
          />
        </el-tabs>
      </div>
    </div>
    <div class="main">
      <div class="list">
        test
        <MyList :list="product" v-if="product.length>0"></MyList>
        <div v-else class="none-product">No games</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
   
  

   
    
 

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Upload",
  data() {
    return {
      filename: "",
      categoryList:[
        {category_id:"0",category_name:"All"},
        {category_id:"1",category_name:"Action"},
      {category_id:"2",category_name:"Role-Playing"},
      {category_id:"3",category_name:"Puzzle"}
      
      ],
      categoryID: [], // 分类id
      product: [{url:'avatar', product_id:1},
          {url:'p1',product_id:2},
          {url:'p1',product_id:3},
          
          ], // 商品列表
      productList: "",
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "" // 搜索条件

    };
  },
  created() {
    // 获取分类列表
    this.getCategory();
  },
  activated() {
    this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
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
  
  methods: {
    doRegister() {
      this.$store.dispatch("UPLOAD");
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
        .post("/api/game/getCategory", {})
        .then(res => {
          const val = {
            category_id: 0,
            category_name: "全部"
          };
          const cate = res.data.category;
          cate.unshift(val);
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
          ? "/api/product/getAllGame"
          : "/api/product/getGameByCategory";
      this.$axios
        .post(api, {
          categoryID: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.game = res.data.game;
          this.total = res.data.total;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    



  },
  mounted() {
    this.$store.dispatch("CHECK_STATUS").then(loggedIn => {
      if (!loggedIn) this.$router.push({ name: "Login" });
    });

  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .card {
    width: 100%;
    max-width: 700px;
    max-height: 100%;
    .head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 2em;
      font-size: 1.5em;
      font-weight: bold;
      padding-left: 24px;
      background-color: teal;
      color: white;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      input {
        width: 75%;
        height: 2em;
        margin: 16px;
        padding: 8px;
        &[type="submit"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 45px;
          width: 50%;
          background-color: teal;
          color: white;
          font-weight: bold;
          font-size: 1em;
        }
      }
    }
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }
}

.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 180px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>
