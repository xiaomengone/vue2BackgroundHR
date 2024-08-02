<template>
  <div class="detail">
    <!-- 添加员工组件 -->
    <el-form ref="ruleForm" :model="employeeInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="employeeInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="employeeInfo.workNumber" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="employeeInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-cascader v-model="employeeInfo.departmentId" separator="-" :props="cascaderProps" :options="parmentList" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="employeeInfo.formOfEmployment" placeholder="请选择">
          <el-option v-for="item in sOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="employeeInfo.timeOfEntry" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="employeeInfo.correctionTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="员工头像" prop="staffPhoto">
        <div class="staffPhoto">
          <i class="el-icon-plus"></i>
        </div>
        <!-- <el-input v-model="employeeInfo.staffPhoto"></el-input> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')">{{ routeId === '-1' ? '保存' : '保存更新' }}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiGetPartList } from '@/api/department'
import { apiPostUser, apiGeUser, apiPutUser } from '@/api/employee'
import { getTreeList } from '@/utils/index'

export default {
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (this.employeeInfo.correctionTime < this.employeeInfo.timeOfEntry) {
        callback(new Error('转正时间应该晚于入职时间'))
      } else {
        callback()
      }
    }
    return {
      routeId: '',
      sOptions: [
        {
          value: 1,
          label: '正式'
        },
        {
          value: 2,
          label: '非正式'
        }
      ],
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      parmentList: [],
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '员工姓名为2-4个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, // 正则校验不用字符串
            message: '请填写正确的手机号码',
            trigger: 'blur'
          }
        ],
        departmentId: [{ required: true, message: '请选择部门名称', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ]
      },
      employeeInfo: {
        username: '',
        workNumber: '',
        mobile: '',
        departmentId: null,
        formOfEmployment: null,
        timeOfEntry: '',
        correctionTime: '',
        staffPhoto: ''
      }
    }
  },
  mounted() {
    this.getDepartmentList()
    if (this.routeId !== '-1') {
      this.getEmpInfo(this.routeId)
    }
  },
  created() {
    this.routeId = this.$route.params.id
    console.log('传入的id是', this.routeId, Object.prototype.toString.call(this.routeId))
  },
  methods: {
    // 得到部门列表
    async getDepartmentList() {
      const res = await apiGetPartList()
      const resData = res.data
      this.parmentList = getTreeList(resData, 0)
    },
    // 修改时，首先获取员工信息
    async getEmpInfo(id) {
      const res = await apiGeUser(id)
      const userData = res.data
      this.employeeInfo = userData
      console.log('1122', res)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.$route.params.id === '-1') {
            // 添加
            // console.log('1111', this.employeeInfo.departmentId)
            this.employeeInfo.departmentId = this.employeeInfo.departmentId[this.employeeInfo.departmentId.length - 1]
            // console.log('2222', this.employeeInfo.departmentId)
            const res = await apiPostUser(this.employeeInfo)
            this.$message.success('添加成功')
          } else {
            // 修改
            console.log('修改传的值', this.routeId, this.employeeInfo)
            const req = {
              id: this.routeId,
              ...this.employeeInfo
            }
            await apiPutUser(this.routeId, req)
            this.$message.success('修改成功')
          }
          this.employeeInfo = {}
        } else {
          if (this.$route.params.id === '-1') {
            this.$message.success('添加失败')
          } else {
            this.$message.success('修改失败')
          }
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-icon-plus {
    font-size: 40px;
  }
  .el-form {
    width: 400px;
  }
  .el-cascader {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
  .el-date-editor--date {
    width: 300px;
  }
}
.detail {
  display: flex;
  width: 100%;
  min-height: 90vh;
  background-color: white;
  padding: 50px 0 0 100px;
  .staffPhoto {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
  }
}
</style>
