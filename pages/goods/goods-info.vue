<template>
	<view>
		<navigationBar title='商品信息' :back="true"></navigationBar>

		<view class="padding bg-fff">
			<!-- 大图 -->
			<view class="flex justify-center margin-bottom">
				<image v-for="(item,i) in newImgList" :key="i" class="gDetails-img" :src="item" mode=""></image>
			</view>
			<!-- 小图 -->
			<view class="gDetailSmall flex justify-between margin-tb-sm">
				<image :class="i === imgIndex ? 'gDcolor' : ''" :src="item"
					v-for="(item,i) in gDetailsList.mainPictures" :key="i" @click="handleImg(item,i)" mode=""></image>
			</view>
			<!-- 商品信息 -->
			<view class="">
				<h3>{{gDetailsList.name}}</h3>
				<text class="color-huise">{{gDetailsList.desc}}</text>
				<view class="padding-tb-xs">
					<text class="color-red">￥{{gDetailsList.price}}</text>
					<text class="deleteLine color-huise">￥{{gDetailsList.oldPrice}}</text>
				</view>


				<view v-for="(item,i) in gDetailsList.specs" class="">
					<view class=" flex flex-wrap align-center padding-tb-sm">
						<view class="">
							<text>{{item.name}}：</text>
						</view>
						<view v-for="(item2,i) in item.values" class="">
							<!-- 尺码 -->
							<view v-if="item2.picture === null" class="flex justify-between">
								<text @click="handleSize(i)" :class="[i === sizeIndex ?'gDcolor' : '']"
									class="chima">{{item2.name}}</text>
							</view>
							<!-- 颜色 -->
							<view v-else class="yanse">
								<image @click="handleColor(i)" class="color-img margin-lr-xs flex justify-start"
									:class="[i === colorIndex ? 'gDcolor' :'']" :src="item2.picture" mode=""></image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 数量 -->
			<view class="flex margin-tb-sm">
				<text class="color-huise margin-right-sm">数量</text>
				<u-number-box v-model="gDetailsList.commentCount" @overlimit="changeLimit" :max="gDetailsList.inventory"
					button-size="26" @change="valChange"></u-number-box>
			</view>

			<view class="flex align-center padding-lr">
				<u-icon @click="changeCollection" :color="collectionFlag ? 'red' : ''" size="22"
					:name="collectionFlag ? 'heart-fill' : 'heart'"></u-icon>
				<button @click="addCarts()" class="addCart margin-tb">加入购物车</button>
				<text @click="locationShop()" class="location-shop cuIcon-shop fs-40"> </text>
				<u-badge type="error" :value="cartNmu"></u-badge>
			</view>
		</view>
		<!-- 商品详情和评价组件 -->
		<productReview :res="res"></productReview>

		<!-- 成功消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getCollect,
		addCollect,
		deleteCollecction
	} from '../../api/collection.js'
	import {
		gRelevant
	} from '../../api/goods.js'
	import {
		cartList,
		addCart
	} from "../../api/cart.js"
	export default {
		data() {
			return {
				gDetailsList: {},
				imgIndex: 0,
				colorIndex: -1,
				sizeIndex: -1,
				//添加收藏参数
				addCollectionObj: {
					collectType: 1,
					collectObjectIds: []
				},
				// 取消收藏参数
				cancenCollectionObj: {
					ids: [],
					type: 1
				},
				// 获取收藏参数
				collectType: 1,
				// 判断是否收藏
				collectionFlag: null,
				goodsInfoId: '',
				// 猜你喜欢参数
				relevantObj: {
					id: ''
				},
				// 猜你喜欢数据
				relevantList: [],
				// 商品评价组件数据存储
				res: {},
				// 加入购物车参数
				addCatObj: {
					skuId: '',
					count: 1
				},
				cartList: []
			};
		},
		onLoad(option) {
			let channel = this.getOpenerEventChannel()
			channel.on('item', (data) => {
				console.log(data.data);
				this.res = data.data
				this.gDetailsList = data.data
				this.getRelevant()
				this.addCatObj.skuId = data.data.skus[0].id
				// 将当前商品的ID插入到添加收藏参数里
				this.addCollectionObj.collectObjectIds.push(data.data.id)
				this.cancenCollectionObj.ids.push(data.data.id)
				this.goodsInfoId = data.data.id
				this.getCart()
				this.getCollect()
			})


			// let res = JSON.parse(option.res)
			// console.log(res);
			// this.res = res
			// this.gDetailsList = res
			// this.getRelevant()
			// // skuId存到添加购物参数对象里
			// this.addCatObj.skuId = res.skus[0].id
			// this.getCart()
		},
		methods: {
			// 消息状态提示封装
			qqToast(type = 'success', msg = "已收藏", duration = "1000") {
				this.$refs.uToast.show({
					type: type,
					message: msg,
					duration: duration
				})
			},
			// 点击商品小图
			handleImg(item, i) {
				// 设置计算数据 把图片url给这个计算属性
				this.newImgList = item
				this.imgIndex = i
				console.log(item);
			},
			// 点击颜色规格
			handleColor(i) {
				this.colorIndex = i
			},
			// 点击尺码规格
			handleSize(i) {
				this.sizeIndex = i
			},
			// 数量选择
			valChange(e) {
				// this.gDetailsList.commentCount = e.value
				// console.log(this.gDetailsList.commentCount);
				this.addCatObj.count = e.value
			},
			// 选择数量达到库存提示
			changeLimit(e) {
				if (e === 'plus') {
					this.qqToast('error', '最大库存了')
				}
			},
			// 获取我的收藏
			async getCollect() {
				const res = await getCollect(this.collectType)
				let list = res.data.result.items.filter((item) => {
					return item.id === this.goodsInfoId
				})
				if (list.length) {
					this.collectionFlag = list[0].id === this.goodsInfoId
				} else {
					this.collectionFlag = false
				}

			},
			// 添加或取消收藏
			async changeCollection() {
				;
				if (this.collectionFlag) {
					console.log(this.addCollectionObj);
					await deleteCollecction(this.cancenCollectionObj)
					this.qqToast('none', '已取消')
				} else {
					await addCollect(this.addCollectionObj)
					this.qqToast()

				}
				this.getCollect()
			},


			// 添加到购物车
			async addCarts() {
				if (this.sizeIndex === -1 & this.colorIndex === -1) {
					this.qqToast('none', '请选择商品规格')
				} else {
					await addCart(this.addCatObj)
					this.getCart()
					this.qqToast('success', '添加成功')
				}

			},
			// 获取购物车数据
			async getCart() {
				const res = await cartList()
				this.cartList = res.data.result
			},
			// 跳转到购物车taBbar
			locationShop() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			// 猜你喜欢
			async getRelevant() {
				const res = await gRelevant(this.relevantObj)
				this.relevantList = res.data.result
			},
		},
		computed: {
			newImgList: {
				// 读取
				get() {
					// 过滤 只展示索引为0的图片
					return this.gDetailsList.mainPictures.filter((item, i) => {
						return i === 0
					})
				},
				// 设置 点击小图将图片url传过来 然后设置
				set(v) {
					this.newImgList[0] = v
				}
			},

			// 购物车商品数量
			cartNmu() {
				return this.cartList.reduce((total, item) => total += item.count, 0)
			}

		}
	}
</script>

<style lang="scss">
	page {
		margin-top: 100rpx;
		background-color: #f5f5f5;
	}

	.location-shop {
		margin-right: -10rpx;
		margin-top: 15rpx;
	}

	.gDetails-img {
		width: 100%;
		height: 550rpx;
	}

	.gDetailSmall {
		image {
			width: 120rpx;
			height: 120rpx;
		}
	}

	.deleteLine {
		text-decoration: line-through;
	}

	.color-img {
		border: 1px solid #dee1e6;
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 20rpx;
	}

	.chima {
		// display: block;
		// height: 40rpx;
		padding: 10rpx;
		margin-bottom: 15rpx;
		margin-right: 15rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1rpx solid #dee1e6;
	}

	.gDcolor {
		border: 5rpx solid #27ba9b;
	}

	.addCart {
		width: 400rpx;
		border-radius: 30rpx;
		background-color: #27ba9b;
		color: #fff;
		font-size: 30rpx;
	}
</style>
