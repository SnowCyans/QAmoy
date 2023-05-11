<template>
	<view>
		<navigationBar title='提交订单'></navigationBar>
		<!-- 收货地址 -->
		<view class="bg-fff margin">
			<view v-for="(item,i) in submitAddress" :key="i"
				class="oAddress flex justify-between align-center padding color-huise">
				<view class="padding">
					<text>收货人：{{item.receiver}}</text>
					<text>联系方式：{{item.contact}}</text>
					<text>收货地址：{{item.address}}</text>
				</view>
				<view @click="addressShow=true" class="switch color-lvse">
					<text>切换地址</text>
				</view>
			</view>
			<!-- 分隔线 -->
			<view class="padding-lr-sm">
				<u-gap height="1" bgColor="#bbb"></u-gap>
			</view>
			<!-- 商品信息 -->
			<view class="padding">
				<h4>商品信息</h4>
				<view v-for="(item,i) in orderInfoList.goods" :key="i" class="goodsInfo margin-tb-sm flex align-center">
					<view class="">
						<image :src="item.picture" mode="aspectFill"></image>
					</view>
					<view class="margin-left-xs">
						<h4>{{item.name}}</h4>
						<view class="attrsText margin-tb-xs fs-26">
							<text>{{item.attrsText}}</text>
						</view>
						<text class="fs-26 color-huise">单价:</text><text class="color-red fs-26">￥{{item.price}}</text>
					</view>
					<view class="fs-26">
						<text class="color-huise">数量：x</text><text class="color-heise">{{item.count}}</text>
					</view>
				</view>
				<view class="">
					<u--input shape="circle" placeholder="请填写订单备注" v-model="submitOrderObj.buyerMessage"></u--input>
				</view>
			</view>
			<view class="padding-lr-sm">
				<u-gap height="1" bgColor="#bbb"></u-gap>
			</view>
			<!-- 配送时间 -->
			<view class="padding-top padding-lr">
				<h4>配送时间</h4>
				<view class="flex padding-tb-sm justify-between fs-28 color-huise">
					<view @click="handleGive(i)" v-for="(item,i) in giveList" :key="i" class="views"
						:class="[giveActive === i ? 'giveActive' : '']">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<!-- 支付方式 -->
			<view class="padding-lr">
				<h4>支付方式</h4>
				<view class="flex padding-tb-sm color-huise">
					<view @click="handlePayment(i)" v-for="(item,i) in paymentList" :key="i"
						class="views margin-right-xl" :class="[paymentActive === i ? 'paymentActive' : '']">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="padding">
				<h4>金额明细</h4>
				<view class="padding-tb-sm flex justify-between align-center">
					<view class="">
						<text>商品件数：</text> <text>{{orderInfoList.summary.goodsCount}}</text>件
						<view class="margin-tb-xs">
							<text>商品总价：</text> <text class="color-red">￥{{orderInfoList.summary.totalPrice}}</text>
						</view>
						<text>运费：</text><text class="color-red">￥{{orderInfoList.summary.postFee}}</text>
						<view class="margin-top-xs">
							<text>应付金额：</text><text class="color-red">￥{{orderInfoList.summary.totalPayPrice}}</text>
						</view>
					</view>
					<view @click="placeOrder()" class="padding-lr-lg">
						<button class="bg-lvse color-fff">下单</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 切换地址弹出框 -->
		<u-popup :show="addressShow" round="15" mode="center" @close="addressShow = false">
			<view class="switchAddress padding">
				<view v-if="filterAddress.length !== 0">
					<view @click="handleAddress(i)" v-for="(item,i) in filterAddress" :key="i"
						class="switchContext margin-top-sm padding color-huise" :class="[addressActive === i ? 'addressActive' : '']">
						<text>收货人：{{item.receiver}}</text>
						<view class="">
							<text>联系方式：{{item.contact}}</text>
						</view>
						<text>收货地址：{{item.address}}</text>
					</view>
				</view>

				<view v-else class="">
					<u-empty text="无其他地址可切换" mode="address" icon="http://cdn.uviewui.com/uview/empty/address.png">
					</u-empty>
					<view class="text-center margin-top">
						<button @click="jumpAddAddress()" size="mini" class="bg-lvse color-fff">去添加地址</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		postOrder
	} from '../../api/order.js'
	export default {
		data() {
			return {
				addressShow: false,
				// 订单信息数据
				orderInfoList: {},
				giveList: ['不限时间', '工作日', '双休或假日'],
				paymentList: ['在线支付', '货到付款'],
				addressActive: null,
				giveActive: null,
				paymentActive: null,
				// 提交订单参数
				submitOrderObj: {
					goods: [],
					addressId: '',
					deliveryTimeType: '',
					payType: '',
					buyerMessage: ''
				}
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 获取上个页面传来的数据数据
			getData() {
				let channel = this.getOpenerEventChannel()
				channel.on('item', (data) => {
					this.orderInfoList = data.data
					console.log(this.orderInfoList);
				})
			},
			// 跳转地址页
			jumpAddAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			// 选择地址
			handleAddress(i) {
				this.addressActive = i
			},
			// 点击配送时间
			handleGive(i) {
				this.giveActive = i
				this.submitOrderObj.deliveryTimeType = i += 1
			},
			// 点击支付方式
			handlePayment(i) {
				this.paymentActive = i
				this.submitOrderObj.payType = i += 1
			},
			// 下单
			async placeOrder() {
				// 判断是否填写了备注
				if (this.submitOrderObj.buyerMessage !== '') {
					// 判断是否选了配送时间和支付方式
					if (this.giveActive === null || this.paymentActive === null) {
						uni.showToast({
							title: '请选择配送时间和支付方式',
							icon: 'none'
						})
					} else {
						// 获取要传的商品数据
						this.orderInfoList.goods.forEach((item) => {
							let {
								skuId,
								count
							} = item
							let num = {
								skuId,
								count
							}
							this.submitOrderObj.goods.push(num)
						})
						// 传地址
						this.submitOrderObj.addressId = this.submitAddress[0].id
						await postOrder(this.submitOrderObj)
						this.$refs.uToast.show({
							type: 'success',
							message: '已下单',
							duration: '1000',
							complete: () => [
								uni.navigateTo({
									url: '/pages/order/order'
								})
							]
						})

					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请填写备注'
					})
				}
			},

		},
		computed: {
			// 默认地址
			submitAddress() {
				return this.orderInfoList.userAddresses.filter((item, i) => {
					return i === 0
				})
			},
			filterAddress() {
				return this.orderInfoList.userAddresses.filter((item, i) => {
					return i > 0
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		margin-top: 100rpx;
		background-color: #f5f5f5;
	}

	.oAddress {
		background-color: #fff;
		border-radius: 20rpx;

		view {
			text {
				display: block;
				margin-bottom: 10rpx;
			}
		}

		.switch {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border: 1rpx solid gray;
		}
	}

	.switchAddress {
		.switchContext {
			width: 700rpx;
			border: 1rpx solid gray;
		}
	}


	// 商品信息
	.goodsInfo {
		view {
			image {
				width: 170rpx;
				height: 170rpx;
				border-radius: 20rpx;
			}

			h4 {
				width: 300rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-top: -15rpx;
			}

			.attrsText {
				width: 300rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	// 配送和支付通用样式
	.views {
		text-align: center;
		width: 180rpx;
		height: 70rpx;
		line-height: 70rpx;
		border: 1rpx solid gray;
	}

	.addressActive {
		border: 1rpx solid #28bc9b !important;
		color: black !important;
	}

	.paymentActive {
		border: 1rpx solid #28bc9b;
		color: black;
	}

	.giveActive {
		border: 1rpx solid #28bc9b;
		color: black;
	}
</style>
