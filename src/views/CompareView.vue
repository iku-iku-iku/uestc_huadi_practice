<template>
  <div id="root">
    <div class="bar">
      <select name="school1" v-model="university1">
        <option v-for="(university1, index) in universities" :key="index">
          {{ university1 }}
        </option>
      </select>
      <span>VS</span>
      <select name="school2" v-model="university2">
        <option v-for="(university2, index) in universities" :key="index">
          {{ university2 }}
        </option>
      </select>
      <button>对比</button>
    </div>
    <div class="charts">
      <div class="right">
        <div ref="myCharts6" class="xueshu"></div>
      </div>
      <div class="up">
        <div ref="myCharts1" class="work"></div>
        <div ref="myCharts2" class="chuguo"></div>
        <div ref="myCharts3" class="shengxue"></div>
      </div>
      <div class="down">
        <div ref="myCharts4" class="redu"></div>
        <div ref="myCharts5" class="nannv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { request, requestInfo } from "@/network/request.js";
export default {
  name: "CompareView",

  computed: {
    universities() {
      return this.$store.state.colleges;
    },
    opt1() {
      const gaugeData1 = [
        {
          value: this.score1[0],
          name: this.university1,
          title: {
            show: true,
            offsetCenter: ["0%", "-40%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
          },
        },
        {
          value: this.score1[1],
          name: this.university2,
          title: {
            show: true,
            offsetCenter: ["0%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "20%"],
          },
        },
      ];
      return {
        title: {
          show: true,
          text: "就业率",
          top: 0,
          left: "center",
          textStyle: {
            color: "grey", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "normal", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 14, //字体大小
            lineHeight: 14, //字体行高
          },
        },
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#464646",
              },
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData1,
            detail: {
              width: 40,
              height: 12,
              fontSize: 12,
              color: "auto",
              borderColor: "auto",
              borderRadius: 18,
              borderWidth: 1,
              formatter: "{value}%",
            },
          },
        ],
      };
    },
    opt2() {
      const gaugeData2 = [
        {
          value: this.score2[0],
          name: this.university1,
          title: {
            show: true,
            offsetCenter: ["0%", "-40%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
          },
        },
        {
          value: this.score2[1],
          name: this.university2,
          title: {
            show: true,
            offsetCenter: ["0%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "20%"],
          },
        },
      ];
      return {
        title: {
          show: true,
          text: "出国深造率",
          top: 0,
          left: "center",
          textStyle: {
            color: "grey", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "normal", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 14, //字体大小
            lineHeight: 14, //字体行高
          },
        },
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#464646",
              },
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData2,
            detail: {
              width: 40,
              height: 12,
              fontSize: 12,
              color: "auto",
              borderColor: "auto",
              borderRadius: 18,
              borderWidth: 1,
              formatter: "{value}%",
            },
          },
        ],
      };
    },
    opt3() {
      const gaugeData3 = [
        {
          value: this.score3[0],
          name: this.university1,
          title: {
            show: true,
            offsetCenter: ["0%", "-40%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
          },
        },
        {
          value: this.score3[1],
          name: this.university2,
          title: {
            show: true,
            offsetCenter: ["0%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "20%"],
          },
        },
      ];
      return {
        title: {
          show: true,
          text: "国内升学率",
          top: 0,
          left: "center",
          textStyle: {
            color: "grey", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "normal", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 14, //字体大小
            lineHeight: 14, //字体行高
          },
        },
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#464646",
              },
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData3,
            detail: {
              width: 40,
              height: 12,
              fontSize: 12,
              color: "auto",
              borderColor: "auto",
              borderRadius: 16,
              borderWidth: 1,
              formatter: "{value}%",
            },
          },
        ],
      };
    },
    opt4() {
      return {
        title: {
          show: true, //false
          text: "男女比例对比", //主标题文本
          textStyle: {
            color: "grey", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "normal", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 14, //字体大小
            lineHeight: 14, //字体行高
          },
          subtext:
            "                  " +
            this.university1 +
            "                                 " +
            this.university2,
          subtextStyle: {
            color: "grey", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "normal", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 12, //字体大小
            lineHeight: 14, //字体行高
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          orient: "vertical",
          top: "center",
          feature: {
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false },
          },
        },
        legend: {
          //orient: 'vertical',
          //left: 'left',
          data: ["男", "女"],
        },
        series: [
          {
            name: this.university1,
            type: "funnel",
            width: "40%",
            //height: '45%',
            left: "5%",
            //top: '50%',
            data: this.sexData[0],
          },

          {
            name: this.university2,
            type: "funnel",
            width: "40%",
            //height: '45%',
            left: "55%",
            //top: '50%',
            sort: "ascending",
            label: {
              position: "left",
            },
            data: this.sexData[1],
          },
        ],
      };
    },
    opt5() {
      return {
        dataset: {
          source: [
            ["score", "heat", "uni"],
            [
              (this.searchPopularity[0] /
                (this.searchPopularity[0] + this.searchPopularity[1])) *
                100,
              this.searchPopularity[0],
              this.university1,
            ],
            [
              (this.searchPopularity[1] /
                (this.searchPopularity[0] + this.searchPopularity[1])) *
                100,
              this.searchPopularity[1],
              this.university2,
            ],
          ],
        },
        title: {
          show: true, //false
          text: "搜索热度对比", //主标题文本
          textStyle: {
            color: "grey",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            fontSize: 14, //字体大小
            lineHeight: 14, //字体行高
          },
        },
        grid: { containLabel: true },
        xAxis: { name: "heat" },
        yAxis: { type: "category" },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["High Heat", "Low Heat"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "heat",
              // Map the "product" column to Y axis
              y: "uni",
            },
          },
        ],
      };
    },
    opt6() {
      return {
        title: {
          text: "学术指标对比",
          left: "center",
          top: 25,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            interval: 25,
            boundaryGap: [0, 0.01],
          },
        ],
        yAxis: {
          type: "category",
          data: [
            "博士点数量",
            "硕士点数量",
            "国家重点学科数",
            "科研项目数(*10)",
          ],
        },
        series: [
          {
            name: this.university1,
            type: "bar",
            data: this.opt6Data[0],
          },
          {
            name: this.university2,
            type: "bar",
            data: this.opt6Data[1],
          },
        ],
      };
    },
  },
  data() {
    return {
      // data
      university1: "",
      university2: "",
      score1: [0, 0],
      score2: [0, 0],
      score3: [0, 0],
      myCharts1: null,
      myCharts2: null,
      myCharts3: null,
      myCharts4: null,
      myCharts5: null,
      myCharts6: null,
      sexData: [
        [
          { value: 50, name: "男" },
          { value: 50, name: "女" },
        ],
        [
          { value: 50, name: "男" },
          { value: 50, name: "女" },
        ],
      ],
      searchPopularity: [0, 0],
      opt6Data: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
  },
  watch: {
    university1(n, o) {
      this.refreshData(0, this.$store.state.college2Id[n], () => {
        // this.refreshCharts();
        this.initCharts();
      });
    },
    university2(n, o) {
      this.refreshData(1, this.$store.state.college2Id[n], () => {
        // this.refreshCharts();
        this.initCharts();
      });
    },
  },
  methods: {
    refreshData(pos, uid, callback) {
      requestInfo([uid], (dataArr) => {
        if (dataArr.length == 0) return;
        const data = dataArr[0];
        this.score1[pos] = Math.round(data.employmentRate * 100);
        this.score2[pos] = Math.round(data.goingAbroadRate * 100);
        this.score3[pos] = Math.round(data.domesticAdmissionRate * 100);
        this.sexData[pos][0].value = Math.round(100 * data.genderRate);
        this.sexData[pos][1].value = Math.round(100 * (1 - data.genderRate));
        this.searchPopularity[pos] = data.searchPopularity;
        this.opt6Data[pos][0] = data.researchProjectNumber;
        this.opt6Data[pos][1] = data.nationalKeyDisciplineNumber;
        this.opt6Data[pos][2] = data.masterPoint;
        this.opt6Data[pos][3] = data.phdPoint;
        callback();
      });
    },
    // refreshCharts() {
    //   this.myCharts1.setOption(this.op1);
    //   this.myCharts2.setOption(this.op2);
    //   this.myCharts3.setOption(this.op3);
    //   this.myCharts4.setOption(this.op5);
    //   this.myCharts5.setOption(this.op4);
    //   this.myCharts6.setOption(this.op6);
    // },
    initCharts() {
      this.myCharts1 = echarts.init(this.$refs.myCharts1);
      this.myCharts2 = echarts.init(this.$refs.myCharts2);
      this.myCharts3 = echarts.init(this.$refs.myCharts3);
      this.myCharts4 = echarts.init(this.$refs.myCharts4);
      this.myCharts5 = echarts.init(this.$refs.myCharts5);
      this.myCharts6 = echarts.init(this.$refs.myCharts6);

      this.myCharts1.setOption(this.opt1);
      this.myCharts2.setOption(this.opt2);
      this.myCharts3.setOption(this.opt3);
      this.myCharts4.setOption(this.opt5);
      this.myCharts5.setOption(this.opt4);
      this.myCharts6.setOption(this.opt6);
      // window.onresize = function () {
      //   this.myCharts1.resize();
      //   this.myCharts2.resize();
      //   this.myCharts3.resize();
      //   this.myCharts4.resize();
      //   this.myCharts5.resize();
      //   this.myCharts6.resize();
      // };
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>

<style scoped>
#root {
  height: 100%;
}
.bar * {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  height: 30px;
  text-align: center;
}
.bar {
  height: 10%;
}

.charts {
  height: 85%;
  width: 100%;
  /* background-color: brown; */
}
.up {
  height: 50%;
  width: 70%;
  /* background-color: aqua; */
}

.down {
  height: 50%;
  width: 70%;
  /* background-color: aquamarine; */
}

.right {
  height: 100%;
  width: 30%;
  float: right;
}

.right * {
  height: 100%;
  width: 100%;
}

.up * {
  height: 100%;
  width: 33.33%;
  /* background-color: black; */
  float: left;
}
.down * {
  height: 100%;
  width: 50%;
  float: left;
}

/* .work {
  height: 100%;
  width: 33%;
  background-color: black;
  float: left;
}
.chuguo {
  height: 100%;
  width: 33%;
  background-color: black;
  float: left;
}
.shengxue {
  height: 100%;
  width: 34%;
  background-color: black;
  float: left;
} */
</style>
