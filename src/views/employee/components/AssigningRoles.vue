<template>
  <div>
    <el-dialog title="分配角色" :visible.sync="value" width="30%" :before-close="handleClose">
      <div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiGetEn } from '@/api/role'
import { apiPutAssign, apiGeUser } from '@/api/employee'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    roleAssignId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      checkList: [],
      roleList: []
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.getRmployeeDetail()
      }
    }
    // apiGeUser
  },
  updated() {},
  mounted() {
    this.getList()
  },
  methods: {
    async getRmployeeDetail() {
      console.log('1z这时候执行了')

      const res = await apiGeUser(this.roleAssignId)
      this.checkList = res.data.roleIds
    },
    async getList() {
      const res = await apiGetEn()
      this.roleList = res.data
    },
    handleClose() {
      this.$emit('input', false)
    },
    async determine() {
      const req = {
        id: this.roleAssignId,
        roleIds: this.checkList
      }
      try {
        await apiPutAssign(req)
        this.$message.success('角色添加成功')
        this.$emit('input', false)
      } catch (error) {
        this.$message.error('角色添加失败')
      }
    }
  }
}
</script>

<style></style>
