import navigationBar from './navigationBar'
import productReview from './productReview'

export default {
	install(Vue){
		// 导航栏组件
		Vue.component('navigationBar',navigationBar)
		// 商品详情和评价组件
		Vue.component('productReview',productReview)
	}
}