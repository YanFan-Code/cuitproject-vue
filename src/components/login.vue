<template>
  <div id="login" class="box_container">
      <div class="img_box">
          <img src="../assets/logo.png">
      </div>
      <el-form :model="FormInfo" label-width="60px" :rules="rules" class="form_box" ref="Form">
        <el-form-item label="账号" prop="username">
            <el-input v-model="FormInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="FormInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="button_pos">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="Formreset">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script type="text/javascript">
import {getmultidata} from './network/home'
export default {
  name: "login",
  data() {
    return {
        FormInfo:{
            username:'',
            password:''
        },
        rules:{
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ]
        }
    }
  },
  components: {
  },
  methods:{
      Formreset(){
        this.$refs.Form.resetFields();
      },

      login(){
        this.$refs.Form.validate( async valid =>{
          if(!valid) return;
          if(this.FormInfo.username === "0000" && this.FormInfo.password === "0000"){
            //this.$router.push('manager')
           this.$router.push('managerlogin')
          }else{
            const res = await getmultidata(this.FormInfo.username,this.FormInfo.password).then(rest =>{
            if(rest.code === 200){
              this.$store.commit('changeusername',rest.msg)
              this.$router.push('loginin')
              }
            else{
              this.open()
            }
          })
          }
        })
      },
      open(){
        this.$alert('账号或密码输入错误','警告',{
          confirmButtonText:'确定',
          showClose:false
        })
      }
  }
}
</script>

<style scoped>
.box_container{
    position: absolute;
    padding: 5px;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 300px;
    /* background-color: #2d2d2d; */
    border-radius: 5%;
    border: solid 1px blue;
}
.img_box{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #aaaaaa;
    background-color: #fff;
}
.img_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.form_box{
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
.button_pos{
    display: flex;
    justify-content: flex-end;
}
</style>
