<template>
  <el-container>
    <el-header height="100px">
      <el-col :span="12" :offset="6">
        <h1 id="title">高等院校分析与推荐系统</h1>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="tab" :default-active="activeIndex">
          <router-link :to="m.to" v-for="(m, idx) in modules">
            <el-menu-item :key="m.name" :index="m.to">
              <span>{{ m.name }}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
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
  background-color: rgba(154, 190, 175, 0.527);
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
  font-size: 18px;
  /* color: rgb(174, 0, 255); */
  color: black;
  font-weight: bold;
}
.el-menu-item.is-active span {
  font-size: 20px;
  margin-left: 10px;
  /* color: rgba(0, 255, 85, 0.829); */
  color: black;
  font-weight: bold;
}

#title {
  color: black;
  /* color: rgb(4, 0, 255); */
  font-size: 36px;
}
</style>
