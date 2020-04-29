import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import loginin from '../components/main'
import emplmess from '../components/emplmess'
import record from '../components/record'
import employeeList from '../components/employeeList'
import workmates from '../components/workmates'
import quarterlyStatement from '../components/quarterlyStatement'
import yearlyStatement from '../components/yearlyStatement'
import sendMess from '../components/sendMess'
import managermain from '../components/managerMain'
import Allemployee from '../components/Allemployees'
import Addemployee from '../components/Addemployees'
import recMess from '../components/recMess'

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect:'/login'},
  {path:'/login', component:login},
  {
    path:'/loginin',
    component:loginin,
    redirect: '/emplmess',
    children:[
      {path:'/emplmess',component:emplmess},
      {path:'/record',component:record},
      {path:'/employeeList',component:employeeList},
      {path:'/workmates',component:workmates},
      {path:'/quarterlyStatement',component:quarterlyStatement},
      {path:'/yearlyStatement',component:yearlyStatement},
      {path:'/sendMess',component:sendMess},
    ]
  },
  {
    path:'/managerlogin',
    component:managermain,
    redirect: '/Allemployee',
    children:[
      {path:'/Allemployee',component:Allemployee},
      {path:'/Addemployee',component:Addemployee},
      {path:'/recMess',component:recMess},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
