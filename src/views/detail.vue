<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{title}}</h1>
      <div class="some">
        <!-- <span class="date"><i class="iconfont icon-date"></i>{{date}}</span>
        <span class="category"><i class="iconfont icon-tubiao13"></i><span v-for="tag in category" :key="tag.id">{{tag}}</span></span> -->
      </div>
       <el-row>
      <div id="details" class="detail">
      <div class="main">
        <div class="block">
        <div>
          <!-- <img
            style="height:560px;"
            :src="$target + productPicture[0].product_picture"
            :alt="productPicture[0].intro"
          /> -->
         <!-- <img src="../../static/img/p1.png" class="image" height="560px"> -->
         <img :src="require('../assets/image/'+productDetails.imagePath+'.jpg')" item alt=""  width=100% height="360px">

        </div>
      </div>
      

      <div class="content">
       <h1 class="name">{{productDetails.gamename}}</h1>
        <p class="intro">{{productDetails.comment}}</p>
        <p class="store">{{productDetails.system}}</p>
    
        <!-- <p class="price-sum">Score : {{productDetails.score}}</p> -->
        
        <div class="pro-list">
          
          
          <p class="price-sum">Score of {{productDetails.gamename}} : {{productDetails.score}}</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <!-- <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button> -->
          <el-button ref='btn1' class="like" @click="addCollect">{{likeC}}</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        
      </div>

      </div>
      </div>
       </el-row>
      <el-row>
      <div class="detail" v-if="content">
          <!-- <mavon-editor v-model="content" default_open="preview" defaultOpen= "preview"  :toolbarsFlag="false" :subfield="false"></mavon-editor> -->
          
      </div>
      <div class="comm">
      <comment :comments="comments" :articleId="articleId" @update="update" @setTextarea="setTextarea"></comment>
      </div>
       </el-row>
    </div>
     </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: "Upload",
  data() {
    return {
      pageSize: 12, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "0", // 分类列表当前选中的id
      search: "" ,// 搜索条件
      productID: "9", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "" ,// 商品图片
      likeC:"",
      // cancelC:"Cancle from My Favorite",
      flag:"",


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
  },
   mounted() {
      
    },
       created() {
        this.productID = this.$route.query.productID;
        this.getDetails(this.productID);
        this.checkC(this.productID);
        

        // this.productID = 7
    
  },  
  
  // watch: {
  //   // 监听商品id的变化，请求后端获取商品数据
  //   productID: function(val) {
  //     this.getDetails(val);
  //     this.getDetailsPicture(val);
  //   }
  // },
   
    methods: {
       checkC(val){

         this.$axios
        .post("/api/checkIsFavoriteGame", {
          // user_id: this.$store.getters.getUser.user_id,
          
          // userId:this.$store.state.user.id,
           userId:this.$store.state.user.id,
           gameId: this.productID,
          
        })
        .then(({data})=> {
          console.log("checkF");
         
          var rec=data.result;
            console.log(rec);
            if(rec==true){
           this.flag=true;
           this.likeC="Cancel from My Favorite";

         }
         else if (rec==false){
           this.flag=false;
           this.likeC="Add to My Favorite";
         }

        })
        .catch(err => {
          return Promise.reject(err);
        });
         console.log("check2");
       



       },
      
       getDetails(val) {
         var myapi='/api/getGameCommentById/'+this.productID
         this.$axios
        .get(myapi)
        .then(({data})=> {
          this.productDetails = data;
          console.log("mydetail");
          console.log(data);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
    ,

      addCollect(val) {
        console.log(this.flag+'1');
       
      // 判断是否登录,没有登录则显示登录组件
      // if (!this.$store.getters.getUser) {
      //   this.$store.dispatch("setShowLogin", true);
      //   return;
      // }

      //console.log(val.target.innerText )
       
  
      if(this.flag == true){ 
             console.log(this.flag+'2');
            this.likeC="Add to My Favorite";
        this.$axios
        .post("/api/removeFavoriteGame", {
          // user_id: this.$store.getters.getUser.user_id,
          
          // userId:this.$store.state.user.id,
          userId:this.$store.state.user.id,
           gameId: this.productID,
          
        })
        .then(({data})=> {
        })
        .catch(err => {
          return Promise.reject(err);
        });
         this.flag =false;
      


                       
                }
      else if(this.flag == false){
          console.log(this.flag+'3');
           this.likeC="Cancel from My Favorite";
           
         
         this.$axios
        .post("/api/addFavoriteGame", {
          // user_id: this.$store.getters.getUser.user_id,
          
          // userId:this.$store.state.user.id,
          userId:this.$store.state.user.id,
           gameId: this.productID,
          
        })
        .then(({data})=> {
        })
        .catch(err => {
          return Promise.reject(err);
        });
         console.log("addcollected");
                    this.flag=true  
                } 
               
         console.log(this.flag+'4');
         
                
           
        

      // console.log("mycollected");
      // console.log(this.productID);
      
      //  this.notifySucceed("succeed");

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


    },
    
  }
</script>

<style lang="scss" scoped>
/* 主要内容CSS */
#details .main {
  width: 1225px;
  height:auto;
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
  color:rgb(107, 124, 124);
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
  color: rgb(168, 49, 109);
  font-size: 28px;
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
