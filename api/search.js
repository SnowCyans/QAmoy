import request from '../utils/request.js'

// 商品搜索
export const searchAll = (data) => {
	return request({
		method:'POST',
		url:'/search/all',
		data
	})
}

// 搜索提示
export const searchTips = (keyword) => {
	return request({
		url:'/search/tips',
		data:{
			keyword
		}
	})
}