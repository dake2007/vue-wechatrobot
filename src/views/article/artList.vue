<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option v-for="obj in cateList" :key="obj.Id" :label="obj.name" :value="obj.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubdialogFn">发表文章</el-button>
      </div>
      <!-- 发表文章的 Dialog 对话框 -->
      <el-dialog
        title="创建关键词"
        :visible.sync="pubDialogVisible"
        fullscreen
        :before-close="handleClose"
        @closed="onDialogClosedFn"
      >
        <!-- 发布文章的对话框 -->
        <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
              <el-option v-for="obj in cateList" :key="obj.Id" :label="obj.name" :value="obj.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item lable="文章的内容" prop="content">
            <quill-editor :options="editorOption" v-model="pubForm.content" @change="changeFn"></quill-editor>
          </el-form-item>
          <!-- 封面图片部分 -->
          <el-form-item label="文章封面">
            <!-- 用来显示封面的图片 -->
            <img src="../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
            <br />
            <!-- 文件选择框，默认被隐藏 -->
            <input type="file" style="display: none;" accept="image/*" ref="iptFileRef" @change="changeCoverFn" />
            <!-- 选择封面的按钮 -->
            <el-button type="text" @click="selectCoverFn">+ 选择封面</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
            <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import 'quill/dist/quill.snow.css'
import defaultImg from '@/assets/images/cover.jpg'
export default {
  name: 'ArtList',
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['12', false, '16', '18', '20', '24', '28', '32', '36'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['image', 'video'] // 链接、图片、视频
          ]
        },
        placeholder: '请输入正文'
      },
      cateList: [], // 保存文章分类列表
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false,
      pubForm: {
        // 表单的数据对象 发布
        title: '',
        cate_id: '',
        content: '', // 文章的内容
        cover_img: '',
        state: ''
      },
      pubFormRules: {
        // 表单的验证规则对象 发布
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCateListFn()
  },
  methods: {
    async getCateListFn () {
      const { data: res } = await getArticleAPI()
      this.cateList = res.data
    },
    showPubdialogFn () {
      this.pubDialogVisible = true
    },
    async handleClose (done) {
      const confirmResult = await this.$confirm('此操作将导致配置信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
    },
    selectCoverFn () {
      this.$refs.iptFileRef.click() // js来模拟一次点击事件的动作
    },
    changeCoverFn (e) {
      // e.target 拿到出发事件的那个标签（input标签对象的本身）
      // e.target.files 拿到选择文件的数组
      const files = e.target.files
      if (files.length === 0) {
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    pubArticleFn (state) {
      // 设置发布状态
      this.pubForm.state = state
      this.$refs.pubFormRef.validate(valids => {
        if (!valids) return this.$message.error('请选择文章封面！')
        if (!this.pubForm.cover_img) return this.$message.error('请选择文章封面')
        console.log(this.pubForm)
      })
    },
    onDialogClosedFn () {
      this.$refs.pubFormRef.resetFields()
      this.pubForm.content = ''
      this.$refs.imgRef.setAttribute('src', defaultImg)
    },
    changeFn () {
      // 富文本编辑器内容改变了触发此事件
      this.$refs.pubFormRef.validateField('content')
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
::v-deep .ql-editor {
  min-height: 300px;
}
</style>
