<template>
  <div id="">
    <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/loginin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>申请信息</el-breadcrumb-item>
            <el-breadcrumb-item>发送信息</el-breadcrumb-item>
        </el-breadcrumb>
      <el-table
      :data="tabledata"
      stripe border
      height="600"
      style="width: 100%">
      <el-table-column
        prop="AskManagerId"
        label="申请人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="AskedemployeeId"
        label="被执行人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
 import {getMess} from './network/sendMess'
export default {
  name: "",
  data() {
    return {
      tabledata:[],
    }
  },
  components: {
  },
  async created(){
    await getMess(this.$store.state.employeeId).then(res =>{
      this.tabledata = res
    })
  }
}
</script>

<style scoped>
</style>
