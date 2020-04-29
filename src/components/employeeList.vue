<template>
     <div id="employeeList">
      <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/loginin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-input placeholder="请输入姓名" clearable v-model="name">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="5"><el-button type="info" @click="searchSatff">搜索</el-button></el-col>
            </el-row>
            <!-- 用户列表 -->
            <el-table :data="page.nowrecord" stripe border  style="width: 100%" height="500px">
                <el-table-column prop="employeeName" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="telPhone" label="电话"></el-table-column>
                <el-table-column prop="salary" label="工资"></el-table-column>
                <el-table-column label="操作" width="240px">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="查看员工信息" placement="top">
                        <el-button type="primary" icon="el-icon-user" @click="getrowdata(scope.row)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="调离申请" placement="top">
                        <el-button type="danger" icon="el-icon-message" @click="leaveDialog(scope.row)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="开除申请" placement="top">
                        <el-button type="danger" icon="el-icon-delete" @click="deleteDialog(scope.row)"></el-button>
                      </el-tooltip> 
                    </template>
                </el-table-column>
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

        <!-- 查看员工信息 -->
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="45%"
          label-width="30px"
          center>
          <h1 style="margin-left:40%; font-size:20px; font-weight:bold">{{this.rowdata.employeeName}}基本信息</h1>
          <el-form ref="rowdata" :model="rowdata" label-width="80px" :inline="true" style="margin-top:20px">
            <el-form-item label="姓名">
              <el-input readonly v-model="rowdata.employeeName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input readonly v-model="rowdata.sex"></el-input>
            </el-form-item>
            <el-form-item label="工龄">
              <el-input readonly v-model="rowdata.worktime"></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-input readonly v-model="rowdata.background"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input readonly v-model="rowdata.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input readonly v-model="rowdata.telPhone"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input readonly v-model="rowdata.birthday"></el-input>
            </el-form-item>
            <el-form-item label="工资">
              <el-input readonly v-model="rowdata.salary"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 调离申请 -->
        <el-dialog
          title="提示"
          :visible.sync="leaveDialogVisible"
          width="40%"
          center>
          <h1 style="margin-left:43%; font-size:20px; font-weight:bold">调离申请</h1>
          <el-form ref="rowdata" :model="orderleave" style="margin-top:20px">
            <el-form-item label="类型">
              <el-input readonly v-model="orderleave.type"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
              <el-input readonly v-model="orderleave.AskManagerId"></el-input>
            </el-form-item>
            <el-form-item label="被执行人">
              <el-input readonly v-model="orderleave.AskedemployeeId"></el-input>
            </el-form-item>
            <el-form-item label="原因">
              <el-input type="textarea"  v-model="orderleave.detail"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="undertoleave">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 开除申请 -->
        <el-dialog
          title="提示"
          :visible.sync="deleteDialogVisible"
          width="40%"
          center>
          <h1 style="margin-left:43%; font-size:20px; font-weight:bold">开除申请</h1>
          <el-form ref="rowdata" :model="deleteemp" style="margin-top:20px">
            <el-form-item label="类型">
              <el-input readonly v-model="deleteemp.type"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
              <el-input readonly v-model="deleteemp.AskManagerId"></el-input>
            </el-form-item>
            <el-form-item label="被执行人">
              <el-input readonly v-model="deleteemp.AskedemployeeId"></el-input>
            </el-form-item>
            <el-form-item label="原因">
              <el-input type="textarea"  v-model="deleteemp.detail"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteemployee">确 定</el-button>
          </span>
        </el-dialog>
     </div>
</template>

<script type="text/javascript">
import {GetemployeeList,SearchStaff,PutAskFor} from './network/employeeList'
export default {
  name: "employeeList",
  data() {
    return {
      //员工总信息
        tableData: [],
        //绑定查找员工姓名
        name:"",
        //控制员工信息详情dialog按照开关
        centerDialogVisible:false,
        //dialog绑定的员工信息
        rowdata:{},
        //分页信息
        page:{
          nowrecord:[],
          pagesize:5,
          pagenow:1,
          totalrecord:0
        },
        //调离申请dialog开关
        leaveDialogVisible:false,
        //调离申请书数据
        orderleave:{
          type:'调离申请',
          employeeId:this.$store.state.employeeId,
          AskManagerId:this.$store.state.username,
          AskedemployeeId:'',
          detail:''
        },
        //开除申请dialog开关
        deleteDialogVisible:false,
        //开除申请书数据
        deleteemp:{
          type:'开除申请',
          employeeId:this.$store.state.employeeId,
          AskManagerId:this.$store.state.username,
          AskedemployeeId:'',
          detail:''
        }
    }
  },
  components: {
  },
  created: async function(){
    await GetemployeeList(this.$store.state.employeeId).then(res =>{
      this.tableData = res
      this.page.totalrecord = res.length
      this.changerecord(this.page.pagenow,this.page.pagesize)
    })
  },
  methods:{
    //发起模糊寻找请求
      async searchSatff(){
        if(this.name === "") return
          await SearchStaff(this.name).then(res =>{
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
      //截取当前页的数据
      changerecord(page,size){
        let newrecords = [...this.tableData]
        this.page.nowrecord = [...newrecords.splice(size*(page-1),size)]
      },
      //获取行内信息
      getrowdata(data){
        this.centerDialogVisible = true
        this.rowdata = {...data}
        console.log(data)
      },
      //载入调离窗口数据
      leaveDialog(data){
        this.leaveDialogVisible = true
        this.orderleave.detail=''
        this.orderleave.AskedemployeeId = data.employeeName
      },
      //发起调离申请
      async undertoleave(){
        console.log(this.orderleave)
        await PutAskFor(this.orderleave).then(res =>{
          this.leaveDialogVisible = false
          if(res === 1){
            this.$message({
              message:'恭喜你，申请调离成功',
              showClose: true,
              center:true,
              type: 'success'
            })
          }else{
            this.$message({
              message:'不好意思，发送请求失败',
              showClose: true,
              center:true,
              type: 'success'
            })
          }
        })
      },
      //载入删除窗口数据
      deleteDialog(data){
        this.deleteDialogVisible = true
        this.deleteemp.detail=''
        this.deleteemp.AskedemployeeId = data.employeeName
      },
      //发起开除申请
      async deleteemployee(){
        await PutAskFor(this.deleteemp).then(res =>{
          this.deleteDialogVisible = false
          if(res === 1){
            this.$message({
              message:'恭喜你，申请开除成功',
              showClose: true,
              center:true,
              type: 'success'
            })
          }else{
            this.$message({
              message:'不好意思，发送请求失败',
              showClose: true,
              center:true,
              type: 'success'
            })
          }
        })
      }
  },
  watch:{
    'name':async function(){
      if(this.name === ""){
          await GetemployeeList(this.$store.state.employeeId).then(res =>{
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
