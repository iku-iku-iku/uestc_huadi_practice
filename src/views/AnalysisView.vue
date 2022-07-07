<template>
  <div id="select">
    <el-row>
      <el-col :span="2">
          <span>高校</span>
      </el-col>    
        <select name="school" v-model="university">
          <option v-for="(university,index) in universities" :key="index">{{ university }}</option>
        </select> 
        <el-col :span="2">
          <span>招生省份</span>  
        </el-col>
        <select name="province1" v-model="province1">
          <option v-for="(province1,index) in provinces" :key="index">{{ province1 }}</option>
        </select>
        <select name="province2" v-model="province2">
          <option v-for="(province2,index) in provinces" :key="index">{{ province2 }}</option>
        </select>
        <select name="province3" v-model="province3">
          <option v-for="(province3,index) in provinces" :key="index">{{ province3 }}</option>
        </select>
    </el-row>
  </div> 
  <el-main>
    <el-row>
      <el-col :span="12">
        <province-recruit />
      </el-col>
      <el-col :span="12">
        <div class="analysis" id="main" style="height: 100%;"></div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import * as echarts from "echarts";

import ProvinceRecruit from "@/components/content/ProvinceRecruit";

export default {
  components: { ProvinceRecruit },
  name:'AnalysisView',
  mounted(){
    this.draw()
  },
  watch:{
    university:function(val){
      this.draw()
    },
    province1: function (val) {
      this.draw()
    },
    province2: function (val) {
      this.draw()
    },
    province3: function (val) {
      this.draw()
    }
  },
  data() {
    return {
      // data
      universities: ['北京大学', '清华大学', '北京理工大学', '北京航空航天大学', '中国农业大学', '复旦大学', '上海交通大学', '西安交通大学', '哈尔滨工业大学', '中国科学技术大学', '南开大学', '天津大学', '南京大学', '浙江大学', '西北工业大学', '中国人民大学', '北京师范大学', '大连理工大学', '吉林大学', '同济大学', '东南大学', '武汉大学', '华中科技大学', '中南大学', '国防科技大学', '中山大学', '中国石油大学', '北京中医药大学', '北京邮电大学', '北京林业大学', '北京科技大学', '北京交通大学', '北京化工大学', '北京外国语大学', '对外经济贸易大学', '中央音乐学院', '北京工业大学', '中央民族大学', '天津医科大学', '河北工业大学', '太原理工大学', '内蒙古大学', '东北大学', '辽宁大学', '大连海事大学', '东北师范大学', '延边大学', '东北农业大学', '华东师范大学', '华东理工大学', '东华大学', '上海财经大学', '上海外国语大学', '上海大学', '上海医科大学', '中国人民解放军海军军医大学', '中国矿业大学', '中国药科大学', '南京农业大学', '江南大学', '河海大学', '南京航空航天大学', '南京理工大学', '南京师范大学', '苏州大学', '南昌大学', '安徽大学', '厦门大学', '福州大学', '山东大学', '中国海洋大学', '郑州大学', '中国地质大学', '武汉理工大学', '湖南大学', '湖南师范大学', '华南理工大学', '暨南大学', '华南师范大学', '广西大学', '重庆大学', '四川大学', '电子科技大学', '西南交通大学', '西南财经大学', '四川农业大学', '云南大学', '兰州大学', '西安电子科技大学', '长安大学', '西北大学', '第四军医大学', '中国传媒大学', '哈尔滨工程大学', '西南大学', '中国政法大学', '中央财经大学', '华北电力大学', '东北林业大学', '合肥工业大学', '华中农业大学', '华中师范大学', '中南财经政法大学', '贵州大学', '西北农林科技大学', '北京体育大学', '陕西师范大学', '宁夏大学', '海南大学', '青海大学', '石河子大学', '西藏大学'],
      university: '1',
      provinces: ['湖北','湖南','广东','广西','贵州','四川'],
      province1: '湖南',
      province2: '湖北',
      province3: '四川',
    };
  },
  methods: {
    draw(){
      var myChart = echarts.init(document.getElementById("main"));
      // 输入三个省份,2019-2021年的分数score和招生人数people，每一年的数据放在一个list里
      const province = [this.province1, this.province2, this.province3];
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
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
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
            name: this.province1+"录取分数线",
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
            name: this.province2+"录取分数线",
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
            name: this.province3+"录取分数线",
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
    }
    // methods
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
