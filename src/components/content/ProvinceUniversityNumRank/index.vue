<template>
  <div id="num-rank"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    const chart = echarts.init(document.getElementById("num-rank"));
    const option = {
      dataset: [
        {
          dimensions: ["name", "score"],
          source: [
            ["北京", 100],
            ["四川", 90],
            ["江西", 79],
            ["江苏", 59],
            ["浙江", 49],
            ["广东", 32],
            ["上海", 22],
            ["湖南", 10],
            ["广西", 40],
            ["湖北", 23],
            ["山东", 34]
          ],
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
    option && chart.setOption(option);
  },
};
</script>

<style scoped>
#num-rank {
  width: 100%;
  height: 100%;
}
</style>
