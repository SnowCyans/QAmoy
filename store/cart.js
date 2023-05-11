import {cartList,updataCart} from '../api/cart.js'
// import {setStorage,getStorage} from '../utils/persistence.js'

export default {
	namespaced:true,
	state:() => ({
		// sCartList:getStorage('rabbitCart') || []
		sCartList:[]
	}),
	
	mutations:{
		//购物车数据
		setCart(state,sCartList){
			state.sCartList = sCartList
		},
	},
	actions:{
		async getCartList(context,sCartList){
			const res = await cartList()
			context.commit('setCart',res.data.result)
			// 数据持久化
			// setStorage('rabbitCart',res.data.result)
		}
	},
	getters:{
		isSelectAll(state){
			return state.sCartList.every((item) => {return item.selected})
		},
		totalPrice(state){
			return state.sCartList.filter((item) => item.selected).reduce((total,item) => total += Number(item.price * item.count),0)
		},
	}
}