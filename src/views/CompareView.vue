<template>
  <div id="root">
    <div class="bar">
      <select name="school1" v-model="university1">
        <option v-for="(university1,index) in universities" :key="index">{{ university1 }}</option>
      </select>
      <span>VS</span>
      <select name="school2" v-model="university2">
        <option v-for="(university2,index) in universities" :key="index">{{ university2 }}</option>
      </select>
      <button>对比</button>
    </div>
    <div class="charts">
      <div class="up">
        <div ref="myCharts1" class="work"></div>
        <div ref="myCharts2" class="chuguo"></div>
        <div ref="myCharts3" class="shengxue"></div>
      </div>
      <div class="down">
        <div ref="myCharts4" class="paiming"></div>
        <div ref="myCharts5" class="nannv"></div>
      </div>
    </div>
  </div>


</template>



<script>
import * as echarts from "echarts"
export default {
  name:'CompareView',
  mounted(){
    this.draw()
  },
  data() {
    return {
      // data
      universities: ['北京大学', '清华大学', '北京理工大学', '北京航空航天大学', '中国农业大学', '复旦大学', '上海交通大学', '西安交通大学', '哈尔滨工业大学', '中国科学技术大学', '南开大学', '天津大学', '南京大学', '浙江大学', '西北工业大学', '中国人民大学', '北京师范大学', '大连理工大学', '吉林大学', '同济大学', '东南大学', '武汉大学', '华中科技大学', '中南大学', '国防科技大学', '中山大学', '中国石油大学', '北京中医药大学', '北京邮电大学', '北京林业大学', '北京科技大学', '北京交通大学', '北京化工大学', '北京外国语大学', '对外经济贸易大学', '中央音乐学院', '北京工业大学', '中央民族大学', '天津医科大学', '河北工业大学', '太原理工大学', '内蒙古大学', '东北大学', '辽宁大学', '大连海事大学', '东北师范大学', '延边大学', '东北农业大学', '华东师范大学', '华东理工大学', '东华大学', '上海财经大学', '上海外国语大学', '上海大学', '上海医科大学', '中国人民解放军海军军医大学', '中国矿业大学', '中国药科大学', '南京农业大学', '江南大学', '河海大学', '南京航空航天大学', '南京理工大学', '南京师范大学', '苏州大学', '南昌大学', '安徽大学', '厦门大学', '福州大学', '山东大学', '中国海洋大学', '郑州大学', '中国地质大学', '武汉理工大学', '湖南大学', '湖南师范大学', '华南理工大学', '暨南大学', '华南师范大学', '广西大学', '重庆大学', '四川大学', '电子科技大学', '西南交通大学', '西南财经大学', '四川农业大学', '云南大学', '兰州大学', '西安电子科技大学', '长安大学', '西北大学', '第四军医大学', '中国传媒大学', '哈尔滨工程大学', '西南大学', '中国政法大学', '中央财经大学', '华北电力大学', '东北林业大学', '合肥工业大学', '华中农业大学', '华中师范大学', '中南财经政法大学', '贵州大学', '西北农林科技大学', '北京体育大学', '陕西师范大学', '宁夏大学', '海南大学', '青海大学', '石河子大学', '西藏大学'],
      university1: '1',
      university2: '2'
    };
  },
  watch:{
    university1:function(val){
      this.draw()
    },
    university2: function (val) {
      this.draw()
    }
  },
  methods:{
    draw(){
      let myCharts1 = echarts.init(this.$refs.myCharts1);
      let myCharts2 = echarts.init(this.$refs.myCharts2);
      let myCharts3 = echarts.init(this.$refs.myCharts3);
      let myCharts4 = echarts.init(this.$refs.myCharts4);
      let myCharts5 = echarts.init(this.$refs.myCharts5);

      let op1 = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', 'a', 'b'],
          source: [
            { product: '2019', a: 43.3, b: 85.8 },
            { product: '2020', a: 83.1, b: 73.4 },
            { product: '2021', a: 86.4, b: 65.2 },
            // { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      const school = ['a', 'b']
      const score = [98, 76]
      const gaugeData = [
        {
          value: score[0],
          name: school[0],
          title: {
            offsetCenter: ['0%', '-30%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%']
          }
        },
        {
          value: score[1],
          name: school[1],
          title: {
            offsetCenter: ['0%', '0%']
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%']
          }
        },
      ];
      const op2 = {
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: '#464646'
              }
            },
            axisLine: {
              lineStyle: {
                width: 40
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            title: {
              fontSize: 14
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 14,
              color: 'auto',
              borderColor: 'auto',
              borderRadius: 20,
              borderWidth: 1,
              formatter: '{value}%'
            }
          }
        ]
      };
      let op3 = {

        title: [{
          text: '75%',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 24,
            color: '#FFFFFF',
            fontFamily: 'DINAlternate-Bold, DINAlternate',
            foontWeight: '600',
          },
        }, {
          text: '就业率',
          left: 'center',
          bottom: '5%',
          textStyle: { color: "#000" }
        }],
        // backgroundColor: '#111',
        polar: {//极坐标系地底板，类似于grid
          radius: ['60%', '80%'],
          center: ['50%', '50%'],
        },
        angleAxis: {//角度轴，一个圆圈
          max: 100,
          show: true,
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {//径向轴，一段线段，type:'category'类目轴，类似的x轴的类目轴
          type: 'category',
          show: true,
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
        },
        series: [{
          name: '',
          type: 'bar',//柱状图
          roundCap: true,
          barWidth: 90,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(66, 66, 66, .3)',
          },
          data: [60],
          coordinateSystem: 'polar',//采用极坐标系

          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{//color为渐变色
                offset: 0,
                color: '#16CEB9',
              },
              {
                offset: 1,
                color: '#6648FF',
              },
              ]),
            },
          },
        },
        {
          name: '',
          type: 'pie',//饼图
          startAngle: 90,//开始的角度
          radius: ['85%'],
          hoverAnimation: false,
          animation: false,//不开启动画，
          center: ['50%', '50%'],
          itemStyle: {
            color: 'rgba(66, 66, 66, .1)',//饼图的颜色，设置为透明
            borderWidth: 1,//主要显示边框
            borderColor: '#5269EE',
          },
          data: [100],
        },
        {
          name: '',
          type: 'pie',
          startAngle: 80,
          radius: ['55%'],
          hoverAnimation: false,
          animation: false,
          center: ['50%', '50%'],
          itemStyle: {
            color: 'rgba(66, 66, 66, .1)',
            borderWidth: 1,
            borderColor: '#5269EE',
          },
          data: [100],
        }
        ],

      };
      let op4 = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', 'a', 'b'],
          source: [
            { product: '2019', a: 43.3, b: 85.8 },
            { product: '2020', a: 83.1, b: 73.4 },
            { product: '2021', a: 86.4, b: 65.2 },
            // { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      let op5 = {
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, 'Matcha Latte'],
            [57.1, 78254, 'Milk Tea'],

          ]
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      };

      myCharts1.setOption(op3);
      myCharts2.setOption(op3);
      myCharts3.setOption(op3);
      myCharts4.setOption(op4);
      myCharts5.setOption(op2);
      window.onresize = function () {
        myCharts1.resize();
        myCharts2.resize();
        myCharts3.resize();
        myCharts4.resize();
        myCharts5.resize();
      }
    }
  }
};
</script>

<style scoped>
#root {
  height: 100%;
}
.bar *{
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
  width: 100%;
  /* background-color: aqua; */
}

.down {
  height: 50%;
  width: 100%;
  /* background-color: aquamarine; */
}

.up *{
  height: 100%;
  width: 33.33%;
  /* background-color: black; */
  float: left;
}
.down *{
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
