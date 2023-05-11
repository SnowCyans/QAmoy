<template>
	<view>
		<navigationBar title="新鲜好物"></navigationBar>

		<view class="padding-sm">
			<view @click="goodsDetails(item.id)" v-for="(item,i) in newList" :key="i" class="topicInfo flex padding-sm">
				<image :src="item.picture" mode="aspectFill"></image>
				<view class="padding-left-sm fs-26">
					<h4 class="fs-28 margin-bottom-xs">{{item.name}}</h4>
					<view class="color-huise2">
						<text class="fs-26">{{item.desc}}</text>
					</view>
					<view class="margin-tb-xs color-huise2">
						<text class="fs-26">订单数{{item.orderNum}}</text>
					</view>
					<text class="fs-26 color-red">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000rpx"></u-back-top>
	</view>
</template>

<script>
	import {
		getNew
	} from '../../api/home.js'
	import {
		goodsList
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				limit: 10,
				newList: [],
				scrollTop: 0,
			};
		},
		onLoad() {
			this.goodsNew()
		},
		async onReachBottom() {
			this.limit += 10
			this.goodsNew()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			async goodsNew() {
				const res = await getNew(this.limit)
				console.log(res);
				// 如果请求回来的数据不为空
				if (res.data.result.length) {
					// 将请求回来的数据与之前的数据合并
					this.newList = [
						...res.data.result,
						...this.newList
					]
					// 数据加载完关闭下拉刷新函数
					uni.stopPullDownRefresh()
				} else {
					uni.showToast({
						icon: 'none',
						title: '没有更多了'
					})
				}
			},
			// 跳转至当前商品信息页
			async goodsDetails(id) {
				const res = await goodsList(id)
				console.log(res);
				uni.navigateTo({
					url: '/pages/goods/goods-info',
					success: (res2) => {
						res2.eventChannel.emit('item', {
							data: res.data.result
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		margin-top: 100rpx;
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
			}
		}
	}
</style>
