<template>
	<view>
		<navigationBar title="订单状态"></navigationBar>
		<view class="padding-lg">
			<view class="flex align-center justify-between padding margin-tb">
				<view class="">
					<u-icon size="40" color="#28be9d" name="rmb-circle"></u-icon>
					<view class="">
						<text>待付款</text>
					</view>
				</view>
				<view class="color-huise">
					<view class="">
						<text>订单编号：{{goodsData.id}}</text>
					</view>
					<text>下单时间： {{goodsData.createTime}}</text>
				</view>
			</view>
			<u-steps current="1" activeColor="#29cba6">
				<u-steps-item title="提交订单" :desc="goodsData.createTime"></u-steps-item>
				<u-steps-item :title="flag ? '已超时' : '待付款'" :error="flag"></u-steps-item>
				<u-steps-item title="商品发货" desc=""></u-steps-item>
				<u-steps-item title="确认收货" desc=""></u-steps-item>
				<u-steps-item title="订单完成" desc=""></u-steps-item>
			</u-steps>

			<!-- 商品信息 -->
			<view class="padding">
				<h4>商品信息</h4>
				<view v-for="(item,i) in goodsData.skus" :key="i" class="goodsInfo margin-tb-sm flex align-center">
					<view class="">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="margin-left-xs">
						<h4>{{item.name}}</h4>
						<view class="attrsText margin-tb-xs fs-26">
							<text>{{item.attrsText}}</text>
						</view>
						<text class="fs-26 color-huise">单价:</text><text
							class="color-red fs-26">￥{{item.curPrice}}</text>
					</view>
					<view class="fs-26">
						<text class="color-huise">数量：x</text><text>{{item.quantity}}</text>
					</view>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="padding">
				<h4>金额明细</h4>
				<view class="padding-tb-sm flex justify-between align-center">
					<view class="">
						<text>商品件数：</text> <text>{{goodsData.totalNum}}</text>件
						<view class="margin-tb-xs">
							<text>商品总价：</text> <text class="color-red">￥{{goodsData.totalMoney}}</text>
						</view>
						<text>运费：</text><text class="color-red">￥{{goodsData.postFee}}</text>
						<view class="margin-top-xs">
							<text>应付金额：</text><text class="color-red">￥{{goodsData.payMoney}}</text>
						</view>
					</view>
					<view class="padding-lr-lg">
						<button v-if="flag" class="bg-red color-fff">取消订单</button>
						<button v-else @click="confirmPayment()" class="bg-lvse color-fff">付款</button>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		nowOrder,
		orderPay
	} from '../../api/order.js'
	export default {
		data() {
			return {
				goodsData: {},
				skusList: [],
				flag: null,
			};
		},
		onLoad() {
			let channel = this.getOpenerEventChannel()
			channel.on('item', (data) => {

					this.goodsData = data.data
					console.log(this.goodsData);
				}),
				this.compareDate()
		},
		methods: {
			//付款时间是否超时
			compareDate() {
				let date1 = new Date(Date.parse(this.goodsData.payLatestTime))
				let date2 = new Date()
				console.log(date1 < date2);
				let date3 = date1 < date2
				this.flag = date3
				return date1 > date2
			},
			// 付款
			async confirmPayment() {
				await orderPay(this.goodsData.id)
				this.$refs.uToast.show({
					type: 'success',
					message: '支付成功',
					complete() {
						uni.switchTab({
							url: '/pages/cart/cart'
						})
					}
				})

			},
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		margin-top: 100rpx;
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
</style>
