<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="value" width="40%" :before-close="dialogVisible">
      <div>
        <el-tree ref="tree" :default-checked-keys="permIds" node-key="id" :default-expand-all="true" :data="permissionList" :props="defaultProps" show-checkbox> </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiGetPerissionList } from '@/api/permission'
import { getTreeList } from '@/utils/index'
import { apiGetSysRole, apiPutAssignPrem } from '@/api/role'

export default {
  props: {
    roleId: {
      type: Number,
      default: -1
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permIds: [], // 选中的值
      permissionList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.recurrentData(this.roleId)
      } else {
        this.$refs.tree.setCheckedNodes([]) // 清空勾选的值
      }
    }
  },
  mounted() {
    this.getPermList()
  },
  methods: {
    dialogVisible() {
      this.$emit('input', false)
    },
    async recurrentData(id) {
      const res = await apiGetSysRole(id)
      this.permIds = res.data.permIds
    },
    async determine() {
      const permIds = this.$refs.tree.getCheckedNodes().map((item) => {
        return item.id
      })
      const req = {
        id: this.roleId,
        permIds: permIds
      }
      // console.log('请求的值', req)
      try {
        await apiPutAssignPrem(req)
        this.$message.success('权限设置成功')
        this.$emit('input', false)
      } catch (error) {
        this.$message.error('权限设置失败')
      }

      // apiGetSysRole
    },
    async getPermList() {
      // 获取权限列表
      const res = await apiGetPerissionList()
      const list = res.data
      this.permissionList = getTreeList(list, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-checkbox {
    width: 100%;
    margin: 7px;
  }
  .el-checkbox__label {
    font-size: 16px;
  }
  .el-checkbox {
    width: 4%;
  }
}
</style>
