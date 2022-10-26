<template>
  <div class="cards">
    <div
      v-if="newData"
      v-for="item in newData"
      class="animate__animated animate__pulse"
    >
      <div class="card dark-card" style="cursor: pointer; z-index: 1000">
        <img
          src="@/assets/images/home_img.png"
          class="card-header light-header"
        />
        <h3 class="light">
          {{ item.paperName }}
        </h3>
        <p class="light-text">发放班级: {{ item.classTno }}</p>
        <el-progress style="padding:10px" :percentage="50" />
      </div>
    </div>
    <div v-else style="margin-left:50%">
      <el-empty description="暂无考试发布"></el-empty>
    </div>
  </div>
</template>

<script>
import { reqSearchPaperInfo, reqGetPaperList } from '@/api/paper'
export default {
  data() {
    return {
      newData: null
    }
  },

  async created() {
    const { tno } = this.$store.getters.userInfo
    const { data } = await reqSearchPaperInfo(tno)
    const arr = []

    data.forEach(async item => {
      const {
        data: { paperName }
      } = await reqGetPaperList(item.paperId)
      arr.push({ ...item, paperName })
    })
    this.newData = arr
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
* {
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
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
