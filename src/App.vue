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
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  computed: {
    activeIndex() {
      console.log(this.$route.path);
      return this.$route.path
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

body {
  background-color: rgba(255, 0, 212, 0.151);
}

.el-header {
  background-color: pink;
}
.el-aside {
  background-color: rgba(255, 166, 0, 0.459);
}

.el-menu {
  background-color: pink !important;
}

.el-menu-item {
  background-color: rgb(161, 89, 255);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}
.el-menu-item.is-active {
  background-color: rgb(30, 120, 255);
}
.el-menu-item span {
  font-size: 18px;
  color: rgb(0, 255, 128);
  font-weight: bold;
}
.el-menu-item.is-active span {
  font-size: 20px;
  margin-left: 10px;
  color: rgb(255, 0, 21);
  font-weight: bold;
}

#title {
  color: red;
  font-size: 30px;
}
</style>
