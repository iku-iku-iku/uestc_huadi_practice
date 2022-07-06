<template>
  <div class="analysis" id="main" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      // data
    };
  },
  methods: {
    // methods
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 输入三个省份,2019-2021年的分数score和招生人数people，每一年的数据放在一个list里
    const province = ["湖北", "四川", "陕西"];
    const score = [
      [580, 600, 590],
      [650, 645, 648],
      [623, 643, 638],
    ];
    const people = [
      [100, 95, 120],
      [54, 67, 23],
      [207, 187, 194],
    ];
    // 指定图表的配置项和数据
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ["2019录取人数", "2020录取人数", "2021录取人数", "录取分数线"],
      },
      xAxis: [
        {
          type: "category",
          data: ["湖北", "陕西", "四川"],
          axisPointer: {
            type: "shadow",
          },
        },
        {
          type: "category",
          data: [
            "2019",
            "2020",
            "2021",
            "2019",
            "2020",
            "2021",
            "2019",
            "2020",
            "2021",
          ],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "录取人数",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} 人",
          },
        },
        {
          type: "value",
          name: "分数线",
          min: 500,
          max: 750,
          interval: 50,
          axisLabel: {
            formatter: "{value} 分",
          },
        },
      ],
      series: [
        {
          name: "2019录取人数",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + " 人";
            },
          },
          data: people[0],
        },
        {
          name: "2020录取人数",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + " 人";
            },
          },
          data: people[1],
        },
        {
          name: "2021录取人数",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + " 人";
            },
          },
          data: people[2],
        },
        {
          name: "湖北录取分数线",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + " 分";
            },
          },
          data: score[0],
        },
        {
          name: "陕西录取分数线",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + " 分";
            },
          },
          data: [, , ,].concat(score[1]),
        },
        {
          name: "四川录取分数线",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + " 分";
            },
          },
          data: [, , , , , ,].concat(score[2]),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style scoped></style>
