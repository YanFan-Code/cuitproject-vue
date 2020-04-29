<template>
  <div id="test1">
    <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人主页</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
       <el-row :gutter="10" justify>
        <el-col :span="7">
          <el-card class="box-card" border-style shadow>
            <img :src="picture" alt="个人头像">
          </el-card>
         </el-col>
         <el-col :span="17" >
          <el-card class="box-card" border-style shadow>
            <div slot="header" class="clearfix">
              <span style="font-size:20px;font-weight:bold;">个人信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">修改资料</el-button>
            </div>
            <el-form label-width="80px" :model="employee" :inline="true" style="margin-left:20px;">
              <el-form-item label="名字">
                <el-input readonly v-model="employee.employeeName"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input readonly v-model="employee.email"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input readonly v-model="employee.sex"></el-input>
              </el-form-item>
              <el-form-item label="工作时长">
                <el-input readonly v-model="employee.worktime"></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-input readonly v-model="employee.background"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input readonly v-model="employee.telPhone"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-input readonly v-model="employee.birthday"></el-input>
              </el-form-item>
              <el-form-item label="工资">
                <el-input readonly v-model="employee.salary"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
         </el-col>
       </el-row>
<!-- 修改个人信息 -->

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form :model="editemployee" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true" :rules="rules">
            <el-form-item label="姓名" prop="employeeName">
              <el-input v-model="editemployee.employeeName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editemployee.email"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="editemployee.sex" label="男" border>男</el-radio>
              <el-radio v-model="editemployee.sex" label="女" border>女</el-radio>
            </el-form-item>
            <el-form-item label="工龄" label-position="left" label-width="127px">
              <el-input readonly v-model="editemployee.worktime + '年'" readonly ></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-input v-model="editemployee.background" readonly ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="telPhone">
              <el-input v-model="editemployee.telPhone"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                  v-model="editemployee.birthday"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="工资">
              <el-input readonly v-model="editemployee.salary"></el-input>
            </el-form-item>
            </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="canceledit">取 消</el-button>
            <el-button type="primary" @click="editempl">确 定</el-button>
          </span>
        </el-dialog>
        
  </div>
</template>

<script type="text/javascript">
import {getEmplMess} from './network/emplmess'
import {editMess} from './network/emplmess'
export default {
  name: "test1",
  data() {
    return {
      employee:{},
      picture: '',
      dialogVisible: false,
      editemployee:{},
      rules:{
        employeeName:[
          {required:true,message:'姓名不能为空',trigger:'blur'},
          {min:2,max:10,message:'姓名长度只能为2到10个字符',trigger:'blur'},
          {required:true,pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,message:'姓名不能含特殊字符',trigger:'blur'}
        ],
        email:[
          {required:true,message:'邮箱不能为空',trigger:'blur'},
          {required:true,pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,message:'请输入正确的邮箱',trigger:'blur'}
        ],
        telPhone:[
          {required:true,message:'电话不能为空',trigger:'blur'},
          {required:true,pattern:/^1[3|4|5|7|8][0-9]{9}$/,message:'请输入正确的手机号',trigger:'blur'}
        ],
      },
    }
  },
  components: {
  },
  created: async function(){
    let res = await getEmplMess(this.$store.state.username).then(res =>{
      // console.log(res)
      if(Array.isArray(res.data)){
        this.employee = res.data[0]
        this.$store.commit('changeemployeeId',res.data[0].employeeId)
        console.log(res.data[0].managerId)
        this.$store.commit('changemanagerId',res.data[0].managerId)
        this.editemployee = {...res.data[0]}
        this.picture = require('../static/img/' + res.data[0].picture)
      }else{
         this.employee = res.data
         this.editemployee = {...res.data}
         this.$store.commit('changeemployeeId',res.data.employeeId)
         this.$store.commit('changemanagerId',res.data.managerId)
         console.log(res.data.managerId)
        this.picture = require('../static/img/' + res.data.picture)
      }
    })
  },
  watch:{
    'dialogVisible':function(){
      this.changevalidate()
    }
  },
  methods:{
    editempl(){
      this.$refs.ruleForm.validate(async valid => {
        if(!valid) return
        let res = await editMess(this.editemployee.username,this.editemployee).then(res =>{
        this.dialogVisible = false
        this.employee = {...this.editemployee}
        this.$message({
          message:'恭喜你，修改成功',
          showClose: true,
          center:true,
          type: 'success'
        })
      }).catch(err =>{

      })
      })
    },
    canceledit(){
      this.editemployee = {...this.employee}
      this.dialogVisible = false
    },
    changevalidate(){
      this.$nextTick(() =>{
        this.$refs.ruleForm.clearValidate()
        this.editemployee = {...this.employee}
      })
    },
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height: 100%;
}
el-radio{
  width: 200px;
}
</style>
