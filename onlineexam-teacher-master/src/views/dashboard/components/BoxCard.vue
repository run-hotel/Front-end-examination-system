<template>
  <div class="flex-col page">
    <div class="flex-row justify-between items-start group">
      <div class="flex-col space-y-66 group_2">
        <div class="flex-col">
          <span class="text_2">教师ID :{{ userInfo.tno }}</span>
          <span class="text_2">姓名：{{ userInfo.teaName }}</span>
          <span class="font_1 text_3">Bio</span>
          <span class="font_2 text_4">
            <p>冰冻三尺，非一日之寒</p>
          </span>
        </div>
        <div class="flex-col space-y-17 group_4">
          <span class="font_1 text_5">Wants &amp; Needs</span>
          <span class="font_2 text_6">
            <p>合抱之木，生于毫末.</p>

            <p>九层之台，起于累土.</p>
            <p>书山有路，始于足下.</p>
          </span>
        </div>
      </div>
      <div class="flex-col space-y-62 group_3">
        <img
          class="image"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219332254738.png"
        />
        <div class="flex-col">
          <img
            class="image_2"
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219362845532.png"
          />
          <span class="font_2 text_7">
            别在树底下彷徨，别雨中思索，别在暗夜里流泪，向前走，也有一片明朗的天，不容易让人觉得迷茫!
          </span>
          <div class="flex-row space-x-52 group_5">
            <div class="flex-row">
              <img
                class="image_3"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219442988051.png"
              />
              <span class="font_2 text_8">Email:{{ userInfo.teaEmail }}</span>
            </div>
            <!-- <div class="flex-row">
              <img
                class="image_4"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219452842360.png"
              />
              <span class="font_2 text_9">Seattle, WA</span>
            </div> -->
          </div>
          <div class="flex-row space-x-52 group_5">
            <div class="flex-row">
              <img
                class="image_4"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219452842360.png"
              />
              <span class="font_2 text_8"
                >Recent:{{ userInfo.teaLastLoginTime | date_format }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col group_6">
      <span class="font_1 text_10">Emotional Triggers</span>
      <div class="flex-row justify-between items-start group_7">
        <span class="font_2 text_12">
          向前走，绝不后悔，如果你敢于应对平分生命，便会发觉，成绩的伤痛不过是短暂性的多雨季节.
        </span>
        <div class="flex-col space-y-38">
          <span class="font_1 text_11">Favorite Brands</span>
          <div class="flex-row space-x-32 group_8">
            <img
              class="image_6"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219392328536.png"
            />
            <img
              class="image_8"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219417527579.png"
            />
            <img
              class="image_5"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219428001237.png"
            />
            <img
              class="image_7"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b1197a5a7e3f0310471dad/63520f2af9b4a40011dac7c5/16663222219432651897.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      teaImg: require('@/assets/images/teacher.jpg'),
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style>
/************************************************************
** 请将全局样式拷贝到项目的全局 CSS 文件或者当前页面的顶部 **
** 否则页面将无法正常显示                                  **
************************************************************/

html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body * {
  box-sizing: border-box;
  flex-shrink: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-evenly {
  justify-content: space-evenly;
}

.justify-around {
  justify-content: space-around;
}

.justify-between {
  justify-content: space-between;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}
.page {
  padding: 20px 43px 0px 52px;
  background-color: #fdfeff;
  border-radius: 20.5px;
  box-shadow: 0px 8.23px 49.38px #00518c26;
  /* width: 1500px; */
  width: 300%;
  overflow-y: auto;
  overflow-x: hidden;
  /* height: 1000px; */
  height: 150%;
}
.group {
  padding: 6px 0 16px;
}
.space-y-66 > *:not(:first-child) {
  margin-top: 66px;
}
.group_2 {
  width: 428px;
}
.text {
  align-self: flex-start;
  color: #002139;
  font-size: 33px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24.5px;
}
.text_2 {
  margin-top: 22px;
  align-self: flex-start;
  color: #00508c;
  font-size: 24.5px;
  font-family: Inter;
  line-height: 23.5px;
}
.font_1 {
  font-size: 20.5px;
  font-family: Inter;
  line-height: 16px;
  color: #00508c;
}
.text_3 {
  margin-left: 2px;
  margin-top: 31px;
  align-self: flex-start;
}
.font_2 {
  font-size: 24.5px;
  font-family: Inter;
  line-height: 30px;
  color: #002139;
}
.text_4 {
  margin-left: 3px;
  margin-top: 17px;
}
.space-y-17 > *:not(:first-child) {
  margin-top: 17px;
}
.group_4 {
  align-self: flex-start;
  width: 371px;
}
.text_5 {
  align-self: flex-start;
  line-height: 15.5px;
}
.text_6 {
  margin-left: 14px;
  word-break: break-all;
}
.space-y-62 > *:not(:first-child) {
  margin-top: 62px;
}
.group_3 {
  margin-top: 12px;
  width: 381px;
}
.image {
  align-self: center;
  width: 292px;
  height: 292px;
}
.image_2 {
  align-self: center;
  width: 41px;
  height: 41px;
}
.text_7 {
  margin-top: 13px;
}
.space-x-52 > *:not(:first-child) {
  margin-left: 52px;
}
.group_5 {
  margin-top: 31px;
  padding: 0 39px;
}
.image_3 {
  flex-shrink: 0;
  width: 31px;
  height: 31px;
}
.text_8 {
  margin: 6px 0 7px 12px;
  line-height: 18.5px;
}
.image_4 {
  flex-shrink: 0;
  width: 23px;
  height: 31px;
}
.text_9 {
  margin: 6px 0 2px 12px;
  line-height: 22.5px;
}
.group_6 {
  padding: 12px 2px;
}
.text_10 {
  align-self: flex-start;
  line-height: 20px;
}
.group_7 {
  margin-left: 13px;
  margin-right: 6px;
}
.text_12 {
  margin-top: 16px;
  word-break: break-all;
  width: 357px;
}
.space-y-38 > *:not(:first-child) {
  margin-top: 38px;
}
.text_11 {
  align-self: flex-start;
}
.space-x-32 > *:not(:first-child) {
  margin-left: 32px;
}
.group_8 {
  padding-left: 38px;
}
.image_6 {
  margin-top: 6px;
  width: 45px;
  height: 66px;
}
.image_8 {
  margin-top: 8px;
  width: 64px;
  height: 64px;
}
.image_5 {
  width: 64px;
  height: 72px;
}
.image_7 {
  margin-top: 6px;
  width: 62px;
  height: 66px;
}
</style>
