<template>
  <div id="app">
    <nav id="nav"   >
      <el-col :xs="20" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="logo">
          <!-- <img src="@/assets/logo.png" alt="Vue Logo" /> -->
          <span class="title">{{ appTitle }}</span>
        </div>
      </el-col>
      <!-- <div class="left">
        <div class="brand">
          <img src="@/assets/logo.png" alt="Vue Logo" />
          <span class="title">{{ appTitle }}</span>
        </div> -->
        <!-- <router-link to="/">Home</router-link>
        <router-link v-if="user !== null" to="/protected"
          >Protected</router-link
        > -->
       
      <!-- </div> -->
      <el-col :xs="0" :sm="20" :md="20" :lg="20" :xl="20">
        <el-menu 
        default-active="activeIndex"
            class="el-menu-demo hidden-xs-only nav-pc"
            mode="horizontal"
            @select="handleSelect"
            background-color=teal
            text-color=white
            active-text-color="#fff">
          <!-- <el-menu-item   index="1">Home</el-menu-item> -->
          <el-menu-item index="1" class="iconfont icon-home"><router-link to="/">Home</router-link></el-menu-item>
          <el-menu-item index="2" class="iconfont icon-home"><router-link to="/categories">categories</router-link></el-menu-item>
          <el-menu-item index="3" class="iconfont icon-home"><router-link to="/Collect">My Favorite</router-link></el-menu-item>
          <!-- <el-submenu index="3">
            <template    slot="title">Pages</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template  slot="title">Pages</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item>
            <router-link v-if="user !== null" to="/protected">Protected</router-link>
          </el-menu-item> -->
          <el-menu-item index="5"><router-link v-if="user === null" to="/login">Login</router-link></el-menu-item>
          <el-menu-item index="6" vertical-align="top"><router-link v-if="user === null" to="/register">Register</router-link></el-menu-item>
          <el-menu-item index="7" vertical-align="top" ><li v-if="user !== null"><a href="#" @click.prevent="doLogout">Logout</a></li></el-menu-item>
          <el-menu-item index="8" vertical-align="top" ><li v-if="user !== null"><a href="#" @click.prevent="doLogout"></a>{{ user.username }}</li></el-menu-item>
          <!-- <el-menu-item ><li v-if="user !== null">{{ user.username }}<a href="#" @click.prevent="doLogout">Logout</a></li></el-menu-item> -->
        </el-menu>
      </el-col>

      <!-- <div class="spacer"></div> -->
      <!-- <div class="right">
        <router-link v-if="user === null" to="/login">Login</router-link>
        <router-link v-if="user === null" to="/register">Register</router-link>
        <li v-if="user !== null">
          <a href="#" @click.prevent="doLogout">Logout</a>
        </li>
      </div> -->
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "MyApp",
       activeIndex: '1',
        activeIndex2: '1'
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch("LOG_OUT");
      this.$router.push({ name: "Home" });
    },
    
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      }
    
  }
  ,
  mounted() {
    document.title = this.appTitle;
  },
  watch: {
    $route(to) {
      document.title = to.meta.title
        ? `${this.appTitle}: ${to.meta.title}`
        : this.appTitle;
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  height: 100vh;
  .content {
    flex: 1;
    margin: 24px;
  }
}

nav {
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  padding: 16px 30px;
  background-color: teal;
  // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  //  font-size: 1.2em;
  // .spacer {
  //   flex: 1;
  // }

  margin-bottom: 10px;
  .left {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .brand {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 2em;
      }
      .title {
        color: white;
        font-size: 1.5em;
        font-weight: bold;
        margin-left: 8px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  list-style: none;
  a {
    font-weight: bold;
    color: white;
    margin-left: 24px;
    list-style: none;
    text-decoration: none;

    &.router-link-exact-active {
      color: #16db82;
    }
  }
}
.logo {
    line-height: 40px;
    font-size: 26px;
    margin-left: 20px;
  }
.nav-pc {
    border-bottom: none;
     font-size: 26px;
    margin:0 20px 0 0;
    float: right;
    > li {
      padding: 0;
      > a {
        display: inline-block;
        padding: 0 0px;
        text-align: center;
        > .iconfont {
          vertical-align: top;
          margin: 0 5px 0 0;
        }
      }
    }
  }

.iconfont {
          vertical-align: top;
          margin: 0 5px 0 0;
        }
</style>
