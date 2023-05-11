<template>
	<view class="">
		<!-- 导航栏组件 -->
		<navigationBar :address="true" title='Q淘' titleColor="#27bb9a"></navigationBar>

		<!-- 头部 -->
		<view class="head-info padding-sm">
			<u-tabs :list="headList" lineColor="#66bbad" :activeStyle="activeStyle" @click="changeHead"></u-tabs>
		</view>

		<!-- 点击头部显示的数据 -->
		<u-overlay :show="headShow" @click="headShow = false" opacity="0.1">
			<view class="head-data" @tap.stop>
				<view @click="headCategory(item)" class="head-data-con padding" v-for="(item,i) in headSonList"
					:key="item.id">
					<image class="" :src="item.picture" mode=""></image>
					<view class="">
						<text class="fs-16">{{item.name}}</text>
					</view>

				</view>

			</view>
		</u-overlay>
		
		<view v-if="BannerList.length === 0">
			<u-skeleton titleWidth="380" titleHeight="170"></u-skeleton>
			<view class="flex">
				<u-skeleton  v-for="(item,i) in 5" :key="i" avatarShape="square" avatarSize="60" avatar titleWidth="0"
					titleHeight="0"></u-skeleton>
			</view>
			<view class="flex">
				<u-skeleton titleWidth="150" titleHeight="150"></u-skeleton>
			</view>
		</view>
		
		<view v-else>
			
		
		<!-- 轮播图 -->
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				indicator-active-color="#69bdb0">
				<swiper-item v-for="(item,i) in BannerList" :key="item.id">
					<view>
						<image :src="item.imgUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 品牌 -->
		<view class="brands flex justify-between">
			<view @click="brandClick(item)" class="brands-img" v-for="(item,i) in brandFliter" :key="i">
				<image :src="item.picture" mode="aspectFill"></image>
				<view class="fs-12 brands-text">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<u-popup :show="brandShow" mode="center" round="50" @close="brandShow=false">
			<view class="flex align-center">
				<image class="brandImage" :src="brandDetailsList.brandImage" mode=""></image>
				<view class="brandDetails color-huise padding">
					<view class="padding-tb-sm">
						品牌:<text class="margin-right-sm">{{brandDetailsList.name}}</text>
						宣传语:<text>{{brandDetailsList.slogan}}</text>
					</view>
					<view class="">
						产地:<text class="margin-right-sm">{{brandDetailsList.productionPlace}}</text>
						英文名:<text>{{brandDetailsList.nameEn}}</text>
					</view>
				</view>
			</view>
			<view class="padding">
				<view class="brand-logo">
					<text  class="">LOGO</text>
				</view>
			</view>
		</u-popup>

		<!-- 新鲜好物 -->
		<freshAndGood :list="newList"></freshAndGood>

		<!-- 专题列表 -->
		<view>
			<view class="goods-relevant">
				<view class="header">
					<text class="icon"></text>
					<span class="title">专题列表</span>
				</view>
			</view>
			<view class="topics flex justify-between flex-wrap padding-sm">
				<view @click="handleTopic(item)" v-for="(item,i) in topicList" :key="i" class="padding-sm">
					<image :src="item.cover" mode="aspectFill"></image>
					<view class="">
						<text class="fs-26">{{item.title}}</text>
					</view>
				</view>

			</view>
		</view>
		<u-popup :show="topicShow" round="50" mode="center" @close="topicShow=false">
			<view class="topicInfo flex align-center padding-lg">
				<image :src="topicDetailList.detailsUrl" mode="aspectFill"></image>
				<view class="padding-left-sm fs-26">
					<h4 class="fs-28 margin-bottom-xs">{{topicDetailList.title}}</h4>
					<text class="fs-26 color-lvse">{{topicDetailList.viewNum}}</text>人查看
					<view class="margin-bottom-xs">
						<text class="fs-22 color-lvse">{{topicDetailList.collectNum}}</text>人收藏
					</view>
					<text class="fs-12 color-red">￥{{topicDetailList.lowestPrice}}</text>
				</view>
				<view class="topicRight">
					<u-icon @click="topicIdCollection()" :color="topicDetailList.isCollect ? 'red' : 'gray'"
						:name="topicDetailList.isCollect ? 'heart-fill' : 'heart'" size="28"></u-icon>
				</view>
			</view>
			<u-toast ref="uToast"></u-toast>
		</u-popup>

		</view>
	</view>
</template>

<script>
	import freshAndGood from './components/freshAndGood.vue'
	import {
		getHome,
		getBanner,
		getHead,
		getNew,
		getBeand,
		getBrandId,
		getTopic,
		getTopicId,
		topicCollect
	} from '../../api/home.js'
	import {
		gCategory
	} from '../../api/goods.js'
	import {
		data
	} from 'uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				// 标签选择中时的样式
				activeStyle: {
					color: '#66bbad'
				},
				// 头部数据
				headList: [],
				headSonList: [],
				headShow: false,
				// 头部导航
				headCategoryObj: {
					categoryId: '',
					sortField: '',
					sortMethod: 'desc',
					page: 1,
					pagsize: 10
				},
				// 头部导航分类数据
				headCateList: {},
				// 广告轮播图数据
				BannerList: [],
				// 新鲜好物数据
				newList: [],
				// 人气推荐数据
				hotList: [],
				// 热门品牌数据
				brandList: [],
				brandShow: false,
				brandDetailsList: [],
				// 专题列表数据
				topicList: [],
				// 专题详情数据
				topicDetailList: {},
				topicShow: false,
				topicId: '',
			};
		},

		// 页面加载时就调用
		async onLoad() {
			this.head()
			this.banner()
			this.getModulesData()
			this.topic()
		},
		methods: {
			// 获取head数据
			async head() {
				const res = await getHead()
				this.headList = res.data.result
			},
			// 点击头部显示对应数据
			changeHead(arr) {
				this.headShow = true
				this.headList.forEach((item, i) => {
					if (arr.index === i) {
						this.headSonList = item.children
						return this.headSonList
					}
				})
			},
			// 点击跳转至分类页
			async headCategory(item) {
				this.headCategoryObj.categoryId = item.id
				const res = await gCategory(this.headCategoryObj)
				this.headCateList = res.data.result
				this.headShow = false
				uni.navigateTo({
					url: '/pages/category/category',
					events: {
						// 默认排序
						default: async (data) => {
							// 监听下一个页面传递的数据
							this.headCategoryObj.sortField = data.data
							this.headCategoryObj.sortMethod = 'desc'
							const res = await gCategory(this.headCategoryObj)
							uni.$emit('default',res)
						},
						// 最新商品
						newCom: async (data) => {
							// 监听下一个页面传递的数据
							this.headCategoryObj.sortField = data.data
							this.headCategoryObj.sortMethod = 'asc'
							const res = await gCategory(this.headCategoryObj)
							uni.$emit('newCom',res)
						},
						// 最高人气
						numMax: async (data) => {
							this.headCategoryObj.sortField = data.data
							const res = await gCategory(this.headCategoryObj)
							uni.$emit('numMax',res)
						},
						// 价格排序
						priceDesc: async (data) => {
							this.headCategoryObj.sortField = data.data
							this.headCategoryObj.sortMethod = 'asc'
							const res = await gCategory(this.headCategoryObj)
							uni.$emit('priceDesc',res)
						},
						reBottom: async (data) => {
							this.headCategoryObj.sortField = data.data
							this.headCategoryObj.sortMethod = 'desc'
							const res = await gCategory(this.headCategoryObj)
							uni.$emit('reBottom',res)
						}
					},
					success: (res2) => {
						// 通过eventChannel向被打开页面传送数据
						res2.eventChannel.emit('headCate', {
							data: res.data.result
						})
						uni.$emit('update',{msg:'页面更新'})
					}
				})
				
			},
			// 获取广告轮播图数据
			async banner() {
				const res = await getBanner()
				this.BannerList = res.data.result
			},

			// 获取首页类别模块数据
			async getModulesData() {
				// 新鲜好物
				const res = await getNew(4)
				this.newList = res.data.result

				// 热门品牌
				const res3 = await getBeand()
				this.brandList = res3.data.result
				console.log(this.brandList);
				
			},
			// 品牌详情
			async brandClick(item) {
				const res = await getBrandId(item.id)
				console.log(item);
				this.brandDetailsList = res.data.result
				this.brandShow = true
			},
			// 获取专题列表
			async topic() {
				const res = await getTopic()
				this.topicList = res.data.result.items
			},
			// 点击获取当前专题详情
			handleTopic(item) {
				this.topicShow = true
				// 将当前点击的专题ID保存
				this.topicId = item.id
				this.topicdetail()
			},
			// 请求获取专题详情数据
			async topicdetail() {
				const res = await getTopicId(this.topicId)
				this.topicDetailList = res.data.result
			},
			// 点击收藏
			async topicIdCollection() {
				await topicCollect(this.topicId)
				this.topicdetail()
				if (this.topicDetailList.isCollect) {
					this.qqToast('none', '已取消')
				} else {
					this.qqToast()
				}
			},
			// 消息状态提示
			qqToast(type = 'success', message = "已收藏", duration = "1000") {
				this.$refs.uToast.show({
					type: type,
					message: message,
					duration: duration
				})
			},
		},
		components: {
			freshAndGood
		},

		computed: {
			// 筛选品牌显示数量
			brandFliter() {
				return this.brandList.filter((item, index) => {
					return index < 5
				})
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .u-skeleton__wrapper {
		margin-top: 20rpx;
		// margin-left: 30rpx;
	}

	::v-deep .u-skeleton__wrapper__avatar {
		border-radius: 50%;
		display: flex;
	}

	::v-deep .u-skeleton__wrapper__content__title {
		margin-top: 80rpx;
		border-radius: 50rpx;
	}

	page {
		margin-top: 100rpx;

	}

	.banner {
		margin-top: 230rpx;

		image {
			width: 100%;
			height: 300rpx;
		}
	}

	::v-deep .u-tabs__wrapper__nav__line {
		display: none;
	}

	.brands {
		background-color: #f5f7f9;
		padding: 20rpx;
		margin: 20rpx -10rpx 20rpx 0;
		height: 150rpx;

		.brands-img {
			image {
				border-radius: 50%;
				height: 100rpx;
				width: 100rpx;
				background-color: powderblue;
				margin-right: 10rpx;
			}

			.brands-text {
				width: 100rpx;
				text-align: center;
			}
		}
	}

	.brand-logo {
		display: flex;

		image {
			margin: auto;
			width: 200rpx;
			height: 200rpx;
		}

		text {
			margin: auto;
			font-weight: 800;
			padding: 40rpx;
			font-size: 50rpx;
			text-align: center;
		}
	}

	.brandDetails {
		height: 300rp;

	}

	.brandImage {
		// margin-bottom: -30rpx;
		border-radius: 50% 30% 20% 5%;
		width: 150rpx;
		height: 150rpx;
	}

	.head-info {
		position: fixed;
		top: 100rpx;
		left: 0;
		width: 100%;
		z-index: 1;
		background-color: #ffffff;
	}

	.head-data {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		height: 350rpx;
		background-color: #ffffff;
		position: absolute;
		left: 0;
		opacity: 0.9;

		.head-data-con {
			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}

	::v-deep .u-transition {
		margin-top: 194rpx;
	}

	// 专题列表
	.goods-relevant {
		background: #fff;

		.header {
			height: 50px;
			line-height: 50px;
			padding: 0 15px;

			.title {
				font-size: 18px;
				padding-left: 10px;
			}

			.icon {
				width: 16px;
				height: 16px;
				display: inline-block;
				border-top: 4px solid #27BA9B;
				border-right: 4px solid #27BA9B;
				box-sizing: border-box;
				position: relative;
				transform: rotate(45deg);

				&::before {
					content: "";
					width: 10px;
					height: 10px;
					position: absolute;
					left: 0;
					top: 2px;
					background: lighten(#27BA9B, 40%);
				}
			}
		}
	}

	.topics {
		view {
			image {
				width: 280rpx;
				height: 280rpx;
				border-radius: 20rpx;
			}

			view {
				width: 300rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.topicInfo {
		background-color: #ffffff;

		image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 15rpx;

		}

		view {
			h4 {
				width: 400rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-top: -40rpx;
			}
		}
	}
</style>
