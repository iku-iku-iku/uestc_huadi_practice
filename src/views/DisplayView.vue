<template>
  <div class="home">
    <!-- <el-main> -->
      <el-row>
        <el-col :span="12" :offset="6" class="umap">
          <u-map />
        </el-col>
      </el-row>
    <!-- </el-main> -->
  </div>
</template>

<script>
// @ is an alias to /src
import UMap from "@/components/content/Map";
export default {
  name: "HomeView",
  components: { UMap },
};
</script>

<style scoped>
.umap {
  position: relative;
  height: 70%;
  top: 50%;
  transform: translateY(-50%);
}
.home,
.el-main,
.el-row {
  height: 100%;
}
</style>
