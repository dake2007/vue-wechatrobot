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
          <el-table-column prop="name" label="配置名称"> </el-table-column>
          <el-table-column prop="alias" label="配置别名"> </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="primary" size="mini" @click="updateCateFn(scope.row)">修改</el-button>
              <template>
                <el-button type="danger" size="mini" @click="open(scope.row)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <!-- 提示对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @closed="resetcloseFn">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="配置名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="配置别名" prop="cate_alias">
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
import { addArtCateAPI, deleteArtCateAPI, getArticleAPI, setArtCateAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        // 添加表单的数据对象
        cate_name: '',
        cate_alias: '',
        is_Edit: false, // true为修改状态，false为新增状态
        editId: '' // 保存正要编辑的id
      },
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fd5]{1,6}$/gu, message: '分类名必须是中文', trigger: 'blur' }
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
      this.is_Edit = false
      this.editId = ''
      this.dialogVisible = true
    },
    canceFn () {
      this.dialogVisible = false
    },
    // 对话的确定按钮
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          if (this.is_Edit) {
            // 要修改
            this.addForm.Id = this.editId
            const { data: res } = await setArtCateAPI(this.addForm)
            if (res.status !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.status !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }

          // 重新请求列表数据
          this.getArtCateFn()
          // 关闭对话框
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    resetcloseFn () {
      this.$refs.addRef.resetFields()
    },
    updateCateFn (obj) {
      // 文章分类的id name nickname isdelete删除标志位
      //   console.log(obj)
      this.is_Edit = true
      this.editId = obj.Id
      this.dialogVisible = true
      this.$nextTick(() => {
        this.addForm.cate_name = obj.name
        this.addForm.cate_alias = obj.alias
      })
    },
    // 删除配置分类
    open (obj) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(obj.Id)
          await deleteArtCateAPI(obj.Id)
          await getArticleAPI()
          this.getArtCateFn()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
