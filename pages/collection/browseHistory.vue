<template>
	<view>
		<navigationBar title="我的足迹"></navigationBar>
		<view v-if="historyList.length">
			<view @click="empty()" class="history-info padding">
				<text>清空</text>
			</view>
			<view class="">
				<u-skeleton :loading="loading" avatarShape="square" avatarSize="150" avatar titleWidth="150"
					titleHeight="150"></u-skeleton>
			</view>

			<view class=" flex justify-between flex-wrap">
				<view class="padding" v-for="(item,i) in historyList" :key="i">
					<image @click="goodsInfo(item)" :src="item.spu.picture" mode="aspectFill"></image>
					<view class="flex justify-between padding-xs">
						<text class="color-red fs-34">￥{{item.spu.price}}</text>
						<u-icon @click="deleteHistory(item)" size="24" name="trash"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-empty v-else marginTop="300rpx" mode="history" icon="http://cdn.uviewui.com/uview/empty/history.png">
		</u-empty>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {goodsList} from '../../api/goods.js'
	import {
		getBrowseHistory,
		deleteBrowseHistory
	} from '../../api/collection.js'
	export default {
		data() {
			return {
				loading: true,
				historyList: []
			};
		},
		onLoad() {
			this.getHistory()
		},
		methods: {
			// 获取我的足迹
			async getHistory() {
				const res = await getBrowseHistory()
				console.log(res);
				this.historyList = res.data.result.items
				this.loading = false
			},
			// 删除我的足迹
			async deleteHistory(item) {
				let ids = []
				ids.push(item.spu.id)
				await deleteBrowseHistory(ids)
				this.$refs.uToast.show({
					type: 'success',
					message: '删除成功',
					duration:'1000'
				})
				this.getHistory()
			},
			async empty() {
				let ids = []
				this.historyList.forEach((item) => {
					ids.push(item.spu.id)
				})
				await deleteBrowseHistory(ids)
				this.$refs.uToast.show({
					type: 'success',
					message: '删除成功',
					duration:'1000'
				})
				this.getHistory()
			},
			// 点击图片跳转至商品信息页
			async goodsInfo(item){
				const res = await goodsList(item.spu.id)
				uni.navigateTo({
					url:'/pages/goods/goods-info',
					success :(res2) => {
						res2.eventChannel.emit('item',{data:res.data.result})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .u-skeleton__wrapper {
		margin-top: 50rpx;
		margin-left: 30rpx;
	}

	::v-deep .u-skeleton__wrapper__avatar {
		border-radius: 50rpx;
	}

	::v-deep .u-skeleton__wrapper__content__title {
		margin-left: 70rpx;
		border-radius: 50rpx;
	}

	.history-info {
		width: 100%;
		margin-top: 100rpx;
		font-size: 30rpx;

		text {
			margin-left: 530rpx;
			background-color: #66bbad;
			display: block;
			width: 150rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 50rpx;
			text-align: center;
		}
	}

	image {
		width: 300rpx;
		height: 300rpx;
		border-radius: 20rpx;
	}

	view {
		text {
			line-height: 60rpx;
		}
	}
</style>
