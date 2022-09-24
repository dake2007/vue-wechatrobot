<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>基础配置</span>
        <el-button type="primary" size="mini" @click="addCateBtwFn">添加配置</el-button>
      </div>
      <!-- 分类数据的表格 -->
      <template>
        <el-table :data="cateList" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="100px"> </el-table-column>
          <el-table-column prop="name" label="分类名称"> </el-table-column>
          <el-table-column prop="alias" label="分类别名"> </el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <!-- 提示对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @closed="resetcloseFn">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canceFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /\p{Unified_Ideograph}/u, message: '分类名必须是中文', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getArtCateFn()
  },
  methods: {
    async getArtCateFn () {
      const res = await getArticleAPI()
      this.cateList = res.data.data
    },
    // 添加分类按钮点击事件
    addCateBtwFn () {
      this.dialogVisible = true
    },
    canceFn () {
      this.dialogVisible = false
    },
    confirmFn () {
      this.dialogVisible = false
    },
    resetcloseFn () {
      this.$refs.addRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
