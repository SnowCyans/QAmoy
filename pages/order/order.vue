<template>
	<view class="margin-top-xs">
		<navigationBar title="订单" navBgColor="#f2f2f2"></navigationBar>
		<view class="subsection padding-lr">
			<!-- 分段器组件 -->
			<u-subsection @change="change" :list="list" :current="current" bgColor="#f2f2f2" fontSize="14"
				activeColor="#27bb9a"></u-subsection>
		</view>
		<view class="context">

		</view>
		<!-- 加载效果 -->
		<u-loadmore loadingText="努力加载中,莫急" v-if="loadingShow" status="loading" />
		<view v-else>
			<!-- 为空显示 -->
			<u-empty v-if="flag && orderList.length === 0" marginTop="200px" mode="order"
				icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>

			<!-- 有数据显示 -->
			<view v-else v-for="(item,i) in orderList" :key="i" class="order-info padding-sm margin-lr">
				<view class="padding-bottom text-right color-lvse">
					<text v-if="item.orderState === 1" class="color-red">待付款</text>
					<text v-if="item.orderState === 2" class="color-chengse">待发货</text>
					<text v-if="item.orderState === 3" class="">待收货</text>
					<text v-if="item.orderState === 4" class="color-chengse">待评价</text>
					<text v-if="item.orderState === 5" class="">已完成</text>
					<text v-if="item.orderState === 6" class="color-red">已取消</text>
				</view>

				<!-- 订单商品 -->
				<view class="order-g flex justify-between">
					<view class="flex">
						<image :src="item.skus[0].image" mode="aspectFill"></image>
						<view class="order-g-info margin-left-sm">
							<h4>{{item.skus[0].name}}</h4>
							<view class="attrsText padding-tb-xs">
								<text class=" fs-20">{{item.skus[0].attrsText}}</text>
							</view>
							<text class="fs-20">下单时间:{{item.createTime}}</text>
						</view>
					</view>
					<view class="price">
						<h4>￥{{item.skus[0].realPay}}</h4>
						<view class="text-right">
							<text>x{{item.totalNum}}</text>
						</view>
					</view>
				</view>

				<view class="padding-top text-right">
					邮费:<text class="margin-right-sm">￥{{item.postFee}}</text>
					<text class="text-bold fs-26">实付:<text
							class="fs-34 color-red">￥{{item.payMoney.toFixed(2)}}</text></text>
				</view>

				<!-- 操作 -->
				<view class="operation padding-top flex justify-between align-center">
					<view class="color-huise">
						<text @click="delShow = !delShow">更多</text>
						<view v-if="delShow" class="delOrder">
							<text v-if="cancelAndDel" @click="delOrder(item)">删除订单</text>
							<text v-else @click="cancel(item)">取消订单</text>
						</view>
					</view>
					<view class="orderOperation flex">
						<view @click="logistics(item)" v-if="item.orderState === 3 || item.orderState === 4"
							class="margin-right">
							<text>查看物流</text>
						</view>
						<view class="">
							<text @click="toPay(item)" v-if="item.orderState === 1" class="">去付款</text>
							<text @click="urge()" v-if="item.orderState === 2" class="">催发货</text>
							<text v-if="item.orderState === 3" class="">确认收货</text>
							<text @click="appraise()" v-if="item.orderState === 4" class="">去评价</text>
							<text v-if="item.orderState === 5" class="">再次购买</text>
							<text @click="buyagain(item)" v-if="item.orderState === 6" class="">重新购买</text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="orderBottom">

		</view>

		<!-- 取消弹出框 -->
		<u-popup :show="cancelShow" round="50" mode="center" @close="cancelShow= false">
			<view class="padding-lg">
				<u--form :rules="rules" labelPosition="left" :model="cancelOrderObj" ref="uForm">
					<u-form-item required labelWidth="150rpx" label="取消理由" prop="cancelReason">
						<u--input v-model="cancelOrderObj.cancelReason" placeholder="请填写理由" border="none"></u--input>
					</u-form-item>
					<u-form-item>
						<button @click="confirmCancelOrder()" class=" bg-lvse color-fff">确定</button>
					</u-form-item>
				</u--form>
			</view>
		</u-popup>

		<!-- 查看物流弹出框 -->
		<u-popup :show="logisticsShow" mode="center" round="50" @close="logisticsShow=false">
			<view class="logistic">
				<view class="padding flex">
					<image :src="logisticsList.picture" mode="aspectFill"></image>
					<view v-if="logisticsList.company" class="fs-30 margin-left">
						<h4>公司名称:QQ工作室</h4>
						<view class="margin-tb-sm">
							<text>联系电话:{{logisticsList.company.tel}}</text>
						</view>
						<view class="ordernum">
							<text>快递编号:{{logisticsList.company.number}}</text>
							<text @tap="copyOrderNum(logisticsList.company.number)"
								class="margin-left-xs color-lvse">复制</text>
						</view>
					</view>
				</view>
				<view class="padding">
					<u-steps activeColor="#27bb9a" current="0" direction="column">
						<u-steps-item v-for="(item,i) in logisticsList.list" :key="item.id" :title="item.text"
							:desc="item.time"></u-steps-item>
					</u-steps>
				</view>

			</view>
		</u-popup>

		<u-toast ref="uToast"></u-toast>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import {
		getOrder,
		deleteOrder,
		cancelOrder,
		getLogistics
	} from '../../api/order.js'
	export default {
		data() {
			return {
				// 返回顶部
				scrollTop: 0,
				loadingShow: true,
				list: ['待付款', '待发货', '待收货', '待评价', '已完成', '已取消'],
				// 分段器索引
				current: 0,
				// 订单参数
				orderObj: {
					page: 1,
					pageSize: 3,
					orderState: 1
				},
				flag: false,
				// 订单数据
				orderList: [],
				delShow: false,
				// 显示取消或是删除订单
				cancelAndDel: false,
				// 取消订单弹出框
				cancelShow: false,
				// 取消订单参数
				cancelOrderObj: {
					id: '',
					cancelReason: ''
				},
				// 验证规则
				rules: {
					'cancelReason': [{
						required: true,
						message: '请填写取理由',
						trigger: ['blur', 'change']
					}]
				},
				// 查看物流弹出框
				logisticsShow: false,
				// 物流信息数据
				logisticsList: {},
			};
		},
		async onLoad() {
			// 接收参数
			let channel = this.getOpenerEventChannel()
			channel.on('item', (data) => {
				this.current = data.data
				this.orderObj.orderState = data.data += 1
			})
			// 如果进入页面不是待付款状态就显示删除订单
			if (this.current !== 0) {
				this.cancelAndDel = true
			}
			this.order()
		},
		// 进入页面
		onShow() {
			this.order()
		},
		// 页面的滚动距离，通过onPageScroll生命周期获取
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 上拉刷新和触底刷新函数
		onReachBottom() {
			this.order()
		},
		methods: {
			// 获取订单数据
			async order() { // 给形参个默认值
				const res = await getOrder(this.orderObj)
				console.log(res);
				if (res.data.result.items.length) {
					this.flag = false
					this.orderObj.page++
					this.orderList = [
						...res.data.result.items,
						...this.orderList
					]
					// 关闭加载 
					this.loadingShow = false
					// 数据加载完关闭下拉刷新
					uni.stopPullDownRefresh()
				} else {
					this.loadingShow = false
					// 点击的订单状态压根没有数据
					if (this.flag) {
						this.orderList = res.data.result.items
					} else {
						// 当前订单状态数据获取完了
						uni.showToast({
							title: '没有数据了',
							icon: 'none'
						})
					}
				}

			},
			// 点击对应状态请求对应数据
			async change(e) {
				// 如果是未付款状态显示取消订单，其他状态显示删除订单
				e === 0 ? this.cancelAndDel = false : this.cancelAndDel = true
				this.current = e
				// 开启加载
				this.flag = true
				this.loadingShow = true
				this.orderObj.orderState = e + 1
				this.delShow = false
				this.order()
			},
			// 去支付
			toPay(item) {
				uni.navigateTo({
					url: '/pages/order/buyNow',
					success: (res) => {
						res.eventChannel.emit('item',{data:item})
					}
				})
			},
			// 催发货
			urge() {
				this.loadingToast('已发送')
			},
			// 查看物流
			async logistics(item) {
				const res = await getLogistics(item.id)
				// console.log(res);
				this.logisticsList = res.data.result
				console.log(this.logisticsList);
				this.logisticsShow = true
			},
			// 点击复制
			copyOrderNum(text) {
				uni.setClipboardData({
					data: text,
				})
			},
			// 评价
			appraise(){
				uni.showToast({
					icon:'none',
					title:'暂不可评价'
				})
			},
			 buyagain(item){
				uni.showToast({
					icon:'none',
					title:'商品已失效'
				})
			},
			// 取消订单
			cancel(item) {
				this.cancelShow = true
				this.delShow = false
				this.cancelOrderObj.id = item.id
			},
			// 确认取消订单
			async confirmCancelOrder() {
				this.$refs.uForm.validate().then(async res => {
					await cancelOrder(this.cancelOrderObj)
					this.order()
					this.delShow = false
					this.loadingToast('已取消')
					this.cancelShow = false
					this.cancelOrderObj.cancelReason = ''
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			// 删除订单
			async delOrder(item) {
				let ids = []
				ids.push(item.id)
				// let ids = []
				// this.orderList.forEach((items) => {
				// 	ids.push(items.id)
				// })
				console.log(ids);
				await deleteOrder(ids)
				this.order()
				this.delShow = false
				this.loadingToast()
			},
			// 封装消息状态提示
			loadingToast(comMsg = "删除成功") {
				this.$refs.uToast.show({
					type: 'success',
					message: comMsg
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.subsection {
		position: fixed;
		top: 100rpx;
		z-index: 9;
		left: 0;
		width: 100%;
	}

	.context {
		margin-top: 200rpx;
	}

	.order-info {
		margin-top: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;

		// 订单商品信息
		.order-g {
			image {
				width: 170rpx;
				height: 170rpx;
				border-radius: 20rpx;
			}

			.order-g-info {

				// 文字不允许换行
				h4 {
					// 设置宽度
					width: 380rpx;
					// 文字不允许换行
					white-space: nowrap;
					// 超出隐藏
					overflow: hidden;
					// 文本溢出。使用...代替
					text-overflow: ellipsis;
				}
				.attrsText{
					width: 370rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			
		}

		// 操作
		.operation {
			.orderOperation {
				view {
					width: 170rpx;
					height: 60rpx;
					line-height: 60rpx;
					border: 2rpx solid #c9c9c9;
					text-align: center;
					border-radius: 50rpx;
				}
			}

			.delOrder {
				position: absolute;
				top: 380rpx;
				left: 40rpx;
				width: 140rpx;
				height: 55rpx;
				line-height: 55rpx;
				border-radius: 10rpx;
				text-align: center;
				background-color: #fff;
				box-shadow: 5rpx 3rpx 13rpx -10rpx rgba(20%, 20%, 40%, 0.5);

				text {
					font-size: 26rpx;
					color: black;
				}
			}
		}
	}

	.orderBottom {
		width: 200%;
		height: 10rpx;
		background-color: #f2f2f2;
		margin-top: 20rpx;
	}

	.logistic {
		view {
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>
