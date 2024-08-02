<template>
  <div>
    <!-- 文件上传组件 -->
    <el-dialog title="员工导入" :visible.sync="value" width="30%" :before-close="handleClose">
      <div class="modelport">
        <el-upload ref="uploadDemo" :limit="1" :on-exceed="onExceed" class="upload-demo" :http-request="excelUp" drag action multiple :auto-upload="false" :before-upload="beforeUpload">
          <!-- :before-upload="beforeUpload" -->
          <i class="el-icon-upload" />
          <div class="uploadExcePort" @click.stop="excePort">下载导入模版</div>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="excelUp2">立即上传</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiImportTem, apiUserImport } from '@/api/employee'
import { saveAs } from 'file-saver'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileType: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'png', 'jpg', 'bmp', 'jpeg']
    }
  },
  methods: {
    onExceed() {
      this.$message.error('文件最多上传1个')
    },
    handleClose() {
      this.$emit('input', false)
    },
    async excePort() {
      const res = await apiImportTem()
      saveAs(res, '批量导入员工信息表.xlsx')
    },
    // 上传文件之前
    beforeUpload(file) {
      if (file.type !== '' || file.type !== null || file.type !== undefined) {
        // 截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, '').toLowerCase()
        // 计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 50 // 这里做文件大小限制
        // 如果大于50M
        if (!isLt5M) {
          this.$showMessage('上传文件大小不能超过 50MB!')
          return false
        }
        // 如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true
        } else {
          this.$message.error('上传文件格式不正确!')
          return false
        }
      }
    },
    // 上传文件
    excelUp(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      if (!param.file) {
        return this.$message.error('请上传文件')
      }

      apiUserImport(formData)
        .then((res) => {
          this.$message.success('上传成功')
          this.$refs.uploadDemo.clearFiles() // 清空上传列表
          this.$emit('uploadSuccess') // 通知父组件更新数据
          this.$emit('input', false) // 关闭弹窗
        })
        .catch(() => {
          this.$refs.uploadDemo.clearFiles() // 清空上传列表
          this.$message.error('上传失败')
        })
    },
    excelUp2() {
      this.$refs.uploadDemo.submit()
    }
  }
}
</script>

<style scoped lang="scss">
.modelport {
  display: flex;
  justify-content: center;
  align-items: center;
  .uploadExcePort {
    margin: 5px 0;
    color: #409eff;
  }
}
</style>
