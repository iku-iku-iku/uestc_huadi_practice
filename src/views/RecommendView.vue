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
      <el-col :span="18">
        <el-checkbox v-for="item in typeItems" v-model="item.checked" :label="item.name" size="middle" />
      </el-col>
    </el-row>
    <el-row class="filter"
      ><el-col :span="2">
        <span> 录取批次： </span>
      </el-col>
      <el-col :span="6" class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="batch" class="ml-4">
          <el-radio label="1" size="middle">提前批</el-radio>
          <el-radio label="2" size="middle">本科批</el-radio>
        </el-radio-group>
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
      <el-col :span="3" :offset="1"
        ><el-button type="primary">确认</el-button></el-col
      >
    </el-row>
    <el-row :span="24" justify="center">
      <h1 style="font-size:30px; line-height:30px">推荐院校</h1>
    </el-row>

    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>
    <el-row class="recommend-item">
      <el-col>电子科技大学</el-col>
    </el-row>

  </div>
</template>

<script>
import { ref } from "vue";
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
      typeItems: [
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
      mark: ref(""),
      placeOption: ref(""),
      options: ["a", "b", "c"].map((x, idx) => {
        return {
          value: `Option ${idx + 1}`,
          label: `${x}`,
        };
      }),
    };
  },
  methods: {
    // methods
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
  border: 2px dashed pink;
}
</style>
