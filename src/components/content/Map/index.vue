<template>
  <div class="wrap">
    <div class="screen" ref="screen"></div>

    <el-dialog v-model="dialogVisible" :title="chosenProvince">
      <el-table :data="gridData">
        <el-table-column label="name">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark">
              <template #content
                ><span v-for="adv in scope.row.advantage"> {{adv}}<br /> </span>
              </template>
              <el-button>{{scope.row.name}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="type" label="类别"  />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
require("@/assets/china.js");
import { reactive, ref } from "vue";
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
      dialogVisible: ref(false),
      gridData: [
        {
          name: "电子科技大学",
          type: "985 211",
          advantage: ["我是一个优势专业","我是一个优势专业","我是一个优势专业"],
        },
        {
          name: "四川大学",
          type: "985 211",
          advantage: ["我是一个优势专业","我是一个优势专业","我是一个优势专业"],
        },
      ],
      chosenProvince: ref("")
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

        this.chooseProvince(this.mapSelParam.name);
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
            label: {
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
    chooseProvince(provinceName) {
      this.dialogVisible = true
      this.chosenProvince = provinceName + `[${this.gridData.length}]`
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
