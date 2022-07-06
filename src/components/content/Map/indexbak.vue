<!-- <template>
  <div id="china_map"></div>
</template>

<script>
import * as echarts from "echarts";
require("@/assets/china.js");
export default {
  mounted() {
    // 初始化echarts实例
    this.chinachart = echarts.init(document.getElementById("china_map"));
    // 进行相关配置
    this.chartOption = {
      tooltip: {
        // 鼠标移到图里面的浮动提示框
        // formatter详细配置:  https://echarts.baidu.com/option.html#tooltip.formatter
        formatter(params, ticket, callback) {
          // params.data 就是series配置项中的data数据遍历
          let localValue, perf, downloadSpeep, usability, point;
          if (params.data) {
            localValue = params.data.value;
            perf = params.data.perf;
            downloadSpeep = params.data.downloadSpeep;
            usability = params.data.usability;
            point = params.data.point;
          } else {
            // 为了防止没有定义数据的时候报错写的
            localValue = 0;
            perf = 0;
            downloadSpeep = 0;
            usability = 0;
            point = 0;
          }
          let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:-10px;'>
	          区域对应数据value: ${localValue}<br/>
	          性能perf: ${perf}<br/>
	          下载速度downloadSpeep: ${downloadSpeep}<br/>
	          可用性usability: ${usability}<br/>
	          监测点数point: ${point}<br/>
          </p>
        `;
          return htmlStr;
        },
        // backgroundColor:"#ff7f50",//提示标签背景颜色
        // textStyle:{color:"#fff"} //提示标签字体颜色
      },
      // visualMap的详细配置解析: https://echarts.baidu.com/option.html#visualMap
      visualMap: {
        // 左下角的颜色区域
        type: "piecewise", // 定义为分段型 visualMap
        min: 0,
        max: 1000,
        itemWidth: 40,
        bottom: 60,
        left: 20,
        pieces: [
          // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
          { gt: 900, lte: 1000, label: "非常好", color: "#6ad86e" }, // (900, 1000]
          { gt: 500, lte: 900, label: "正常", color: "#9adcfa" }, // (500, 900]
          { gt: 310, lte: 500, label: "警告", color: "#ffeb3b" }, // (310, 500]
          { gt: 200, lte: 300, label: "较差", color: "#ff9800" }, // (200, 300]
          { gt: 10, lte: 200, label: "非常差", color: "orangered" }, // (10, 200]
          { value: 0, label: "无数据", color: "#999" }, // [0]
        ],
      },
      // geo配置详解:  https://echarts.baidu.com/option.html#geo
      geo: {
        // 地理坐标系组件用于地图的绘制
        map: "china", // 表示中国地图
        // roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
        label: {
          show: true,
        },
        itemStyle: {
          // 地图区域的多边形 图形样式。
          borderColor: "rgba(0, 0, 0, 0.2)",
          emphasis: {
            // 高亮状态下的多边形和标签样式
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          name: "", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
          type: "map",
          geoIndex: 0,
          label: {
            show: true,
          },
          // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
          data: [
            {
              name: "北京",
              value: 599,
              perf: "0.501s", // 性能
              downloadSpeep: "1.221MB/s", // 下载速度
              usability: "100%", // 可用性
              point: "250", // 监测点
            },
            {
              name: "上海",
              value: 142,
            },
            {
              name: "黑龙江",
              value: 44,
            },
            {
              name: "新疆",
              value: 999,
              perf: "0.501s", // 性能
              downloadSpeep: "1.221MB/s", // 下载速度
              usability: "100%", // 可用性
              point: "250", // 监测点
            },
            {
              name: "深圳",
              value: 92,
            },
            {
              name: "湖北",
              value: 810,
            },
            {
              name: "四川",
              value: 453,
            },
          ],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示地图数据
    this.chinachart.setOption(this.chartOption);
  },
};
</script>

<style scoped>
#china_map {
  width: 100%;
  height: 100%;
}
</style> -->
<template>
  <div class="wrap">
    <div class="screen" ref="screen"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
require("@/assets/china.js");
import { reactive } from "vue";
export default {
  name: "default",
  setup() {
    const echart = reactive({
      title: "大学分布", //选中的省份
      zoom: 0.1,
    });
    return {
      echart,
    };
  },
  data() {
    return {
      mapSelParam: null, //选中的参数
    };
  },
  components: {},
  methods: {
    initEcharts() {
      //初始化echarts
      let echartApp = echarts.init(this.$refs.screen);

      //设置配置项
      echartApp.setOption(this.getEchartsOptions());

      //点击各省份事件处理
      echartApp.on("click", (param) => {
        //获取到的省份名
        let temp = JSON.stringify(this.mapSelParam);
        if (this.mapSelParam) {
          //取消选中前一次选中的省份
          echartApp.dispatchAction({
            type: "geoUnSelect",
            seriesIndex: this.mapSelParam.seriesIndex,
            seriesName: this.mapSelParam.seriesName,
            dataIndex: this.mapSelParam.dataIndex,
            name: this.mapSelParam.name,
          });
        }

        this.mapSelParam = {
          seriesIndex: param.seriesIndex,
          seriesName: param.seriesName,
          dataIndex: param.dataIndex,
          name: param.name,
        };

        //*********************************
        //***为选中的省份的参数赋值**********
        //*********************************
        this.echart["title"] = param.name;

        echartApp.setOption(this.getEchartsOptions());
        //如果前一次选中与当前选中相同，则return，取消选中
        if (temp === JSON.stringify(this.mapSelParam)) {
          this.echart["title"] = "大学分布";
          echartApp.setOption(this.getEchartsOptions());
          this.mapSelParam = {};
          return;
        }

        //选中当前点击的省份
        echartApp.dispatchAction({
          type: "geoSelect",
          seriesIndex: this.mapSelParam.seriesIndex,
          seriesName: this.mapSelParam.seriesName,
          dataIndex: this.mapSelParam.dataIndex,
          name: this.mapSelParam.name,
        });

        console.log(this.mapSelParam.name);
      });

      this.$nextTick(() => {
        this.echart.zoom = 1.1;
        echartApp.setOption(this.getEchartsOptions());
      });
    },
    getEchartsOptions() {
      return {
        title: {
          text: this.echart.title,
          textStyle: {
            color: "#FFF",
            fontSize: 24,
          },
          top: 20,
          left: 20,
        },
        geo: {
          //引入中国地图
          map: "china",
          //是否可以缩放，拖拽
          roam: true,
          zoom: this.echart.zoom,
          //地名配置项
          label: {
            //默认情况下配置项
            normal: {
              show: true,
              textStyle: {
                color: "#CCC",
              },
            },
            //选中高亮情况下配置项
            emphasis: {
              textStyle: {
                color: "#FFF",
              },
            },
          },
          //各省样式
          itemStyle: {
            normal: {
              areaColor: "#3034A0",
              borderColor: "#3057D3",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#4467CC",
              borderColor: "#448aff",
            },
          },
          scaleLimit: {
            min: 0.7,
            max: 10,
          },
        },
        //系列配置

        data: [
          {
            name: "北京",
            value: 20057.34,
            label:  {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name + "\n" + params.value; //地图上展示文字 + 数值
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#C1FFC1", //地图颜色
              },
            },
          },
          {
            name: "江西",
            value: 15477.48,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name + "\n" + params.value;
                },
              },
            },
          },
        ],

        // series: [
        //   {
        //     name: "大数据",
        //     type: "map",
        //     //【此参数必须配置，否则visualMap不起作用】
        //     geoIndex: 0,
        //     itemStyle: {
        //       normal: { label: { show: true } },
        //       emphasis: { label: { show: true } },
        //     },
        //     //此处可接收后端参数，当前数据仅为测试
        //     data: [
        //       {
        //         name: "江西",
        //         label: {
        //           normal: {
        //             show: true,
        //             formatter: function (params) {
        //               return params.name + "[1]";
        //             },
        //           },
        //         },
        //       },
        //     ],
        //   },
        // ],
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: 2000,
      };
    },
  },
  mounted() {
    //代码入口
    this.initEcharts();
  },
};
</script>

<style lang="css" scoped>
.wrap {
  background-color: #22287c;
  min-height: 100%;
}
.screen {
  width: 100%;
  min-height: 800px;
}
</style>
