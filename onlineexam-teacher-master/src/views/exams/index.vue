<template>
  <div class="cards">
    <div
      v-if="examsArr"
      v-for="item in examsArr"
      class="animate__animated animate__pulse"
    >
      <div
        @click="showStudentList(item)"
        class="card dark-card"
        style="cursor: pointer; z-index: 1000"
      >
        <img
          src="@/assets/images/home_img.png"
          class="card-header light-header"
        />
        <h3 class="light">
          {{ item.paperName }}
        </h3>
        <p class="light-text">发放班级: {{ item.classTno }}</p>
      </div>
    </div>
    <div v-else style="margin-left:50%">
      <el-empty description="暂无考试发布"></el-empty>
    </div>

    <el-dialog title="未参考人数" :visible.sync="dialogTableVisible">
      <el-table ref="filterTable" :data="showStudentsInfo">
        <el-table-column prop="sno" label="学号"></el-table-column>
        <el-table-column prop="stuName" label="姓名"></el-table-column>
        <el-table-column prop="stuStatus" label="">
          <template slot-scope="scope">
            <el-tag type="danger" disable-transitions>未参加</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { reqSearchPaperInfo, reqGetPaperList } from '@/api/paper'
import { reqGetStudentsList, reqGetScoresList } from '@/api/student'
export default {
  data() {
    return {
      examsArr: null,
      allStudentsInfo: null,
      showStudentsInfo: null,
      dialogTableVisible: false,
      allExamedStudent: null,
      showExamedStudent: null
    }
  },

  async created() {
    try {
      const { tno } = this.$store.getters.userInfo
      const { data } = await reqSearchPaperInfo(tno)
      const studentList = await reqGetStudentsList(tno)
      const {
        data: { scoresList }
      } = await reqGetScoresList()
      const arr = []

      data.forEach(async item => {
        const {
          data: { paperName }
        } = await reqGetPaperList(item.paperId)
        arr.push({ ...item, paperName })
      })

      this.examsArr = arr
      this.allStudentsInfo = studentList.data
      this.allExamedStudent = scoresList
    } catch (error) {
      console.log(error.message)
    }
  },

  methods: {
    showStudentList(item) {
      const { paperName } = item

      this.showExamedStudent = this.allExamedStudent.filter(
        item => item.paperName === paperName
      )

      this.showStudentsInfo = this.allStudentsInfo.filter(item => {
        return !this.showExamedStudent.some(
          examedItem => examedItem.sno === item.sno
        )
      })

      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
$super-dark-blue: #1b233f;
$white: #ffffff;
$light-gray: #f0f3f5;

@mixin heading-3($color: $white) {
  font-size: 20px;
  line-height: 33px;
  font-weight: bold;
  color: $color;
  text-align: center;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-evenly;
  position: relative;
}

.card {
  width: 100%;
  max-width: 250px;
  border-radius: 10px;
  margin: 20px;
  margin-top: 50px;
}
.dark-card {
  background: $super-dark-blue;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 20px 40px;
  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.25);
  }
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card-header {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.light-header {
  background: $light-gray;
}

.dark-header {
  background: #283049;
}

h1 {
  margin-top: 40px;
}

h3 {
  margin-bottom: 16px;
}

h3.light {
  @include heading-3($white);
}

p {
  font-size: 15px;
  line-height: 24px;
  text-align: left;
  margin-left: 16px;
  margin-top: 0;
}
.light-text {
  color: $white;
  font-size: 10px;
  font-weight: bold;
  text-align: end;
  padding-right: 10px;
}
</style>
