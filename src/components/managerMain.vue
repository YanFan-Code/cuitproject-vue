<template>
    <el-container class="boxer_container">
        <el-header class="header">
            <div class="company">公司员工管理系统管理后台</div>
            <div class="company">毕业设计者：严凡</div>
            <el-button type="primary" @click="loginout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCol ? '64px':'200px'">
                <div class="typebutton" @click="isCol = !isCol">{{isCol ? ">>>" : "<<<"}}</div>
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#ffd04b" unique-opened :collapse="isCol" :collapse-transition="false" router>
                    <el-submenu v-for="result in results" :key="result.id" :index="result.id">
                        <template slot="title">
                        <i :class="result.icon"></i>
                        <span>{{result.menuName}}</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item v-for="child in result.children" :index="child.path" :key="child.id">{{child.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container> 
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
        isCol : false,
        results:[
            {
            "id":"1",
            "menuName":"员工管理","icon":"el-icon-s-home","children":[{"name":"所有员工","path":"/Allemployee","id":102},{"name":"添加员工","path":"/Addemployee","id":101}]},
            {
            "id":"4",
            "menuName":"申请信息","icon":"el-icon-reading","children":[{"name":"请求信息","path":"/recMess","id":1302}]},
            ]
    }
  },
  components: {
  },
  methods:{
      loginout(){
          this.$router.push('/');
      }
  }
}
</script>

<style scoped>
.company{
    font-size: 20px;
}
.boxer_container{
    height: 100%;
}
.header{
    background-color: #333744;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}
.typebutton{
    color: white;
    text-align: center;
    cursor: pointer;
}
.header div,.el-button{
    display: inline-block;
}
.el-aside{
    background-color: #333744;
}
.el-menu{
    border-right-width: 0px;
}
</style>
