<script>
import { apiGetPartList, apiDeletePepartment } from '@/api/department'
import { getTreeList } from '@/utils'
import AddDialog from './components/AddDialog.vue'

export default {
  name: 'Department',
  components: { AddDialog },
  data() {
    return {
      pid: -1,
      clickType: '',
      id: -1,
      showAdd: false,
      treeList: [],
      data: [
        {
          label: '总公司',
          children: [
            {
              label: '总裁办'
            },
            {
              label: '行政部'
            },
            {
              label: '人事部',
              children: [
                {
                  label: '人事部1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.getParList()
  },

  methods: {
    getMsg() {
      this.getParList()
    },
    // 点击操作时执行
    handleCommand(command, data) {
      // console.log('command', command, Object.prototype.toString.call(command), data)
      this.id = data.id
      this.pid = data.pid
      if (command === 'add') {
        // 添加子部门
        this.clickType = 'add'
        this.showAdd = true
      } else if (command === 'edit') {
        this.clickType = 'edit'

        this.showAdd = true
        this.$nextTick(() => {
          this.$refs.addDialogRef.getDartmentDetail()
        })
      } else if (command === 'delet') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            apiDeletePepartment(this.id)
            this.$message.success('删除成功')
            this.getParList()
          })
          .catch(() => {})
      }
    },

    async getParList() {
      const res = await apiGetPartList()
      this.treeList = getTreeList(res.data, 0)
    }
  }
}
</script>

<template>
  <div class="department">
    <el-tree :default-expand-all="true" :expand-on-click-node="false" :data="treeList" :props="defaultProps" class="elTree">
      <div slot-scope="{ node, data }" class="slotScope">
        <el-row justify="space-around" type="flex">
          <el-col :span="17">{{ data.name }}</el-col>
          <el-col class="elCol" :span="4">
            <div>{{ data.managerName }}</div></el-col
          >
          <el-col class="elCol" :span="3">
            <div>
              <el-dropdown trigger="click" @command="handleCommand($event, data)">
                <div class="dropdownTop">操作<i class="el-icon-arrow-down el-icon--right" /></div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="delet">删除</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-tree>
    <AddDialog :id="id" ref="addDialogRef" v-model="showAdd" :click-type="clickType" :pid="pid" @getMsg="getMsg" />
  </div>
</template>

<style lang="scss" scoped>
.department {
  width: 100%;
  min-height: 90vh;
  background-color: white;
  .elTree {
    width: 850px;
    // margin: 80px 100px;
  }
  .dropdownTop {
    font-size: 16px;
  }
  .slotScope {
    width: 100%;
    .treeRight {
      background-color: pink;
    }
  }
  .elCol {
    width: 130px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
