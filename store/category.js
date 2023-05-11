export default {
	namepaced:true,
	state:() => ({
		cateList:[]
	}),
	
	mutations:{
		// 设置cateList数据
		getCateList(state,catelist){
			state.cateList = catelist
		}
	},
	
	actions:{
		// 获取分类数据
		// asCateList(state,)
	},
	
	
}