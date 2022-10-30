<template>
  <div class="home">
    <HeaderTop title="作业列表"></HeaderTop>
    <section class="work_no_login" v-if="!userInfo.sno">
      <i class="iconfont iconc-kongzhuangtai"></i>
      <h3>登录后查看作业</h3>
      <mt-button @click="$router.push('/login')">立即登录</mt-button>
    </section>
    <div class="sudoku_row" v-show="userInfo.sno">
      <div
        class="sudoku_item"
        :class="{
          opacity: curSelect === item.langId,
          recommend: item.isRecommend == '1',
          first_recommend: item.isRecommend == '1' && index == 0,
        }"
        v-for="(item, index) in languagesInfo"
        :key="index"
        @touchstart="touchstart(item.langId)"
        @touchend="touchend"
        @click="toPaper(item.langId)"
      >
        <img :src="item.langImgSrc" width="40" height="40" />
        {{ item.langName }}
      </div>
    </div>
  </div>
</template>
  
  <script>
import { Toast } from 'mint-ui'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import Star from '../../components/Star/Star.vue'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      currentDate: new Date(),
      curSelect: null,
      alreadyClock: false,
    }
  },
  components: { HeaderTop, Star },
  props: {},
  watch: {},
  computed: { ...mapState(['userInfo', 'languagesInfo']) },
  methods: {
    touchstart: function (e) {
      var list = this.$store.state.languagesInfo
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].langId == e) {
          this.curSelect = i + 1
        }
      }
      setTimeout(() => {
        this.curSelect = null
      }, 500)
    },
    touchend: function () {
      this.curSelect = null
    },
    toCalendar() {
      if (!this.$store.state.userInfo.sno) {
        Toast({
          message: '请先登录系统',
          duration: 1000,
        })
      } else {
        this.$router.push('/profile/examcalendar')
      }
    },
    toPaper(langId) {
      if (!this.$store.state.userInfo.sno) {
        Toast({
          message: '请先登录系统',
          duration: 1000,
        })
      } else {
        this.$router.push('/home/paper2/' + langId)
      }
    },
  },
  created() {
    this.$store.dispatch('getRotationImages')
    // this.$store.dispatch('getExamCalendar');
    this.$store.dispatch('getLanguagesInfo')
  },
  mounted() {},
}
</script>
  </style>
  <style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  .home { // 首页
    padding-bottom: 56px;
    width: 100%;
    background-color: #f5f5f5;

    .sudoku_row {
      display: flex;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
      background-color: #fff;
      margin-top: 100px;

      .recommend {
        background: url('../../common/imgs/corner-mark-recommend.png') no-repeat 0% 0%;
        background-size: 40px 40px;
      }

      .first_recommend {
        background: url('../../common/imgs/corner-mark-recommend.png') no-repeat 0% 0%, url('../../common/imgs/corner-mark-top-right.png') no-repeat 100% 0%;
        background-size: 40px 40px;
      }

      .sudoku_item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 33.3%;
        padding-top: 10px;
        padding-bottom: 10px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);

        img {
          margin-bottom: 3px;
          display: block;
        }
      }
    }

    .opacity {
      opacity: 0.4;
      background: #e5e5e5;
    }

    .work_no_login {
      padding-top: 100px;
      width: 60%;
      margin: 0 auto;
      text-align: center;

      >i {
        display: block;
        font-size: 180px;
        color: #4ab8a1;
      }

      >h3 {
        padding: 20px 0;
        font-size: 17px;
        color: #6a6a6a;
      }

      >button {
        display: inline-block;
        background: #4ab8a1;
        font-size: 14px;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 5px;
        padding: 10px 20px;
      }
    }
  }
</style>
  