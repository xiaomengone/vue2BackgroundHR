<script>
import { apiGetList, apiPostRole, apiPutRole, apiDeleteRole } from '@/api/role'
import AssignPermissionsCOM from './components/AssignPermissions.vue'

export default {
  name: '',
  components: { AssignPermissionsCOM },
  data() {
    return {
      roleId: -1,
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      dialogVisible: false,
      form: {
        name: '',
        description: '',
        state: 1
      },
      total: 0,
      assignPermissionBool: false,
      tableData: [],
      params: {
        page: 1,
        pagesize: 10
      }
    }
  },
  mounted() {
    this.getList(this.params)
  },
  methods: {
    async getList(params) {
      const { data } = await apiGetList(params)
      this.tableData = data.rows.map((item) => {
        return {
          ...item,
          isEdit: false,
          editScription: {
            editName: item.name,
            editState: item.state,
            editDescription: item.description
          }
        }
      })
      // console.log('this.tableData', this.tableData)
      this.total = data.total
    },
    currentChange(val) {
      this.params = {
        page: val,
        pagesize: 10
      }
      this.getList(this.params)
    },
    prevClick(val) {
      this.params = {
        page: val,
        pagesize: 10
      }
      this.getList(this.params)
    },
    nextClick(val) {
      this.params = {
        page: val,
        pagesize: 10
      }
      this.getList(this.params)
    },
    assignPermissions(val) {
      this.roleId = val.id
      this.assignPermissionBool = true
    },
    addRole() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await apiPostRole(this.form)
          this.resetForm('form')
          this.getList(this.params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    clickEdit(row) {
      row.isEdit = true
      row.editScription = {
        editDescription: row.description,
        editName: row.name,
        editState: row.state
      }
    },
    elitDetermine(row) {
      row.isEdit = false
      const req = {
        id: row.id,
        name: row.editScription.editName,
        description: row.editScription.editDescription,
        state: row.editScription.editState
      }
      apiPutRole(req)
        .then((res) => {
          this.getList(this.params)
          this.$message.success('修改成功')
        })
        .catch(() => {
          this.$message.error('修改失败')
        })
    },
    editCancel(row) {
      row.isEdit = false
    },
    // 删除角色
    clickdelete(row) {
      apiDeleteRole(row.id)
        .then((res) => {
          if (this.tableData.length === 1) {
            this.params.page -= 1
          }

          this.getList(this.params)
          // console.log('哈哈3', res)
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
    }
  }
}
</script>

<template>
  <div class="role">
    <el-row>
      <el-button type="primary" size="mini" @click="addRole">添加角色</el-button>
    </el-row>
    <div>
      <el-table :data="tableData" style="width: 100%" height="730px">
        <el-table-column label="角色" width="250">
          <template slot-scope="{ row }">
            <span v-if="row.isEdit === false">{{ row.name }}</span>
            <el-input v-else v-model="row.editScription.editName" placeholder="请输入内容" />
          </template>
        </el-table-column>
        <el-table-column label="启用" width="250">
          <template slot-scope="{ row }">
            <span v-if="row.isEdit === false" style="margin-left: 10px">{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
            <el-switch v-else v-model="row.editScription.editState" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="350">
          <template slot-scope="{ row }">
            <span v-if="row.isEdit === false">{{ row.description }}</span>
            <el-input v-else v-model="row.editScription.editDescription" placeholder="请输入内容" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="350">
          <template slot-scope="{ row }">
            <div v-if="row.isEdit === false">
              <el-button type="text" size="small" @click="assignPermissions(row)">分配权限</el-button>
              <el-button type="text" size="small" @click="clickEdit(row)">编辑</el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="clickdelete(row)">
                <el-button slot="reference" type="text" size="small" class="popButn">删除</el-button>
              </el-popconfirm>
            </div>
            <div v-else>
              <el-button type="text" size="small" @click="elitDetermine(row)">确定</el-button>
              <el-button type="text" size="small" @click="editCancel(row)">取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row type="flex" justify="end">
      <el-pagination layout="prev, pager, next" :total="total" :sizes="10" @next-click="nextClick" @prev-click="prevClick" @current-change="currentChange" />
    </el-row>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name" label-width="80px">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="启用" prop="state" label-width="80px">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description" label-width="80px">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分配权限 -->
    <AssignPermissionsCOM v-model="assignPermissionBool" :role-id="roleId"></AssignPermissionsCOM>
  </div>
</template>

<style lang="scss" scoped>
.role {
  margin: 20px 10px;
  padding: 10px;
  background-color: #fff;
  .popButn {
    margin-left: 10px;
  }
}
</style>
