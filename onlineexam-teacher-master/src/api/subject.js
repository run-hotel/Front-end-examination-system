import ajax from '@/config/ajax'
const BASE_URL = process.env.BASE_API

// 获取全部科目信息
export const reqGetSubjectsList = () => ajax(BASE_URL + '/getSubjectsList')
// 获取搜索科目信息
export const reqSearchSubjectsList = (
  langName,
  langDesc,
  langCreatedBy,
  isRecommend
) =>
  ajax(BASE_URL + '/searchSubjectsList', {
    langName,
    langDesc,
    langCreatedBy,
    isRecommend
  })
// 请求添加轮播图信息
export const reqInsertSubjectInfo = temp =>
  ajax(BASE_URL + '/insertSubjectInfo', temp, 'POST')
// 请求更新轮播图信息
export const reqUpdateSubjectInfo = row =>
  ajax(BASE_URL + '/updateSubjectInfo', row, 'POST')
// 请求删除科目
export const reqDeleteSubject = langId =>
  ajax(BASE_URL + '/deleteSubject', { langId }, 'POST')
// 获取所有班级
export const reqGetAllClasses = () => ajax(BASE_URL + '/getStudentClasses')
// 通过老师 id 获取老师所教的科目
export const reqGetClassByTeacherId = tno =>
  ajax(BASE_URL + '/searchclassfromteacherInfo', { tno })
