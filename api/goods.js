import request from '../utils/request.js'

// 商品信息
export const goodsList = (id) => {
	return request({
		url:`/goods?id=${id}`
	})
}

// 同类推荐
export const gRelevant = (data) => {
	return request({
		url:'/goods/relevant',
		data
	})
}

// 商品分类列表
export const gCategory = (data) => {
	return request({
		method:'POST',
		url:'/category/goods',
		data
	})
}

// 商品的评价信息
export const gValue = (id) => {
	return request({
		url:`/goods/${id}/evaluate`
	})
}

// 评价分页数据
export const gValuePage = ({id,data}) => {
	return request({
		url:`/goods/${id}/evaluate/page`,
		data
	})
	
}