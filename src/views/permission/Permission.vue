<script>
import { apiGetPerissionList, apiBelePer } from '@/api/permission'
import { getTreeList } from '@/utils/index'
import AddPower from './components/AddPower.vue'

export default {
  name: 'Permission',
  components: { AddPower },
  data() {
    return {
      permissionList: [],
      newPermissionList: [],
      addPowerBool: false,
      addPowerVal: {
        pid: -1,
        type: -1
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await apiGetPerissionList()
      this.permissionList = res.data
      this.newPermissionList = getTreeList(res.data, 0)
    },
    handleAdd(index, row) {
      // 操作——添加
      // console.log('点击了添加', row.row)
      this.addPowerVal = {
        pid: row.row.id,
        type: 3
      }
      this.addPowerBool = true
    },
    handleEdit(index, row) {
      // 操作——编辑
      // console.log('点击了编辑', index, row)
      this.addPowerVal = {
        pid: row.id,
        ppid: row.pid,
        type: 2
      }
      this.addPowerBool = true
    },
    async handleDelete(index, row) {
      // 操作——删除
      await apiBelePer(row.id)
      this.$message.success('删除成功')
      this.getList()
    },
    addPower1() {
      this.addPowerVal = {
        pid: 0,
        type: 1
      }
      this.addPowerBool = true
    },
    changeType(val) {
      this.addPowerVal.type = val
    },
    updateList() {
      // 新增权限后更新权限
      this.getList()
    }
  }
}
</script>

<template>
  <div class="power">
    <div class="powerBtn">
      <el-button size="mini" type="primary" @click="addPower1">添加权限</el-button>
    </div>
    <div>
      <el-table :tree-props="{ children: 'children' }" :default-expand-all="true" row-key="id" :data="newPermissionList" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="310"> </el-table-column>
        <el-table-column prop="code" label="标识" width="310"> </el-table-column>
        <el-table-column prop="description" label="描述" width="310"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type === 1" size="mini" type="text" @click="handleAdd(scope.$index, scope)">添加</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddPower v-model="addPowerBool" :add-power-val="addPowerVal" @updateList="updateList" @changeType="changeType"></AddPower>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.power {
  width: 100%;
  min-height: 90vh;
  background-color: white;
  overflow: hidden;
  .powerBtn {
    margin: 20px;
  }
}
</style>
