<template>
  <el-table
          :data="tableData"
          style="width: 100%">
    <el-table-column
            prop="username"
            label="姓名"
            width="180">
    </el-table-column>
    <el-table-column
            prop="lastLoginTime"
            label="lastLoginTime">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[]
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.$axios.get("/api/getAllUsers/1",).then(({data}) => {
          this.tableData = data;
        });
      }
    }
  }
</script>
