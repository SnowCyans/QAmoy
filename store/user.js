import {login} from '../api/user.js'
import {setStorage,getStorage,removeStorage} from '../utils/persistence.js'
export default {
	namespaced:true,
	state:() => ({
		token:getStorage('rabbitToken') || '',
		userInfo:getStorage('rabbitUser') || {}
	}),
	mutations:{
		// 存储token
		setToken(state,token){
			state.token = token
		},
		// 存储用户信息
		setUserInfo(state,userObj){
			state.userInfo = userObj
		},
		// 退出登录
		removeLogin(state){
			state.userInfo = {}
			state.token = ''
			removeStorage('rabbitUser')
			removeStorage('rabbitToken')
			location.reload()
		}
	},
	actions:{
		// 登录
		async login(context,loginObj){
			const res = await login(loginObj)
			console.log(res);
			context.commit('setUserInfo',res.data.result)
			context.commit('setToken',res.data.result.token)
			// 持久化用户信息和token
			setStorage('rabbitUser',res.data.result)
			setStorage('rabbitToken',res.data.result.token)
		}
	}
}