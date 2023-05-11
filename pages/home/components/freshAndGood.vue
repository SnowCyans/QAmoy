<template>
	<view class="padding-sm">
		<view class="loadings">
			<u-loading-icon text="跳转中" mode="semicircle" color="black" textColor="black" :vertical="true" :show="loadingShow"></u-loading-icon>
		</view>
		<view class="goods-relevant flex align-center justify-between">
			<view class="header">
				<text class="icon"></text>
				<span v-if="similar" class="title">猜你喜欢</span>
				<span v-else class="title">新鲜好物</span>
			</view>
			<view @click="jumpgNew()" class="flex color-huise">
				<text>查看更多</text>
				<u-icon name="arrow-right" color="#9f9e9e"></u-icon>
			</view>
		</view>
		<view @click="goodsDetails(item.id)" v-for="(item,i) in list" :key="i" class="topicInfo flex padding-sm">
			<image :src="item.picture" mode="aspectFill"></image>
			<view class="padding-left-sm fs-26">
				<h4 class="fs-28 margin-bottom-xs">{{item.name}}</h4>
				<view class="margin-tb-xs color-huise2">
					<text class="fs-22">{{item.desc}}</text>
				</view>
				<view class="margin-tb-xs color-huise2">
					<text class="fs-26">订单数{{item.orderNum}}</text>
				</view>
				<text class="fs-12 color-red">￥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {goodsList} from '../../../api/goods.js'
	export default {
		props: {
			list: {
				type: Array,
				required: true
			},
			similar: {
				type: Boolean,
				default: false
			}
		},
		name: "freshAndGood",
		data() {
			return {
				loadingShow:false,
				newList:[]
			};
		},
		methods: {
			//跳转至新鲜好物页 
			jumpgNew(){
				uni.navigateTo({
					url:'/pages/goods/goodsNew'
				})
			},
			// 跳转至当前商品信息页
			async goodsDetails(id) {
				this.loadingShow = true
				const res = await goodsList(id)
				console.log(res);
				this.newList = res.data.result
				if(this.newList.length) {
					this.loadingShow = false
				} 
				console.log(this.newList);
				uni.navigateTo({
					url: '/pages/goods/goods-info',
					success: (res2) => {
						res2.eventChannel.emit('item', {
							data: res.data.result
						})
					}
				})
				this.loadingShow = false
			}
		}
	}
</script>

<style lang="scss">
	.loadings{
		position: absolute;
		top: 500rpx;
		left: 300rpx;
	}
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
