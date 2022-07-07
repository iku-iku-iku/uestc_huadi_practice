<template>
  <div class="home">
    <!-- <el-main> -->
    <el-row>
      <el-col :span="12" :offset="0" class="umap">
        <u-map />
      </el-col>

      <el-col :span="12" class="num-rank">
        <province-university-num-rank />
      </el-col>
    </el-row>
    <!-- </el-main> -->
  </div>
</template>

<script>
// @ is an alias to /src
import UMap from "@/components/content/Map";
import ProvinceUniversityNumRank from "@/components/content/ProvinceUniversityNumRank";
export default {
  name: "HomeView",
  components: { UMap, ProvinceUniversityNumRank },
};
</script>

<style scoped>
.num-rank,
.umap {
  position: relative;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.home,
.el-main,
.el-row {
  height: 100%;
}
.el-row {
  justify-content: center;
}
</style>
