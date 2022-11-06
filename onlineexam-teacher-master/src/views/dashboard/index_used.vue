<template>
  <div
    :class="[
      'dashboard-container',
      { 'dashboard-padding': device !== 'mobile' }
    ]"
  >
    <div class="teacher_info">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 7 }"
        :xl="{ span: 7 }"
      >
        <box-card />
      </el-col>
    </div>
    >
    <div class="login">
      <div style="width: 40%; height: 50%; margin: 0 auto" ref="editor"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import BoxCard from './components/BoxCard'

export default {
  name: 'Dashboard',
  components: {
    PanThumb,
    BoxCard
  },
  data() {
    return {
      teaImg: require('@/assets/images/teacher.jpg')
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'device'])
  }
}
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-padding {
    padding: 15px 60px 0px;
  }
}
</style>
