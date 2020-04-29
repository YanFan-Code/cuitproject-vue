<template>
  <div id="workmates">
      <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/loginin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>同事列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-input placeholder="请输入姓名" clearable v-model="name">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="5"><el-button type="info" @click="searchworkmates">搜索</el-button></el-col>
            </el-row>
            <!-- 用户列表 -->
            <el-table :data="page.nowrecord" stripe border  style="width: 100%" height="500px">
                <el-table-column prop="employeeName" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="background" label="学历"></el-table-column>
                <el-table-column prop="birthday" label="生日"></el-table-column>
                <el-table-column prop="worktime" label="工龄"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.totalrecord"
                            align="center">
            </el-pagination>
        </el-card>

  </div>
</template>

<script type="text/javascript">
import {getworkmates,searchworkmates} from './network/workmates'
export default {
  name: "workmates",
  data() {
    return {
      tableData: [],
        name:"",
        page:{
          nowrecord:[],
          pagesize:5,
          pagenow:1,
          totalrecord:0
        }
    }
  },
  components: {
  },
  created: async function(){
    await getworkmates(this.$store.state.employeeId,this.$store.state.managerId).then(res =>{
      console.log('employeeId是：'+this.$store.state.employeeId+',managerId是：'+ this.$store.state.managerId)
      this.tableData = res
      this.page.totalrecord = res.length
      this.changerecord(this.page.pagenow,this.page.pagesize)
    })
  },
  methods:{
      async searchworkmates(){
        if(this.name === "") return
          await searchworkmates(this.$store.state.employeeId,this.$store.state.managerId,this.name).then(res =>{
            this.tableData = res
            this.page.totalrecord = res.length
            this.changerecord(this.page.pagenow,this.page.pagesize)
          })
      },
      //根据修改的size改变表格
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pagesize = val;
        this.changerecord(this.page.pagenow,this.page.pagesize)
      },
      //根据修改的pagenow改变表格
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.pagenow = val;
        this.changerecord(this.page.pagenow,this.page.pagesize)
      },
      changerecord(page,size){
        let newrecords = [...this.tableData]
        this.page.nowrecord = newrecords.splice(size*(page-1),size)

      },
  },
  watch:{
    'name':async function(){
      if(this.name === ""){
          await getworkmates(this.$store.state.employeeId,this.$store.state.managerId).then(res =>{
            this.tableData = res
            this.page.totalrecord = res.length
            this.changerecord(this.page.pagenow,this.page.pagesize)
          })
      }
    } 
  }
}
</script>

<style scoped>
</style>
