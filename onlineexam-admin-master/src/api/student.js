import ajax from '@/config/ajax'
const BASE_URL = process.env.BASE_API + '/teacher'

// 获取全部学生信息
export const reqGetStudentsList = () => ajax(BASE_URL + '/getStudentsList')
// 请求更新学生登录状态
export const reqUpdateStudentInfo = row =>
  ajax(BASE_URL + '/updateStudentInfo', row, 'POST')
// 请求搜索学生信息
export const reqSearchStudentsList = (sno, stuName, stuSex, stuClassName) =>
  ajax(BASE_URL + '/searchStudentInfo', {
    sno,
    stuName,
    stuSex,
    stuClassName
  })
// 请求添加学生信息
export const reqInsertStudentInfo = temp =>
  ajax(BASE_URL + '/insertStudentInfo', temp, 'POST')

// 将一个课程分配给一位老师，让其带某个班的学生
export const reqInsertContecttion = (teacher_tno, class_tno, paper_id) =>
  ajax(
    BASE_URL + '/insertConnectTeacherStudentClassInfo',
    { teacher_tno, class_tno, paper_id },
    temp
  )

// 获取全部成绩信息
export const reqGetScoresList = () => ajax(BASE_URL + '/getScoresList')
// 请求删除成绩
export const reqDeleteScore = row =>
  ajax(BASE_URL + '/deleteScore', row, 'POST')
// 请求搜索成绩信息
export const reqSearchScoresList = (sno, paperId) =>
  ajax(BASE_URL + '/searchScoresList', { sno, paperId })

// 获取全部已发布试卷信息
export const reqGetPapersList = () => ajax(BASE_URL + '/getPapersList')
// 请求获取成绩图标数据
export const reqGetChartData = paperId =>
  ajax(BASE_URL + '/getChartData', { paperId })

// 插入上传学生信息数据
export const reqInsertStudentInfoList = studentList =>
  ajax(BASE_URL + '/insertStudentInfoList', { studentList }, 'POST')
