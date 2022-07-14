<template>
  <div class="recommend">
    <el-row class="filter">
      <el-col :span="2">
        <span> 学校层级： </span>
      </el-col>
      <el-col :span="2"><el-checkbox v-model="is985" label="985" /></el-col>
      <el-col :span="2"><el-checkbox v-model="is211" label="211" /></el-col>
    </el-row>
    <el-row class="filter">
      <el-col :span="2">
        <span>类别： </span>
      </el-col>
      <el-col :span="22">
        <div class="my-2 flex items-center text-sm">
          <el-radio-group v-model="major" class="ml-4">
            <el-radio label="理科">理科</el-radio>
            <el-radio label="文科">文科</el-radio>
            <el-radio label="综合">综合</el-radio>
          </el-radio-group>
        </div>
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
      <el-col :span="2" :offset="1">
        <span> 生活环境 ： </span>
      </el-col>
      <el-col :span="2">
        <el-select-v2
          v-model="importanceOption[1]"
          :options="importanceOptions"
          placeholder="重要程度"
        />
      </el-col>
      <el-col :span="2" :offset="1">
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
        />
      </el-col>
    </el-row>
    <el-row :span="24" justify="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
    <el-row :span="24" justify="center">
      <h1 style="font-size: 30px; line-height: 30px">推荐院校</h1>
    </el-row>

    <el-row style="height: 434px; overflow: auto">
      <el-col :span="8">
        <el-row>
          <h2>冲</h2>
        </el-row>
        <el-row class="recommend-item" v-for="i in rush">
          <el-col>{{ i.collegeName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <h2>保</h2>
        </el-row>
        <el-row class="recommend-item" v-for="i in guaranteed">
          <el-col>{{ i.collegeName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <h2>稳</h2>
        </el-row>
        <el-row class="recommend-item" v-for="i in stability">
          <el-col>{{ i.collegeName }}</el-col>
        </el-row>
      </el-col>
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
  computed: {
    stateId() {
      return this.$store.state.stateId;
    },
  },
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
          value: `${x}`,
          label: `${x}`,
        };
      }),
      importanceOptions: Array.from(
        { length: 10 },
        (_, index) => index + 1
      ).map((x, idx) => {
        return {
          value: `${x}`,
          label: `${x}`,
        };
      }),
      importanceOption: ["1", "1", "1"],
      rush: [],
      guaranteed: [],
      stability: [],
      major: "",
    };
  },
  methods: {
    // methods
    submit() {
      let collegeType = "";
      if (this.is985) {
        collegeType = "985";
      } else if (this.is211) {
        collegeType = "211";
      } else {
        alert("请填写学校层级（985/211）");
        return;
      }

      if (this.mark === "") {
        alert("请先输入您的分数");
        return;
      }
      let grade = Number.parseFloat(this.mark);
      let importantIndex = this.typeItems2.map((x) => 0 + x.checked);
      if (importantIndex.reduce((x, y) => x + y, 0, 0) > 3) {
        alert("最多勾选三项指标");
        return;
      }

      if (this.placeOption === "") {
        alert("请选择大学所在省份");
        return;
      }
      let provinceName = this.placeOption;
      let levels = this.importanceOption;
      if (this.major === "") {
        alert("请先选择类别");
        return;
      }
      let major = this.major;
      levels = levels.map((x) => Number.parseInt(x));
      console.log({
        collegeType,
        grade,
        importantIndex,
        levels,
        major,
        provinceName,
      });
      request({
        method: "POST",
        url: "/college/recommendation",
        data: {
          collegeType,
          grade,
          importantIndex,
          levels,
          major,
          provinceName,
        },
      })
        .then((res) => {
          const data = res.data;
          this.guaranteed = data.guaranteed;
          this.rush = data.rush;
          this.stability = data.stability;
          console.log(data);
        })
        .catch(console.log);
    },
  },
  watch: {
    stateId(n, o) {
      this.options = this.$store.state.provinces.map((x, idx) => {
        return {
          value: `${x}`,
          label: `${x}`,
        };
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
  margin: 2px;
}
</style>
