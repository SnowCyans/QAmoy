import request from '../utils/request.js'

// 获取订单
export const getOrder = (data) => {
	return request({
		url:'/member/order',
		data
	})
}

// 生成订单
export const generateOrder = () => {
	return request({
		url:'/member/order/pre',
	})
}

// 提交订单
export const postOrder = (data) => {
	return request({
		url:'/member/order',
		method:'POST',
		data
	})
}

// 模拟支付
export const orderPay = (orderId) => {
	return request({
		url:'/pay/mock',
		data:{orderId}
	})
}

// 删除订单
export const deleteOrder = (ids) => {
	return request({
		url:'/member/order',
		method:'DELETE',
		data:{ids}
	})
}

// 取消订单
export const cancelOrder = (data) => {
	return request({
		url:`/member/order/${data.id}/cancel`,
		method:'PUT',
		data
	})
}

// 查看物流
export const getLogistics = (id) =>{
	return request({
		url:`/member/order/${id}/logistics`
	})
}