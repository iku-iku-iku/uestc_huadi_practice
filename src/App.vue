<template>
  <el-container>
    <el-header height="70px">
      <el-col :span="14" :offset="5">
        <img src="@/assets/纸笔2.png" width="80" align="top" />
        <span id="title">高等院校分析与推荐系统</span>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <el-menu class="tab" :default-active="activeIndex">
          <router-link :to="m.to" v-for="(m, idx) in modules">
            <el-menu-item :key="m.name" :index="m.to">
              <span>{{ m.name }}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
        <img id="flower" src="@/assets/荷花2.png" width="160" align="notset" />
      </el-aside>
      <el-main style="overflow: hidden">
        <router-view :key="key" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { request } from "@/network/request.js";
export default {
  computed: {
    activeIndex() {
      return this.$route.path;
    },
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
  },
  data() {
    return {
      modules: [
        { name: "大学信息展示", to: "/display" },
        { name: "大学招生信息分析", to: "/analysis" },
        { name: "大学对比分析", to: "/compare" },
        { name: "大学个性化推荐", to: "/recommend" },
      ],
    };
  },
  mounted() {
    request({
      method: "GET",
      url: "/province/college/info",
    })
      .then((res) => {
        this.$store.commit("registerProvinces", res.data);
        console.log("registered");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-container,
header,
#app,
body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
a {
  text-decoration: none;
}
body {
  background-color: rgba(0, 195, 255, 0.151) !important;
}

.el-menu,
.el-aside {
  /* background-color: rgba(164, 217, 255, 0.603) !important; */
  background-color: rgba(0, 195, 255, 0.151) !important;
  border-right: 2px solid black;
}
.el-menu-item {
  background-color: #f0c9cf;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.el-header {
  background-color: rgb(193, 235, 243);
}

.el-menu-item.is-active {
  background-color: rgba(2, 103, 255, 0.24);
}
.el-menu-item span {
  font-size: 14px;
  /* color: rgb(174, 0, 255); */
  color: black;
  font-weight: bold;
  font-family: "宋体";
}
.el-menu-item.is-active span {
  font-size: 16px;
  margin-left: 1px;
  /* color: rgba(0, 255, 85, 0.829); */
  color: black;
  font-weight: bold;
  font-family: "宋体";
}

#title {
  color: black;
  /* color: rgb(4, 0, 255); */
  font-size: 50px;
  font-family: "隶书";
  margin-top: 2px;
}

#flower {
  position: fixed;
  bottom: 2px;
  left: 0px;
}
</style>
