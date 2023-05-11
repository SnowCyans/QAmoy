import request from '../utils/request.js'

// 获取我的收藏
export const getCollect = (collectType) => {
	return request({
		url:'/member/collect',
		data:{collectType}
	})
}

// 添加收藏
export const addCollect = (data) => {
	return request({
		url:'/member/collect',
		method:'POST',
		data
	})
}

// 取消收藏
export const deleteCollecction = (data) => {
	return request({
		url:'/member/collect/batch',
		method:'DELETE',
		data
	})
}

// 获取我的足迹
export const getBrowseHistory = () => {
	return request({
		url:'/member/browseHistory'
	})
}

// 删除我的足迹
export const deleteBrowseHistory = (ids) => {
	return request({
		url:`/member/browseHistory/batch`,
		method:'DELETE',
		data:{ids}
	})
}

