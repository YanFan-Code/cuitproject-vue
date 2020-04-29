<template>
  <div id="Allemployee">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>所有员工</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    :data="tableData"
    height="600"
    stripe
    style="width: 100%">
    <el-table-column
      prop="employeeName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
    width="180"
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="background"
      label="学历">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="生日">
    </el-table-column>
    <el-table-column
      prop="telPhone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="worktime"
      label="工作时长">
    </el-table-column>
    <el-table-column
      prop="salary"
      label="工资">
    </el-table-column>
  </el-table>
  </div>
</template>

<script type="text/javascript">
import {getAllemployees} from './network/Allemployees'
export default {
  name: "",
  data() {
    return {
        tableData:[]
    }
  },
  components: {
  },
  created: async function(){
      await getAllemployees().then(res =>{
          for (var i = 0; i < res.data.length; i++) {
               this.tableData.push(res.data[i]);
           }

      })
  }
}
</script>

<style scoped>
</style>
