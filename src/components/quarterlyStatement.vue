<template>
  <div id="">
    <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/loginin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业绩报表</el-breadcrumb-item>
            <el-breadcrumb-item>季度报表</el-breadcrumb-item>
        </el-breadcrumb>

      <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
      <div style="width:150px; margin-left:40%"><span style="margin-left:30px">当前季度评分</span><el-rate
    v-model="value"
    disabled
    show-score
    :colors="colors"
    disabled-void-color="gray"
    score-template="{value}">
  </el-rate></div>
  <div class="comment" v-text="comment"></div>
  </div>
</template>

<script type="text/javascript">
import {getdatatable} from './network/quarterlyStatement'
export default {
  name: "",
  data() {
    return {
        value:0,
        comment:'',
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    async drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var month=new Date().getMonth()+1;
        if(month % 3 === 0){
            month = [month-2+'月份',month-1+'月份',month+'月份']
        }else if(month % 3 === 1){
            month = [month+'月份',month+1+'月份',month+2+'月份']
        }else{
            month = [month-1+'月份',month+'月份',month+1+'月份']
        }
        var  xAxisData =month
        //后期这里是动态从数据库获取的json数据
        var res = await getdatatable(this.$store.state.employeeId)
        var data = res.arr
        this.value = res.sorce
        this.comment = res.assess
        // 绘制图表
        myChart.setOption({
            title:{
                text:'当前季度报表',
                subtext:'员工管理系统',
                left:'center',
                align:'right'
            },
            tooltip: {},
            legend:{
                right:'5%',
                data: ['出差', '缺勤', '任务完成数']
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: {type: 'category',data:xAxisData},
            // 声明一个 Y 轴，数值轴。
            yAxis: {},
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [
                {name:'出差','type': 'bar','data':data[0]},
                {name:'缺勤','type': 'bar','data':data[1]},
                {name:'任务完成数','type': 'bar','data':data[2]},
            ]
                });
            }
  },
  components: {
  },
}
</script>

<style scoped>
.comment{
  font-size: 20px;
  font-weight: bold;
  margin-left: 20%
}
</style>
