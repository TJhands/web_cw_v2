<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{title}}</h1>
      <div class="some">
        <!-- <span class="date"><i class="iconfont icon-date"></i>{{date}}</span>
        <span class="category"><i class="iconfont icon-tubiao13"></i><span v-for="tag in category" :key="tag.id">{{tag}}</span></span> -->
      </div>
      <div id="details">
      <div class="main">
        <div class="block">
        <div>
          <!-- <img
            style="height:560px;"
            :src="$target + productPicture[0].product_picture"
            :alt="productPicture[0].intro"
          /> -->
         <img src="../../static/img/p1.png" class="image" height="560px">

        </div>
      </div>
      

      <div class="content">
        <h1 class="name">tttttesy</h1>
        <p class="intro">tttest</p>
        <p class="store">小米自营</p>
        <div class="price">
          <span>元</span>
         
        </div>
        <div class="pro-list">
          <span class="pro-name">testname</span>
          <span class="pro-price">
            <span>元</span>
            <span
            
              class="pro-del"
            >元</span>
          </span>
          <p class="price-sum">总计 : 元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <!-- <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button> -->
          <el-button class="like">喜欢</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        
      </div>

      </div>
      </div>
      
      <div class="detail" v-if="content">
          <!-- <mavon-editor v-model="content" default_open="preview" defaultOpen= "preview"  :toolbarsFlag="false" :subfield="false"></mavon-editor> -->
          
      </div>
      <comment :comments="comments" :articleId="articleId" @update="update" @setTextarea="setTextarea"></comment>
    </div>
     </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Upload",
  data() {
    return {
      pageSize: 12, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "0", // 分类列表当前选中的id
      search: "" ,// 搜索条件
      comments: [
        {
          id: 0,
          from_uid: 11111,
          from_uname: "非洲刘德华",
          // avatar: avatar,
          to_uid: null,
          content: "啊十分大师傅",
          date: "2018-07-18 20:12",
          open:false,
          child: [
            {
              from_uid: 2222,
              from_uname: "乌鸦坐飞机",
              // avatar: avatar,
              to_uid: 1111,
              to_uname: "非洲刘德华",
              content: "asdf撒旦飞洒发的",
              date: "2018-07-18 20:12"
            }
          ]
        },
        
      ]

    };
  }, mounted() {
      this.init();
    },
    methods: {
      init(){
        this.$axios.get("/api/getAllUsers/1",).then(({data}) => {
          this.tableData = data;
        });
      }
    },
     setTextarea: function(params) {
      let { index, open, to_uid, to_uname } = params;
      let comments = this.comments;
      // console.log(params)
      if (to_uid) {
        comments[index]["to_uid"] = to_uid;
        comments[index]["to_uname"] = to_uname;
      }
      comments[index]["open"] = open;
      // debugger
      this.comments = comments;
    },
  }
</script>

<style lang="scss" scoped>
/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 900px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 500px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */


.wrapper {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  padding: 10px;
  & > .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  & > .some {
    text-align: center;
    color: #999;
    margin: 10px 0;
    padding-bottom: 10px;
    .iconfont {
      color: #666;
      margin: 0 5px 0 0;
    }
    .date {
      margin: 0 10px 0 0;
      vertical-align: middle;
    }
    .category {
      vertical-align: middle;
      & > span {
        margin-right: 5px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 20%;
    border-radius: 6px;
    .btn {
      text-align: center;
      background: #fff;
      color: #666;
      padding: 10px;
      flex: 1;
      border: 1px solid #ddd;
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background: #3b99fc;
        color: #fff;
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.prev {
        border-right: none;
      }
      &.next {
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .wrapper {
    padding: 20px;
    & > .title {
      font-size: 28px;
    }
    & > .some {
      margin: 10px 0 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .iconfont {
        color: #666;
        margin: 0 5px 0 0;
      }
      .date {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
