<template>
	<view>
		<navigationBar title="我的收藏"></navigationBar>
		<view class="collectionInfo">
			<view class="subFixed padding">
				<u-subsection @change="change" :list="list" fontSize="14" bgColor="#ffffff" activeColor="#66bbbf"
					:current="current"></u-subsection>
			</view>
			<view v-if="collectionList.length" class="content">
				<view v-for="(item,i) in collectionList" :key="i" class="margin-top flex">
					<view @click="goodsInfo(item)" class="margin-right-sm">
						<image :src="item.picture" mode="aspectFill"></image>
					</view>
					<view>
						<h4 class="margin-bottom-sm">{{item.name}}</h4>
						<text class="color-red">￥{{item.price}}</text>
					</view>
					<view class="conicons">
						<u-icon @click="cancelCollection(item)" size="22" name="trash"></u-icon>
					</view>
				</view>
			</view>
			<u-empty v-else marginTop="200rpx" mode="favor" icon="heart">
			</u-empty>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		goodsList
	} from '../../api/goods.js'
	import {
		getCollect,
		deleteCollecction
	} from '../../api/collection.js'
	export default {
		data() {
			return {
				list: ['商品', '专题', '品牌'],
				current: 0,
				collectType: 1,
				collectionList: [],
				cancelObj: {
					ids: [],
					type: null
				}
			};
		},
		onLoad() {
			this.collect()
		},
		methods: {
			async collect() {
				const res = await getCollect(this.collectType)
				console.log(res);
				this.collectionList = res.data.result.items
			},
			// 点击对应收藏类型获取对应数据
			change(e) {
				this.current = e
				this.collectType = e + 1
				this.collect()
			},
			// 取消收藏
			async cancelCollection(item) {
				console.log(item);
				this.cancelObj.ids.push(item.id)
				this.cancelObj.type = this.current + 1
				console.log(this.cancelObj);
				await deleteCollecction(this.cancelObj)
				this.$refs.uToast.show({
					type: 'success',
					message: "取消收藏",
					duration: '1000'
				})
				this.collect()
			},
			// 点击图片跳转至商品信息页
			async goodsInfo(item) {
				const res = await goodsList(item.id)
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
	.collectionInfo {
		margin-top: 100rpx;
	}

	.subFixed {
		position: fixed;
		top: 100rpx;
		left: 0;
		width: 100%;
		z-index: 9;
		background-color: #ffffff;
	}

	.content {
		margin-top: 200rpx;
		padding: 20rpx;
		background-color: #ffffff;

		view {
			image {
				width: 280rpx;
				height: 280rpx;
				border-radius: 50rpx;
			}
		}
	}

	.conicons {
		position: relative;
		top: 0;
		right: 10rpx;
		padding: 10rpx;

		::v-deep .uicon-trash {
			position: absolute;
			right: 0;
			bottom: -200rpx;
		}
	}
</style>
