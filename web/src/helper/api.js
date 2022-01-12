import ajax from './ajax'

export function getArticleList () {
  return ajax.get('/api/article/list')
}

export function getAdminList () {
  return ajax.get('/api/admin/list')
}

export function deleteArticle (id) {
  return ajax.post('/api/admin/delete', { id })
}

export default {
  getArticleList,
  getAdminList,
  deleteArticle
}