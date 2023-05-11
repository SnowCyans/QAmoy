import request from '../utils/request.js'

// 首页数据
export const getHome = () => {
	return request({
		url:'/home/index'
	})
}

// 头部栏
export const getHead = () => {
	return request({
		url:'/home/category/head'
	})
}

// 广告轮播图
export const getBanner = () => {
	return request({
		url:'/home/banner'
	})
}

// 新鲜好物
export const getNew = (limit) => {
	return request({
		url:'/home/new',
		data:{limit}
	})
}

// 热门品牌
export const getBeand = () => {
	return request({
		url:'/home/brand'
	})
}

// 获取品牌详情
export const getBrandId = (id) => {
	return request({
		url:`/brand/${id}`
	})
}

// 获取专题分类列表
export const getTopicClass = () => {
	return request({
		url:'/topic/classification'
	})
}
// 获取专题列表
export const getTopic = (classificationId) => {
	return request({
		url:'/topic',
		data:{classificationId}
	})
}

// 获取专题详情
export const getTopicId = (id) => {
	return request({
		url:`/topic/${id}`,
	})
}

// 专题收藏或取消收藏
export const topicCollect = (id) => {
	return request({
		url:`/topic/${id}/collect`,
		method:'POST'
	})
}
