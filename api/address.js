import request from '../utils/request.js'

// 获取收货地址列表
export const getAddress = () => {
	return request({
		url:'/member/address'
	})
}

// 添加收货地址
export const addAddress = (data) => {
	return request({
		url:'/member/address',
		method:'POST',
		data
	})
}

// 修改收货地址
export const putAddress = (data) => {
	return request({
		url:`/member/address/${data.id}`,
		method:'PUT',
		data
	})
}

// 删除收货地址
export const deleteAddress = (id) => {
	return request({
		url:`/member/address/${id}`,
		method:'DELETE'
	})
}