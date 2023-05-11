<template>
	<view>
		<!-- 导航栏 -->
		<navigationBar title='全部分类'></navigationBar>

		<view class="loadings">
			<u-loading-icon text="跳转中" mode="semicircle" color="black" textColor="black" :vertical="true"
				:show="loadingShow"></u-loading-icon>
		</view>

		<view v-if="categoryList.length !== 0" class="padding">
			<!-- 内容 -->
			<view class="category-info">

				<!-- 排序方式 -->
				<view class="flex justify-between">
					<view @click="handleSort(item.index)" v-for="item in sortObj" :key="item.index" class="sort">
						<view :class="[sortIndex === item.index ? 'active' : '']">
							{{item.name}}
						</view>

					</view>
					<view @click="priceSort()" class="sort">
						<view class="flex sort-s">
							<text>价格排序</text>
							<h3 class="sort-h3"></h3>
							<text class="triangles lower-triangle"
								:class="[priceSortIndex === 1 ? 'tsActiveOne' : '']"></text>
							<text class="triangles upper-triangle "
								:class="[priceSortIndex === 2 ? 'tsActiveTwo' : '']"></text>
						</view>
					</view>
				</view>

				<!-- 商品 -->
				<view class="category-g flex justify-between flex-wrap padding-xs">
					<view @click="catedetails(item)" class="padding-tb" v-for="(item,i) in categoryList" :key="item.id">
						<image :src="item.picture" mode=""></image>
						<view class="category-text">
							<h4 class="g-text">{{item.name}}</h4>
							<h6 class="g-text padding-tb-xs color-huise">{{item.desc}}</h6>
							<view class="">
								<text class="color-red">￥{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>


		<!-- 数据为空显示 -->
		<u-empty v-else mode="data" icon="data" marginTop="150">
		</u-empty>

	</view>
</template>

<script>
	import {
		goodsList
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				loadingShow: false,
				sortObj: [{
						name: '默认排序',
						index: 1
					},
					{
						name: '最新商品',
						index: 2
					},
					{
						name: '最高人气',
						index: 3
					},
				],
				sortIndex: 1,
				priceSortIndex: -1,
				categoryList: [],

			};
		},
		onLoad() {
			let channel = this.getOpenerEventChannel()
			// 监听res事件并获取数据
			channel.on('headCate', (data) => {
				this.categoryList = data.data.items
			})
		},
		onShow() {
			// 页面通讯
			uni.$on('numMax', (data) => {
				console.log(data.data.result.items);
				this.categoryList = data.data.result.items
			})
			uni.$on('default', (data) => {
				console.log(data.data.result.items);
				this.categoryList = data.data.result.items
			})
			uni.$on('newCom', (data) => {
				console.log(data.data.result.items);
				this.categoryList = data.data.result.items
			})
			uni.$on('priceDesc', (data) => {
				console.log(data.data.result.items);
				this.categoryList = data.data.result.items
			})
			uni.$on('reBottom', (data) => {
				console.log(data.data.result.items);
				this.categoryList = data.data.result.items
			})
		},
		onUnload() {
			uni.$off('numMax')
			uni.$off('default')
			uni.$off('newCom')
			uni.$off('priceDesc')
			uni.$off('reBottom')
		},

		methods: {
			handleSort(index) {
				this.priceSortIndex = -1
				let channel = this.getOpenerEventChannel()
				this.sortIndex = index
				if (index === 1) {
					console.log(1);
					channel.emit('default', {
						data: 'publishTime'
					})
				} else if (index === 2) {
					// 向上一页面传递数据
					channel.emit('newCom', {
						data: 'publishTime'
					})
				} else if (index === 3) {
					channel.emit('numMax', {
						data: 'orderNum'
					})
				}
			},
			priceSort() {
				let channel = this.getOpenerEventChannel()
				this.sortIndex = -1
				if (this.priceSortIndex === -1 || this.priceSortIndex === 2) {
					this.priceSortIndex = 1
					channel.emit('priceDesc', {
						data: 'price'
					})
				} else if (this.priceSortIndex === 1) {
					this.priceSortIndex = 2
					channel.emit('reBottom', {
						data: 'price'
					})
				}
			},
			async catedetails(item) {
				this.loadingShow = true
				const res = await goodsList(item.id)
				if (JSON.stringify(res.data.result) !== '{}') {
					this.loadingShow = false
					console.log(JSON.stringify(res.data.result) === '{}');
					uni.navigateTo({
						url: "/pages/goods/goods-info",
						success: (res2) => {
							res2.eventChannel.emit('item', {
								data: res.data.result
							})
						}
					})
				}

			}

		},
	}
</script>

<style lang="scss">
	.loadings {
		position: absolute;
		top: 580rpx;
		left: 330rpx;
	}

	// 排序方式
	.category-info {
		margin-top: 100rpx;
		width: 100%;
		border: 0;

		.sort {
			margin-top: 20rpx;

			view {
				// position: relative;
				border: 1rpx solid #999999;
				padding: 15rpx;
				border-radius: 10rpx;
				color: #999999;
			}
		}
	}

	// 商品
	.category-g {
		margin-top: 20rpx;
		text-align: center;

		image {
			width: 180rpx;
			height: 180rpx;
			margin-bottom: 30rpx;
			border-radius: 10rpx;
		}

		.category-text {
			width: 150rpx;

			.g-text {
				width: 180rpx;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap; // 默认不换行；
			}

		}
	}

	// 切换样式
	.active {
		background-color: #27ba9b;
		color: #ffffff !important;
	}

	.sort-s {
		position: relative;
	}

	.triangles {
		position: absolute;
		width: 0px;
		height: 0px;
		border: 14rpx solid transparent;
	}


	// 下
	.lower-triangle {
		top: 38rpx;
		left: 130rpx;
		border-top-color: #bbbbbb;
		//lightseagreen
		margin-left: 3rpx;
	}

	// priceSort被选择样式
	.tsActiveOne {
		border-top-color: #27ba9b !important;
	}

	.tsActiveTwo {
		border-bottom-color: #27ba9b !important;
	}

	// 上
	.upper-triangle {
		top: 7rpx;
		left: 130rpx;
		border-bottom-color: #bbbbbb;
		margin-left: 3rpx;
	}

	.sort-h3 {
		width: 25rpx;

	}
</style>