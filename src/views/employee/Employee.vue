<script>
import { apiGetPartList } from '@/api/department'
import { getTreeList } from '@/utils/index'
import { apiGetEmployeeList, apiGetexcel } from '@/api/employee'

export default {
  name: '',
  data() {
    return {
      total: 0,
      setCurrentKey: '',
      tableReq: {
        page: 1,
        pagesize: 10,
        keyword: '',
        departmentId: this.setCurrentKey
      },
      tableList: [],
      serchInput: '',
      orailTree: [],
      treeData: [],
      multipleSelection: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.getTree()
    this.getTableList(this.tableReq)
  },
  created() {
    this.serchInputChange = this.debounce(this.serchInputChange1, 1000)
    this.handleSelect = this.throttle(this.handleSelect1, 2000)
  },
  methods: {
    // 添加员工
    addEmployee() {
      this.$router.push('/employee/detail')
    },
    async getTableList(req) {
      const res = await apiGetEmployeeList(req)
      const { data } = res
      this.total = data.total
      this.tableList = data.rows
      // console.log('表格的值是', this.tableList)
    },
    handleSelectionChange() {},
    handleNodeClick(data) {
      // console.log('点击了结点', data)
      this.tableReq = {
        page: 1,
        pagesize: 10,
        keyword: this.serchInput,
        departmentId: data.id
      }
      this.setCurrentKey = data.id
      this.getTableList(this.tableReq)
    },
    async getTree() {
      const res = await apiGetPartList()
      this.orailTree = res.data
      this.setCurrentKey = this.orailTree[0].id
      const newTree = getTreeList(res.data, 0)
      this.treeData = newTree
      this.$nextTick(() => {
        // 默认选中第一个tree
        this.$refs.tree.setCurrentKey(this.setCurrentKey) // 默认选中节点第一个
      })
    },
    handleCurrentChange(val) {
      // console.log('当前的页', val)
      this.tableReq.page = val
      this.getTableList(this.tableReq)
    },
    serchInputChange1() {
      this.tableReq = {
        page: 1,
        pagesize: 10,
        keyword: this.serchInput,
        departmentId: this.setCurrentKey
      }
      this.getTableList(this.tableReq)
    },
    handleSelect1() {
      console.log('点击了查看')
    },
    debounce(func, delay) {
      // 防抖
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    throttle(fn, time) {
      // 节流
      let temp = false
      return function () {
        if (temp) {
          return
        } else {
          temp = true // 节流阀设置为true
          setTimeout(() => {
            fn.apply(this, arguments)
            temp = false
          }, time)
        }
      }
    },
    async excelPort() {
      console.log('执行了导出')
      // apiGetexcel()
      //   .then((res) => {
      //     console.log('获得的值', res)
      //   })
      //   .catch((res) => {
      //     console.log('失败了', res)
      //   })
      const res = await apiGetexcel()
      console.log('111res', res)
    }
  }
}
</script>

<template>
  <div class="employee">
    <div class="employeeLeft">
      <div class="employeeLeftTop">
        <div><el-input v-model="serchInput" prefix-icon="el-icon-search" placeholder="请输入员工姓名全员搜索" @input="serchInputChange" /></div>
      </div>
      <div><el-tree ref="tree" highlight-current :data="treeData" node-key="id" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick" /></div>
    </div>
    <div class="employeeRight">
      <div class="employeeRightUp">
        <div class="employeeRightUpL"><el-button>群发通知</el-button></div>
        <div class="employeeRightUpR">
          <el-button type="primary" @click="addEmployee">添加员工</el-button>
          <el-button>excel导入</el-button>
          <el-button @click="excelPort">excel导出</el-button>
        </div>
      </div>
      <div class="employeeRightDow">
        <div class="employeeRightDowTable">
          <!-- style="{ height: '50px' }" -->
          <el-table ref="multipleTable" max-height="690px" :data="tableList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="头像" width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.staffPhoto" class="scopeAva"><img :src="scope.row.staffPhoto" alt="" /></div>
                <div v-else class="scopeAva scopeAvaText">{{ scope.row.username.slice(0, 1) }}</div></template
              >
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100" />
            <el-table-column prop="mobile" label="手机号" width="130" show-overflow-tooltip />
            <el-table-column prop="workNumber" label="工号" width="130" />
            <el-table-column label="聘用形式" show-overflow-tooltip width="130">
              <!-- formOfEmployment -->

              <template slot-scope="scope">{{ scope.row.formOfEmployment === 1 ? '正式' : '非正式' }}</template>
            </el-table-column>
            <el-table-column prop="departmentName" label="部门" width="120" />
            <el-table-column prop="timeOfEntry" label="入职时间" width="120" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="operateTestTotal">
                  <div class="operateTest" @click="handleSelect(scope.$index, scope.row)">查看</div>
                  <div class="operateTest" @click="handleEdit(scope.$index, scope.row)">角色</div>
                  <div class="operateTest" @click="handleDelete(scope.$index, scope.row)">删除</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination">
          <el-pagination :current-page.sync="tableReq.page" :page-size="10" layout="total, prev, pager, next" :total="total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #f0f4ff;
    color: #276ffb;
  }
  .el-input {
    width: 250px;
    height: 50px !important;
    line-height: 50px !important;
    margin: 0 auto;
  }
  .el-pagination {
    font-size: 20px;
  }
}
.employee {
  display: flex;
  width: 100%;
  min-height: 90vh;
  background-color: white;
  .employeeLeft {
    width: 19%;
    margin-right: 2%;
    border-right: 1px solid #eaeef4;
    .employeeLeftTop {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
  }
  .employeeRight {
    width: 80%;

    padding-top: 10px;
    .employeeRightUp {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  .employeeRightDow {
    .pagination {
      display: flex;
      justify-content: end;
      margin-right: 20px;
    }
    .employeeRightDowTable {
      min-height: 700px;
      .scopeAva {
        max-width: 40px;
      }
      .scopeAvaText {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00cbb8;
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      .operateTestTotal {
        display: flex;
      }
      .operateTest {
        color: #66b1ff;
      }
      .operateTest:nth-child(2) {
        margin: 0 12px;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
