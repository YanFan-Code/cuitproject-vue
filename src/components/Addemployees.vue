<template>
  <div id="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加员工</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="240px" :inline="true">
    <el-form-item label="账号">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"  type="password"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.empployeeName"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" placeholder="性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
  </el-form-item>
    <el-form-item label="工作时长">
      <el-input v-model="form.worktime"></el-input>
    </el-form-item>
    <el-form-item label="背景">
      <el-select v-model="form.background" placeholder="学历">
        <el-option label="专科" value="专科"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="研究生" value="研究生"></el-option>
        <el-option label="博士生" value="博士生"></el-option>
        <el-option label="博士后" value="博士后"></el-option>
      </el-select>
  </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.telPhone"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker
      v-model="form.birthday"
      align="right"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="工资">
      <el-input v-model="form.salary"></el-input>
    </el-form-item>
  </el-form>
  <el-button type="" style="margin-left:450px">确定添加</el-button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form:{
        username:'',
        password:'',
        empployeeName:'',
        sex:'',
        worktime:'',
        background:'',
        email:'',
        telPhone:'',
        birthday:'',
        salary:''
      }
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>

