<template>
  <div id="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>申请信息</el-breadcrumb-item>
        <el-breadcrumb-item>请求信息</el-breadcrumb-item>
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
import {recMess} from './network/recMess'
export default {
  name: "",
  data() {
    return {
        tabledata:[],
    }
  },
  components: {
  },
  created: async function(){
      await recMess().then(res => {
          console.log(res)
          this.tabledata = res
      })
  }
}
</script>

<style scoped>
</style>
