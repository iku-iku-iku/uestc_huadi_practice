<template>
  <div class="recommend">
    <el-row class="filter">
      <el-col :span="2">
        <span> 学校层级： </span>
      </el-col>
      <el-col :span="2"
        ><el-checkbox v-model="is985" label="985" size="middle"
      /></el-col>
      <el-col :span="2"
        ><el-checkbox v-model="is211" label="211" size="middle"
      /></el-col>
    </el-row>
    <el-row class="filter">
      <el-col :span="2">
        <span>学校类别： </span>
      </el-col>
      <el-col :span="22">
        <el-checkbox
          v-for="item in typeItems1"
          v-model="item.checked"
          :label="item.name"
          size="middle"
        />
      </el-col>
    </el-row>
    <el-row class="filter">
      <el-col :span="3">
        <el-select-v2
          v-model="placeOption"
          :options="options"
          placeholder="学校所处位置"
        />
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input placeholder="请输入你的分数" v-model="mark" />
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary">确认</el-button></el-col
      >
    </el-row>
    <el-row class="filter">
      <el-col :span="20">
        <span>
          请问以下三个指标对您选择大学是否重要，请用1-10评价重要程度。：
        </span>
      </el-col>
    </el-row>
    <el-row class="filter">
      <el-col :span="2">
        <span> 学术水平 ： </span>
      </el-col>
      <el-col :span="2">
        <el-select-v2
          v-model="importanceOption[0]"
          :options="importanceOptions"
          placeholder="重要程度"
        />
        <!-- <el-input placeholder="输入1-10" v-model="mark" /> -->
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary">确认</el-button></el-col
      >
      <el-col :span="2">
        <span> 生活环境 ： </span>
      </el-col>
      <el-col :span="2">
        <el-select-v2
          v-model="importanceOption[1]"
          :options="importanceOptions"
          placeholder="重要程度"
        />
        <!-- <el-input placeholder="输入1-10" v-model="mark" /> -->
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary">确认</el-button></el-col
      >
      <el-col :span="2">
        <span> 就业水平 ： </span>
      </el-col>
      <el-col :span="2">
        <el-select-v2
          v-model="importanceOption[2]"
          :options="importanceOptions"
          placeholder="重要程度"
        />
        <!-- <el-input placeholder="输入1-10" v-model="mark" /> -->
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary">确认</el-button></el-col
      >
    </el-row>
    <el-row class="filter">
      <el-col :span="20">
        <span>请问下面是否有您特别看重的指标（最多勾选三项）： </span>
      </el-col>
    </el-row>
    <el-row class="filter">
      <el-col :span="22">
        <el-checkbox
          v-for="item in typeItems2"
          v-model="item.checked"
          :label="item.name"
          size="middle"
        />
      </el-col>
    </el-row>
    <el-row :span="24" justify="center">
      <h1 style="font-size: 30px; line-height: 30px">推荐院校</h1>
    </el-row>

    <el-row class="recommend-item" v-for="i in new Array(10)">
      <el-col>电子科技大学</el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { request } from "@/network/request.js";
class TypeItem {
  constructor(name) {
    this.name = name;
    this.checked = ref(false);
  }
}

export default {
  data() {
    return {
      batch: ref("1"),
      is985: ref(true),
      is211: ref(true),
      typeItems1: [
        "综合类",
        "理工类",
        "师范类",
        "民族类",
        "军事类",
        "语言类",
        "艺术类",
        "政法类",
        "财经类",
      ].map((t) => new TypeItem(t)),
      typeItems2: [
        "研究生点数量",
        "国内深造率",
        "国外深造率",
        "国家重点学科数",
        "科研项目数",
        "生活指数",
        "男女比例",
      ].map((t) => new TypeItem(t)),
      mark: ref(""),
      placeOption: ref(""),
      options: this.$store.state.provinces.map((x, idx) => {
        return {
          value: `Option ${idx + 1}`,
          label: `${x}`,
        };
      }),
      importanceOptions: Array.from(
        { length: 10 },
        (_, index) => index + 1
      ).map((x, idx) => {
        return {
          value: `Option ${idx + 1}`,
          label: `${x}`,
        };
      }),
      importanceOption: ["", "", ""],
    };
  },
  methods: {
    // methods
    submit() {
      request({
        method: "POST",
        url: "/college/recommendation",
        data: {
          collegeType: "",
          grade: 0,
          importantIndex: [true],
          levels: [0],
          provinceName: "",
        },
      });
    },
  },
};
</script>

<style scoped>
/* css */
.el-col {
  text-align: left;
  vertical-align: middle;
  line-height: 34px;
}

h1 {
  padding: 0;
  margin: 0;
}

.el-row {
  padding: 4px;
  margin-bottom: 3px;
  border-bottom: 1px solid;
}

.el-row.recommend-item {
  border: 2px dashed grey;
}
</style>
