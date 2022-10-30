import ajax from '@/config/ajax'
const BASE_URL = process.env.BASE_API

// 获取全部公告信息
export const reqGetPapersList = () => ajax(BASE_URL + '/getTeacherPapersList')
// 获取全部公告信息
export const reqGetHomeWorkList = () =>
  ajax(BASE_URL + '/getTeacherPapersList2')

export const reqGetPaperList4 = tno =>
  ajax(BASE_URL + '/getTeacherPapersList4', { tno })
// 获取搜素公告信息
export const reqSearchPapersList = (paperName, langId, paperType) =>
  ajax(BASE_URL + '/searchPapersList', { paperName, langId, paperType })
// 请求删除试卷
export const reqDeletePaper = paperId =>
  ajax(BASE_URL + '/deletePaper', { paperId }, 'POST')
// 请求获取选中试卷问题详情
export const reqPaperQueDetailByPaperId = (paperId, totalNum) =>
  ajax(BASE_URL + '/getPaperQueDetailByPaperId', { paperId, totalNum })
// 请求随机组卷，插入试卷数据，即发布试卷
export const reqRandomInsertPaperInfo = temp =>
  ajax(BASE_URL + '/randomInsertPaperInfo', temp, 'POST')
// 请求固定组卷，插入试卷数据，即发布试卷
export const reqFixedInsertPaperInfo = temp =>
  ajax(BASE_URL + '/fixedInsertPaperInfo', temp, 'POST')
// 请求通过langId获取科目下的所有问题
export const reqPaperQueDetailByLangId = langId =>
  ajax(BASE_URL + '/getPaperQueDetailByLangId', { langId })

// 通过教师id查询目前以及分配的试卷
export const reqSearchPaperInfo = tno =>
  ajax(BASE_URL + '/searchclasspaperInfo', { tno })

export const reqGetPaperList = paper_id =>
  ajax(BASE_URL + '/getTeacherPapersListbyid', { paper_id })
