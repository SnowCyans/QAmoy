import request from '../utils/request.js'

// 购物车列表
export const cartList = () => {
	return request({
		url:'/member/cart'
	})
}

// 全选/取消全选
export const selectCart = (data) => {
	return request({
		method:'PUT',
		url:'/member/cart/selected',
		data
	})
}

// 修改购物车商品
export const updataCart = (data) => {
	return request({
		url:`/member/cart/${data.skuId}`,
		method:'PUT',
		data
	})
}

// 添加购物车
export const addCart = (data) => {
	return request({
		method:'POST',
		url:'/member/cart',
		data
	})
}

// 删除购物
export const removeCart = (data) => {
	return request({
		method:'DELETE',
		url:'/member/cart',
		data
	})
}

export const obtainCollect = (data) => {
	return request({
		url:'/member/collect',
		data
	})
}