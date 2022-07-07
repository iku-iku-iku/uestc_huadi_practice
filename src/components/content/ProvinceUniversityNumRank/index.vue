<template>
  <div id="num-rank"></div>
</template>

<script>
import * as echarts from "echarts";
import { ref } from "vue";

export default {
  computed: {
    stateId() {
      return this.$store.state.stateId;
    },
    source() {
      return this.$store.state.provinces.map((province) => [
        province,
        this.$store.state.province2Colleges[province].length,
      ]);
    },
    option() {
      return {
        title: {
          show: true,
          text: "各省大学数量排名",
          x: "center",
          textStyle: {
            fontSize: 22,
          },
        },
        dataset: [
          {
            dimensions: ["name", "score"],
            source: this.source,
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "score", order: "desc" },
            },
          },
        ],
        xAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 30 },
        },
        yAxis: {},
        series: {
          type: "bar",
          encode: { x: "name", y: "score" },
          datasetIndex: 1,
        },
      };
    },
  },
  methods: {
    refreshChart() {
      const chart = echarts.init(document.getElementById("num-rank"));
      const option = this.option;
      option && chart.setOption(option);
    },
  },
  mounted() {
    this.refreshChart();
  },
  watch: {
    stateId(n, o) {
      this.refreshChart();
    },
  },
};
</script>

<style scoped>
#num-rank {
  width: 100%;
  height: 100%;
}
</style>
