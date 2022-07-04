import request from './request'

export const getLists = (params: any) => request.get('/chak', params)

export const login = (params: any) => {
	return request.post('/login', params)
}

export const register = (params: any) => {
	return request.post('/register', params)
}

export const queryText = (params?: any) => {
	return request.get(params ? `/queryText?userId=${params}` : '/queryText')
}

export const addText = (params: any) => {
	return request.post('/addText', params)
}

export const updataText = (params: any) => {
	return request.post('/updataText', params)
}

export const delText = (params: any) => {
	return request.post('/delText', params)
}

export const queryAllUser = () => {
	return request.get('/queryAllUser')
}

export const delUser = (params: any) => {
	return request.post('/delUser', params)
}

export const setAdmin = (params: any) => {
	return request.post('/setAdmin', params)
}

export const updataAdminPassword = (params: any) => {
	return request.post('/updataAdminPassword', params)
}

export const uploadsAvatar = (params: any) => {
	return request.post('/uploadsAvatar', params)
}

export const queryUser = (params: any) => {
	return request.post('/queryUser', params)
}

export const queryAllLength = () => {
	return request.get('/queryAllLength')
}