<template>
  <div>
    <el-dialog :title="addPowerVal.type === 2 ? '编辑权限点' : '新增权限点'" :visible.sync="value" width="30%" :before-close="cancel">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="ruleForm.enVisible" active-value="1" inactive-value="0"> </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiPostPer, apiGetPer, apiPutPer } from '@/api/permission'
export default {
  name: 'AddPower',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addPowerVal: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        description: '',
        enVisible: '1'
      },
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
      }
    }
  },
  watch: {
    addPowerVal(newVal) {
      if (newVal.type === 2) {
        // 操作编辑按钮
        this.perDetai(this.addPowerVal.pid)
      } else if (newVal.type === 1) {
        // 左上角添加权限
        this.ruleForm = {
          name: '',
          code: '',
          description: '',
          enVisible: '1',
          type: 1
        }
      } else if (newVal.type === 3) {
        // 操作-添加按钮
        this.ruleForm = {
          name: '',
          code: '',
          description: '',
          enVisible: '1',
          type: 2
        }
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('changeType', -1)
      this.$emit('input', false)
    },
    async perDetai(pid) {
      const res = await apiGetPer(pid)
      this.ruleForm = {
        name: res.data.name,
        code: res.data.code,
        description: res.data.description,
        enVisible: res.data.enVisible
      }
    },
    confirm(ruleForm) {
      // 弹框里的确认按钮
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          if (this.addPowerVal.type === 1) {
            // console.log('左上角添加权限')
            const req = {
              ...this.ruleForm,
              pid: this.addPowerVal.pid
            }
            // console.log('请求的值是', req)
            await apiPostPer(req)
            this.ruleForm = {}
            this.$emit('updateList')
            this.$emit('input', false)
          } else if (this.addPowerVal.type === 3) {
            // console.log('操作里的添加')
            const req = {
              ...this.ruleForm,
              pid: this.addPowerVal.pid
            }
            // console.log('添加的值是', req)
            await apiPostPer(req)
            this.ruleForm = {}
            this.$emit('updateList')
            this.$emit('input', false)
          } else if (this.addPowerVal.type === 2) {
            const req = {
              ...this.ruleForm,
              id: this.addPowerVal.pid,
              pid: this.addPowerVal.ppid,
              type: 2
            }

            // console.log('操作里的编辑2', req)
            this.ruleForm = {}
            await apiPutPer(req)
            this.$emit('updateList')
            this.$emit('input', false)
          }

          this.$emit('changeType', -1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style></style>
