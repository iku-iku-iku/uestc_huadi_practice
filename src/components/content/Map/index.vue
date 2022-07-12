<template>
  <div class="wrap">
    <div class="screen" ref="screen"></div>

    <el-dialog v-model="dialogVisible" :title="chosenProvince" width="20%">
      <el-table :data="gridData" width="350">
        <el-table-column label="大学" width="250">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark">
              <template #content>
                <span style="font-size: 20px; font-weight: bold">
                  热门专业<br />
                </span>
                <span
                  style="font-size: 18px"
                  v-for="adv in scope.row.advantage"
                >
                  {{ adv }}<br />
                </span>
              </template>
              <el-button style="width: 250px">{{ scope.row.name }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column property="type" label="类别" width="100" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { request, requestInfo } from "@/network/request.js";
import * as echarts from "echarts";
require("@/assets/china.js");
import { reactive, ref } from "vue";

class GridDataItem {
  constructor(name, type, advantage) {
    this.name = name;
    this.type = type;
    this.advantage = advantage;
  }
}
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
      gridData: [],
      chosenProvince: ref(""),
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
            fontSize: 24,
          },
          top: 0,
          left: 'center',
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
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: 2000,
      };
    },
    chooseProvince(provinceName) {
      const colleges = this.$store.state.province2Colleges[provinceName];
      const ids = colleges.map((col) => col.collegeId);
      requestInfo(ids, (dataArr) => {
        console.log(dataArr);
        this.gridData = dataArr.map(
          (data) =>
            new GridDataItem(
              data.collegeName,
              this.$store.state.college2Type[data.collegeName],
              data.popularMajor
            )
        );
        this.dialogVisible = true;
        this.chosenProvince = provinceName + `[${this.gridData.length}]`;
      });
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
  background-color: rgba(128, 128, 128, 0);
  min-height: 100%;
}
.screen {
  width: 100%;
  min-height: 800px;
}
</style> -->