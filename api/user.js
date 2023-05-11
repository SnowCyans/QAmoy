import request from '../utils/request.js'

export const login = (data) => {
	return request({
		url:'/login',
		method:'POST',
		data
	})
}

// 获取用户信息
export const getUserInfo = () => {
	return request({
		url:'/member/profile'
	})
}

// 修改用户信息
export const editUserInfo = (data) => {
	return request({
		url:'/member/profile',
		method:'PUT',
		data
	})
}

// 修改头像
export const editAvatar = (data) => {
	return request({
		url:' /member/profile/avatar',
		method:'POST',
		data
	})
}