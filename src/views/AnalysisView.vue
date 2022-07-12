<template>
  <div id="select">
    <el-row>
      <el-col :span="2">
        <span>高校</span>
      </el-col>
      <select name="school" v-model="university">
        <option v-for="(university, index) in colleges" :key="index">
          {{ university }}
        </option>
      </select>
      <el-col :span="2">
        <span>招生省份</span>
      </el-col>
      <select name="province1" v-model="province1">
        <option v-for="(province1, index) in provinces" :key="index">
          {{ province1 }}
        </option>
      </select>
      <select name="type" v-model="type1">
        <option v-for="(type, index) in types" :key="type">
          {{ type }}
        </option>
      </select>
      <select name="province2" v-model="province2">
        <option v-for="(province2, index) in provinces" :key="index">
          {{ province2 }}
        </option>
      </select>
      <select name="type" v-model="type2">
        <option v-for="(type, index) in types" :key="type">
          {{ type }}
        </option>
      </select>
      <select name="province3" v-model="province3">
        <option v-for="(province3, index) in provinces" :key="index">
          {{ province3 }}
        </option>
      </select>
      <select name="type" v-model="type3">
        <option v-for="(type, index) in types" :key="type">
          {{ type }}
        </option>
      </select>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="3">
        <span
          >温馨提醒：个别省份涉及高考改革，分科方式有改变，请切换科类查看不同年份的分数</span
        >
      </el-col>
    </el-row>
  </div>
  <el-main>
    <el-row>
      <el-col :span="12">
        <province-recruit />
      </el-col>
      <el-col :span="12">
        <div class="analysis" id="main" style="height: 100%"></div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import * as echarts from "echarts";

import ProvinceRecruit from "@/components/content/ProvinceRecruit";
import { request } from "@/network/request.js";

export default {
  components: { ProvinceRecruit },
  name: "AnalysisView",
  computed: {
    colleges() {
      return this.$store.state.colleges;
    },
    provinces() {
      return this.$store.state.provinces;
    },
    stateId() {
      return this.$store.state.stateId;
    },
    opt1() {
      const province = [this.province1, this.province2, this.province3];
      const score = this.score;
      const people = this.people;
      return {
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
            restore: { show: false },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["2019录取人数", "2020录取人数", "2021录取人数", "录取分数线"],
        },
        xAxis: [
          {
            type: "category",
            data: province,
            axisPointer: {
              type: "shadow",
            },
          },
          {
            show: false,
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
            min: 300,
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
            name: this.province1 + "录取分数线",
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
            name: this.province2 + "录取分数线",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " 分";
              },
            },
            // data: score[1],
            data: [, , ,].concat(score[1]),
          },
          {
            name: this.province3 + "录取分数线",
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
    },
  },
  data() {
    return {
      // data
      university: "1",
      types: ["文科/历史类", "理科/物理类", "综合类"],
      type1: "",
      type2: "",
      type3: "",
      province1: "",
      province2: "",
      province3: "",
      people: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      score: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
  },
  watch: {
    university(n, o) {
      this.refreshData(
        0,
        this.province1,
        this.type1,
        this.$store.state.college2Id[n],
        () => {
          this.initCharts();
        }
      );
      this.refreshData(
        1,
        this.province2,
        this.type2,
        this.$store.state.college2Id[n],
        () => {
          this.initCharts();
        }
      );
      this.refreshData(
        2,
        this.province3,
        this.type3,
        this.$store.state.college2Id[n],
        () => {
          this.initCharts();
        }
      );
    },
    province1(n, o) {
      this.refreshData(
        0,
        n,
        this.type1,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    province2(n, o) {
      this.refreshData(
        1,
        n,
        this.type2,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    province3(n, o) {
      this.refreshData(
        2,
        n,
        this.type3,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    type1(n, o) {
      this.refreshData(
        0,
        this.province1,
        n,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    type2(n, o) {
      this.refreshData(
        1,
        this.province2,
        n,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    type3(n, o) {
      this.refreshData(
        2,
        this.province3,
        n,
        this.$store.state.college2Id[this.university],
        () => {
          this.initCharts();
        }
      );
    },
    stateId(n, o) {
      this.initCharts();
    },
  },
  methods: {
    refreshData(pos, province, type, uid, callback) {
      request({
        method: "GET",
        url: `/admission/college/${uid}/min_fractional_line`,
      }).then((res) => {
        const data = res.data;
        const ad_list = [];
        // 2021-2019
        console.log(data);
        data.forEach((ad_info) => {
          if (ad_info.provinceName == province) {
            ad_list.push(ad_info);
          }
        });

        if (type == "文科/历史类") {
          type = "文科";
        }
        if (type == "理科/物理类") {
          type = "理科";
        }
        this.score[pos][0] = ad_list[2].minFractionalLine[type];
        this.score[pos][1] = ad_list[1].minFractionalLine[type];
        this.score[pos][2] = ad_list[0].minFractionalLine[type];
        this.people[pos][0] = 0;
        this.people[pos][1] = 0;
        this.people[pos][2] = 0;
        for (let j = 0; j < 3; j++) {
          if (typeof this.score[pos][j] === "undefined") {
            if (type == "理科") {
              this.score[pos][j] = ad_list[2 - j].minFractionalLine["物理类"];
            } else {
              if (type == "文科") {
                this.score[pos][j] = ad_list[2 - j].minFractionalLine["历史类"];
              }
            }
          }
        }
        callback();
      });
    },
    initCharts() {
      this.myChart1 = echarts.init(document.getElementById("main"));
      this.myChart1.setOption(this.opt1);
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>

<style scoped>
.el-main,
.el-row,
.el-col {
  height: 100%;
}
</style>
