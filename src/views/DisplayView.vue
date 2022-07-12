<template>
  <el-row>
    <el-col :span="12">
      <u-map />
    </el-col>
    <el-col :span="12">
      <el-row class="chart">
        <province-university-num-rank />
      </el-row>
      <el-row class="chart">
        <heat />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import UMap from "@/components/content/Map";
import ProvinceUniversityNumRank from "@/components/content/ProvinceUniversityNumRank";
import Heat from "@/components/content/Heat";

export default {
  name: "HomeView",
  components: { UMap, ProvinceUniversityNumRank, Heat },
};
</script>

<style scoped>
.chart {
  height: 50%;
}
</style>
