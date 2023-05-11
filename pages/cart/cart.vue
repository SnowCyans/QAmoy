<template>
	<view class="">

		<!-- 标题 -->
		<view class="top-cart">
			<view class="flex justify-between align-center padding-lg">
				<view class="">
					<text class="fs-40 text-bold padding-right">购物车</text>
				</view>
				<view class="">
					<text @click="changeSR()">{{isAdmin ? '管理' : '返回'}}</text>
				</view>
			</view>
		</view>


		<view class="">
			<!-- 购物车有数据显示 -->
			<view v-if="cartData.length" class="padding">
				<view class="content padding">
					<view class="send padding-bottom flex justify-between">
						<view class="">
							<u-icon name="car-fill" color="#66bbad" size="28"></u-icon>
						</view>
						<view @click="jumpAddress()">
							<text
								class="color-huise">{{addressData === undefined ? '请添加默认地址' : addressData.address}}</text>
							<text class="cuIcon-right color-huise"></text>
						</view>
					</view>


					<!-- 商品 -->
					<view class="gCart-info">
						<view v-for="(item,i) in cartData" :key="item.skuId"
							class=" flex align-center justify-between margin-bottom">
							<view class="flex align-center">
								<radio @click="isChoice(item)" class="margin-right-xs" :checked="item.selected"
									color="#66bbad">
								</radio>
								<!-- 	<checkbox @click="isChoice(item)" class="margin-right-xs" :checked="item.selected" color="#66bbad"></checkbox> -->
								<image :src="item.picture" mode="" class="poster margin-lr"></image>
							</view>

							<view class="gCartName">
								<text class="">{{item.name}}</text>
								<view class="margin-tb-xs flex flex-direction fs-26">
									<text class="fs-16 color-huise">{{item.attrsText}}</text>
									<text>单价：￥<text class="color-red">{{item.price}}</text></text>
									<text>总价：￥<text
											class="color-red">{{(item.price * item.count).toFixed(2)}}</text></text>
								</view>
								<view class="padding-top-sm">
									<u-number-box @change="valChange" :max="item.stock" :name="item.skuId"
										button-size="20" v-model="item.count">
									</u-number-box>
								</view>
							</view>
						</view>
					</view>



				</view>
			</view>

			<!-- 购物车为空显示 -->
			<u-empty v-else marginTop="300rpx" mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>

			<!-- 结算 -->
			<view class="tPrice padding-xs flex justify-around align-center">
				<view class="">
					<radio @click="changeSelect()" :checked="isSelectAll" class="margin-right-xs" color="#66bbad">
					</radio>
					<text class="color-huise">全选</text>
				</view>
				<view class="">
					<text>已选:<text class="color-red padding-right-xs">{{cartNumber}}</text>件</text>
					<text class="padding-left-sm">合计:</text>
					<text class="color-red">￥{{(totalPrice.toFixed(2))}}</text>
				</view>

				<view v-if="isAdmin">
					<u-button @click="settlementCart()" type="default" color="#66bbad" shape="circle" text="结算">
					</u-button>
				</view>
				<view v-else class="flex">
					<u-button @click="handleEmpty()" type="default" color="#e53d30" shape="circle" text="清空">
					</u-button>
					<u-button @click="removeCart()" type="default" color="#3eaf7c" shape="circle" text="删除">
					</u-button>
				</view>
			</view>
		</view>

		<!-- 删除成功提示 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="emptyShow" title="确定清空购物车吗？" :showCancelButton="true" confirmColor="#66bbad"
			cancelColor="#ca64ea" @confirm="emptyCart()" @cancel="emptyShow=false"></u-modal>
	</view>
</template>

<script>
	import {
		getAddress
	} from '../../api/address.js'
	import {
		mapState
	} from 'vuex'
	import {
		cartList,
		selectCart,
		updataCart,
		removeCart
	} from '../../api/cart.js'
	import {
		generateOrder
	} from '../../api/order.js'
	export default {
		data() {
			return {
				cartData: [],
				// 存放默认地址
				addressData: {},
				addressStr: '',
				// 清空确定提示
				emptyShow: false,
				// true为管理 false为返回
				isAdmin: true,
				// 修改商品参数
				removeSkuId: {
					ids: [],
					clearAll: false,
					clearInvalid: false
				},
				collectObj: {
					page: 1,
					pageSize: 10,
					collectType: 2
				},
			};
		},
		// 页面一加载就获取数据
		async onLoad() {
			this.getCart()
			this.address()
		},
		// 进入页面获取数据
		onShow() {
			this.getCart()
			this.address()
		},
		methods: {
			// 获取购物车数据
			async getCart() {
				const res = await cartList()
				console.log(res);
				this.cartData = res.data.result
			},
			// 获取默认地址
			async address() {
				const res = await getAddress()
				let filterList = res.data.result.filter((item) => {
					return item.isDefault === 0
				})
				this.addressData = filterList[0]
			},
			// 管理或返回
			changeSR() {
				if (this.isAdmin) {
					this.isAdmin = false
				} else {
					this.isAdmin = true
				}
			},

			// 跳转至地址页
			jumpAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
				// console.log(this.addressData);
			},

			// 选择数量
			valChange(e) {
				console.log(e);
				let datas = {}
				datas.skuId = e.name
				datas.count = e.value
				this.putCart(datas)
			},
			// 当前商品是否选中
			isChoice(item) {
				let {
					skuId,
					selected
				} = item
				if (selected) {
					selected = false
				} else {
					selected = true
				}
				let obj = {
					skuId,
					selected
				}
				this.putCart(obj)
			},
			// 修改商品接口
			async putCart(data) {
				await updataCart(data)
				this.getCart()
			},
			// 全选/取消全选
			async changeSelect() {
				let datas = {
					ids: [],
					selected: this.isSelectAll
				}
				this.cartData.forEach((item) => {
					datas.ids.push(item.skuId)
				})
				if (this.isSelectAll) {
					datas.selected = false
					console.log(datas);
					await selectCart(datas)
				} else {
					datas.selected = true
					await selectCart(datas)
				}
				this.getCart()


			},
			// 结算
			async settlementCart() {
				if (this.cartData.length !== 0) {
					if (this.addressData === undefined) {
						uni.showToast({
							icon: 'none',
							title: '请添加默认地址'
						})
					} else {
						const res = await generateOrder()
						uni.navigateTo({
							url: '/pages/order/submitOrder',
							success: (res1) => {
								res1.eventChannel.emit('item', {
									data: res.data.result
								})
							}
						})
					}
				} else{
					uni.showToast({
						icon:'none',
						title:'请添加商品'
					})
				}
			},
			// 删除
			async removeCart() {
				if (this.cartData.length !== 0) {
					this.cartData.filter((item) => item.selected).forEach((item) => {
						this.removeSkuId.ids.push(item.skuId)
					})
					await removeCart(this.removeSkuId)
					this.getCart()
					this.tips('删除')
				} else {
					this.tips('购物车没有商品', true)
				}
			},
			handleEmpty() {
				if (this.cartData.length !== 0) {
					this.emptyShow = true
				} else {
					this.tips('购物车没有商品', true)
				}
			},
			// 清空购物车
			async emptyCart() {
				this.emptyShow = false
				this.cartData.forEach((item) => {
					this.removeSkuId.ids.push(item.skuId)
				})
				await removeCart(this.removeSkuId)
				this.getCart()
				this.tips('购物车已清空')

			},
			// 操作成功提示
			tips(text, flag) {
				if (flag) {
					this.$refs.uToast.show({
						type: 'error',
						message: text,
					})
				} else {
					this.$refs.uToast.show({
						type: 'success',
						message: text,
					})
				}
			}
		},
		computed: {
			...mapState('cart', ['sCartList']),
			// 是否全选
			isSelectAll() {
				return this.cartData.every((item) => item.selected)
			},
			// 已选多少件
			cartNumber() {
				return this.cartData.filter((item) => item.selected).reduce((total, item) => total += item.count, 0)
			},
			// 选择的商品总价格
			totalPrice() {
				return this.cartData.filter((item) => item.selected).reduce((total, item) => total += item.count * item
					.price, 0)
			},
			// 购物车里的总商品数量
			gNumber() {
				return this.cartData.reduce((total, item) => total += item.count, 0)
			}

		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f3f4;
	}

	.top-cart {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
		background-color: #f1f3f4;
	}

	.content {
		margin-top: 120rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		height: 100%;
	}

	.send {
		image {
			width: 50rpx;
			height: 50rpx;
		}

	}

	.gCart-info {
		margin-bottom: 100rpx;

		.gCartName {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.poster {
			width: 200rpx;
			height: 200rpx;
		}
	}



	.tPrice {
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		position: fixed;
		left: 0;
		bottom: 100rpx;

	}
</style>
