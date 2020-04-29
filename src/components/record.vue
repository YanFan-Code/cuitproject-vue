<template>
  <div id="record">
       <!-- 置顶面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/loginin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人主页</el-breadcrumb-item>
            <el-breadcrumb-item>个人日志</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col :span="2" :offset="22" style="margin-bottom:20px">
          <el-button type="primary" @click="addrecordVisible = true">添加日志</el-button>
        </el-col>

        <el-table :data="page.nowrecord" stripe border 
      style="width: 100%">
      <el-table-column
        prop="startDay"
        label="开始时间" width="440">
        <template slot="header" slot-scope="scope">
        <el-date-picker
      v-model="date"
      type="date"
      value-format="yyyy-MM-dd"
      @change="change"
      placeholder="选择日期">
    </el-date-picker>
    <el-button type="primary" @click="canceldate">重置</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="endDay"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="place"
        label="地点">
      </el-table-column>
      <el-table-column
        prop="cost"
        label="报销"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="具体描述">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      align="center"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalrecord">
    </el-pagination>


    <!-- 添加日志 -->
    <el-dialog
      title="添加日志"
      :visible.sync="addrecordVisible"
      width="50%" id="dialogrecord">
      <el-form :model="record"  label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="开始时间" prop="date">
          <el-date-picker
            v-model="record.startDay"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="startDateDisabled"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker
            v-model="record.endDay"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="endDateDisabled"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="record.place"></el-input>
        </el-form-item>
        <el-form-item label="报销" prop="cost">
          <el-input v-model="record.cost"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="record.type" placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体描述" prop="detail">
          <el-input v-model="record.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canceldialog">取 消</el-button>
        <el-button type="primary" @click="commitrecord">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import {getrecord,getrecordbydate,addrecord} from './network/record'
export default {
  name: "record",
  data() {
    return {
      records:[],
      date:'',
      page:{
        nowrecord:[],
        pagesize:5,
        pagenow:1,
        totalrecord:0
      },
      addrecordVisible:false,
      record:{
        employeeId:this.$store.state.employeeId,
        startDay:'',
        endDay:'',
        place:'',
        cost:'',
        type:'',
        detail:'',
      },
      type:[{
          value: '出差',
          label: '出差'
        }, {
          value: '请假',
          label: '请假'
        }, {
          value: '完成任务',
          label: '完成任务'
        }],
      startDateDisabled: this.beginDate(),
      endDateDisabled: this.processDate()
    }
  },
  components: {
  },
  created: async function(){
    await getrecord(this.$store.state.employeeId).then( res => {
      this.records = res
      this.page.totalrecord = res.length
      this.changerecord(this.page.pagenow,this.page.pagesize)
    })
  },
  watch:{
    'addrecordVisible':function(){
      if(this.addrecordVisible === false){
        this.record={}
      }
    }
  },
  methods:{
    //清除日期
    async canceldate(){
      this.date = ''
      await getrecord(this.$store.state.employeeId).then( res => {
      this.records = res
      this.page.totalrecord = res.length
      this.pagesize = 5
      this.pagenow = 1
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
      let newrecords = [...this.records]
      this.page.nowrecord = newrecords.splice(size*(page-1),size)
    },
    //获得获取的日期
    async change(){
      console.log(this.date)
      await getrecordbydate(this.$store.state.employeeId,this.date).then( res => {
        console.log(res)
      this.records = res
      this.page.totalrecord = res.length
      this.pagesize = 5
      this.pagenow = 1
      this.changerecord(this.page.pagenow,this.page.pagesize)
    })
    },
    //取消日志dialog
    canceldialog(){
      this.addrecordVisible = false
      this.record = {}
    },
    //提交日志请求
    async commitrecord(){
      await addrecord(this.record).then(res =>{
        if(res === 1){
          this.$message({
              message:'添加成功',
              showClose: true,
              center:true,
              type: 'success'
            })
        }else{
          this.$message({
              message:'添加失败',
              showClose: true,
              center:true,
              type: 'success'
            })
        }
        this.canceldate()
        this.addrecordVisible = false
      })
    },
　　beginDate(){
      const self = this
      return {
        disabledDate(time){
          if (self.record.endDate) {  //如果结束时间不为空，则小于结束时间
            return new Date(self.record.endDate).getTime() < time.getTime()
          } else {
             return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
      processDate() {
        const  self = this
        return {
          disabledDate(time) {
            if (self.record.date) {  //如果开始时间不为空，则结束时间大于开始时间
              return new Date(self.record.date).getTime() > time.getTime() || time.getTime() > Date.now()
            } else {
               return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          }
        }
      }
  }
}
</script>

<style scoped>
.el-button{
  margin-left: 10px;
}
</style>
