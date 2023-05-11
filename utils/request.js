import {getStorage} from './persistence.js'
// const baseUrl = 'http://pcapi-xiaotuxian-front.itheima.net'
const baseUrl = 'https://pcapi-xiaotuxian-front.itheima.net'
const  request = (options) => {
	
	const header = {
		"Authorization":"Bearer " + getStorage('rabbitToken') || ''
	};
	
	return new Promise((resolve,reject) => {
		uni.request({
			url:baseUrl + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			header:header,
			success:(res) => {
				if(res.statusCode !== 200 && res.statusCode !== 201){
					return uni.showToast({
						icon:'none',
						title:'请登录后刷新'
					})
				};
				resolve(res)
			},
			fail:(err) => {
				return uni.showToast({
					icon:'none',
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}

export default request;