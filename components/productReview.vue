<template>
	<view>
		<!--商品详情和评价 -->
		<view class="goods-tabs">
			<view class="target-info">
				<text @click="target = true" :class="{'active':target}">商品详情</text>
				<text @click="handleValue()" :class="{'active':!target}">商品评价</text>
			</view>
			<!-- 切换内容的地方 -->
			<view class="target-details" v-if="target">
				<image v-for="(item,i) in res.details.pictures" :key="i" class="target-img" :src="item"
					mode="aspectFit"></image>
			</view>

			<view class="target-value" v-else>
				<view class="padding-top padding-lr flex">
					<view class="padding-lr">
						<view class="fs-40 color-red">{{valueList.salesCount}}</view>
						<text class="fs-24 color-huise">人购买</text>
					</view>
					<view class="padding-lr">
						<view class="fs-40 color-red">{{valueList.praisePercent}}%</view>
						<text class="fs-24 color-huise">好评率</text>
					</view>
				</view>
				<view class="value-class flex justify-start flex-wrap">
					<view @click="clickVlue(-1,11)" :class="index === 11 ? 'commentActive' : ''">
						全部({{valueList.evaluateCount}})</view>
					<view @click="clickVlue(-1,22)" :class="index === 22 ? 'commentActive' : ''">
						有图({{valueList.hasPictureCount}})</view>
					<view @click="clickVlue(item,i)" :class="index === i ? 'commentActive' :''"
						v-for="(item,i) in valueList.tags" class="">{{item.title}}({{item.tagCount}})</view>
				</view>
				<!-- 评价内容 -->
				<scroll-view scroll-y="true" @scrolltolower="loadDate" class="scrollHeight">

					<view class="comment padding-tb-xs" v-for="(item,i) in comment" :key="item.id">
						<view class="padding flex align-center justify-between">
							<view class="comment-avatar flex align-center">
								<image :src="item.member.avatar" mode=""></image>
								<text>{{item.member.nickname}}</text>
							</view>
							<view class="">
								<u-rate count="5" :value="item.score" readonly></u-rate>
							</view>
						</view>
						<view class=" padding-lr-lg color-huise2">
							<view class="">
								<text class="padding-right-sm"
									v-for="(item2,i) in item.orderInfo.specs">{{item2.name}}:{{item2.nameValue}}</text>
							</view>
							<!-- 评价内容 -->
							<view class="padding-tb-xs">
								<text>{{item.content}}</text>
							</view>

							<!-- 评价图片 -->
							<view v-if="item.pictures.length !== 0" class="flex justify-between flex-wrap padding-xs">
								<image class="comment-img padding-tb-xs" :src="itemimg"
									v-for="(itemimg,i) in item.pictures" :key="i" mode=""></image>
							</view>

							<view class="flex justify-between">
								<text class="color-huise padding-tb-xs">{{item.createTime}}</text>
								<view class="flex">
									<text class="cuIcon-appreciate fs-30"></text>
									<text class="fs-28">{{item.praiseCount}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "productReview",
		props: {
			res: {
				type: Object
			}
		},
		data() {
			return {
				targetList: [],
				target: true,
				// 当前商品评论数据
				valueList: {},
				// 评价信息数据分页参数
				valuePageObj: {
					page: 1,
					pageSize: 10,
					hasPicture: false,
					tag: ''
				},
				// 评论数据
				comment: [],
				// 切花评论标签索引
				index: 11,
			};
		},
		methods: {
			// 评论 默认获取全部评论数据
			async handleValue() {
				// 获取当前商品的评论信息数据
				const res = await uni.request({
					url: `https://mock.boxuegu.com/mock/1175/goods/${this.res.id}/evaluate`
				})
				const {
					result
				} = res[1].data
				console.log(result);
				this.valueList = result
				// 默认获取全部数据
				this.getValuePage(this.valuePageObj)
				this.target = false
			},
			// 评论标签
			async clickVlue(item, i) {
				this.valuePageObj.tag = item.title
				this.valuePageObj.hasPicture = false
				// 获取全部评论
				if (i === 11) {
					this.index = 11
					this.getValuePage(this.valuePageObj)
				}
				// 获取有图片的数据
				else if (i === 22) {
					this.index = 22
					this.valuePageObj.hasPicture = true
					this.getValuePage(this.valuePageObj)
				} else if (i === 0) {
					this.index = i
					console.log('音质好');
					this.getValuePage(this.valuePageObj)
				} else if (i === 1) {
					this.index = i
					console.log('充电快');
					this.getValuePage(this.valuePageObj)
				} else if (i === 2) {
					this.index = i
					console.log('材质很软');
					this.getValuePage(this.valuePageObj)
				} else if (i === 3) {
					this.index = i
					console.log('性价比高');
					this.getValuePage(this.valuePageObj)
				}


			},
			// 获取评价内容和分页数据
			async getValuePage(data,flag) {
				
				// 如果为true代表是触底了 获取下一页数据
				if(flag){
					this.valuePageObj.page++
					const res = await uni.request({
						url: `https://mock.boxuegu.com/mock/1175/goods/${this.res.id}/evaluate/page`,
						data: data
					})
					const {
						result
					} = res[1].data
					console.log(res);
				// 如果数据不为空 就将请求来的数据合并
				if (result.length !== 0) {
					this.comment = [
						...this.comment,
						...result.items
					]
				} else { //为空就提示没用数据
					uni.showToast({
						icon: "none",
						title: "没有数据了"
					})
				}
				} else{
					const res = await uni.request({
						url: `https://mock.boxuegu.com/mock/1175/goods/${this.res.id}/evaluate/page`,
						data: data
					})
					const {
						result
					} = res[1].data
					console.log(res);
					this.comment = result.items
				}
				console.log(this.comment);
			},
			// 触底加载下一页数据
			loadDate() {
				this.getValuePage(this.valuePageObj,true)
			}
		},
	}
</script>

<style lang="scss">
	.scrollHeight {
		height: 100vh;
	}

	// 商品详情和评价
	.goods-tabs {
		background: #fff;

		.target-info {
			height: 70rpx;
			line-height: 70rpx;
			display: flex;
			border-bottom: 1px solid #f5f5f5;

			text {
				padding: 0 40rpx;
				font-size: 34rpx;
				position: relative;

				&:first-child {
					border-right: 1rpx solid #f5f5f5;
				}
			}
		}

		.active {
			&::before {
				content: "";
				position: absolute;
				left: 40rpx;
				bottom: -8rpx;
				width: 125rpx;
				height: 5rpx;
				background: #2bbc9c;
			}
		}

		.target-details {
			margin-top: 10rpx;

			.target-img {
				width: 100%;
				height: 200rpx;
				margin-bottom: -10rpx;
			}
		}

	}

	.value-class view {
		font-size: 26rpx;
		width: 170rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		margin-left: 50rpx;
		margin-top: 30rpx;
		color: #9999b0;
		background-color: #f5f5f5;
		border: 1px solid #e4e4e4;
	}

	.valueActive {
		background-color: #27ba9b;
		color: #fff;
	}

	.comment-avatar {
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
	}

	.comment-img {
		width: 150rpx;
		height: 150rpx;

	}

	.commentActive {
		background-color: #27ba9b !important;
		color: #fff !important;
	}
</style>
