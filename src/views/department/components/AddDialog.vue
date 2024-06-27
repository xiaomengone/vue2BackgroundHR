<script>
import { apiPostDepartment, apiGetSimple, apiGetPartList, apiGetCompanyDepart, apiPutCompanyDepartment } from '@/api/department'

export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    clickType: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: -2
    },
    pid: {
      type: Number,
      default: -2
    }
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (this.clickType === 'edit') {
        this.partList = this.partList.filter((item) => {
          item.introduce !== value
        })
      }
      if (this.partList.includes(value)) {
        return callback(new Error('部门名称不能重复'))
      } else {
        callback()
      }
    }
    const checkCode = (rule, value, callback) => {
      if (this.clickType === 'edit') {
        this.partCodeList = this.partCodeList.filter((item) => {
          item.code !== value
        })
      }
      if (this.partCodeList.includes(value)) {
        return callback(new Error('部门编码不能重复'))
      } else {
        callback()
      }
    }

    return {
      partList: [],
      partCodeList: [],
      SimpeList: [], // 部门负责人列表
      ruleForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 10, trigger: 'blur', message: '长度在 2 到 10 个字符' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { min: 2, max: 10, trigger: 'blur', message: '长度在 2 到 10 个字符' },
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        managerId: [{ required: true, message: '请选择负责人', trigger: 'blur' }],
        introduce: [
          { min: 1, max: 100, trigger: 'blur', message: '长度在 1 到 100 个字符' },
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isAddText() {
      if (this.clickType === 'edit') return '编辑部门'
      else return '添加部门'
    }
  },
  mounted() {
    this.getSimpeList()
    this.getPartList()
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 添加
          if (this.clickType === 'add') {
            const req = {
              ...this.ruleForm,
              pid: this.id
            }
            await await apiPostDepartment(req)
            this.handleClose()
            this.$refs[formName].resetFields()
            this.$emit('getMsg')
          } else if (this.clickType === 'edit') {
            // 编辑
            // console.log('请求的值', this.id)
            const req = {
              id: this.id,
              pid: this.pid,
              ...this.ruleForm
            }
            await apiPutCompanyDepartment(this.id, req)
            this.handleClose()
            this.$refs[formName].resetFields()
            this.$emit('getMsg')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getSimpeList() {
      const res = await apiGetSimple()
      this.SimpeList = res.data
    },
    async getPartList() {
      const res = await apiGetPartList()
      this.partList = res.data.map((item) => {
        return item.introduce
      })
      this.partCodeList = res.data.map((item) => {
        return item.code
      })
    },

    // 获取部门详情
    async getDartmentDetail() {
      const { data } = await apiGetCompanyDepart(this.id)
      this.ruleForm = {
        name: data.name,
        code: data.code,
        managerId: data.managerId,
        introduce: data.introduce
      }
    }
  }
}
</script>

<template>
  <div>
    <el-dialog :title="isAddText" :visible.sync="value" width="35%" :before-close="handleClose">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="ruleForm.code" autocomplete="off" placeholder="2-10个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="managerId">
          <!-- <el-input v-model.number="ruleForm.managerId" placeholder="请选择负责人" /> -->
          <el-select v-model="ruleForm.managerId" placeholder="请选择">
            <el-option v-for="item in SimpeList" :key="item.id" :label="item.username" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="ruleForm.introduce" placeholder="1-100个字符" />
        </el-form-item>

        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12"><el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> <el-button @click="resetForm('ruleForm')">重置</el-button></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .el-select {
    width: 100%;
  }
}
</style>
