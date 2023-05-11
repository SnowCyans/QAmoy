<template>
	<view class="navBg">
			<view @click="clickBack()" class="bgposition bgleft">
				<u-icon size="42rpx" color="#fff" name="arrow-left"></u-icon>
			</view>
			<view class="bgposition bgright">
				<text class="cuIcon-camera color-fff"></text>
				<text @click="changeBgImg()" class="bgtext">更换背景</text>
			</view>
	</view>
</template>

<script>
	export default {
		name: "navigation",
		props: {
		},
		data() {
			return {};
		},
		methods: {
			// 返回上一页
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 更换背景
			changeBgImg() {
				// 调用打开相册API
				uni.chooseImage({
					sourceType: ['album'],
					success: (res) => {
						this.$emit('clickImgUrl', res.tempFilePaths)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.navBg {
		position: fixed;
		z-index: 1;
		top: -60rpx;
		background: rgba(0, 0, 0, 0.01);
		width: 100%;
		height: 220rpx;
		
		// 相同代码封装
		.bgposition {
			position: absolute;
			top: 120rpx;
			width: 70rpx;
			height: 70rpx;
			background: rgba(0, 0, 0, 0.4);
			display: flex;
		}

		// 左内容
		.bgleft {
			left: 30rpx;
			border-radius: 50%;

			// 样式穿透
			::v-deep .uicon-arrow-left {
				margin: auto;
				margin-left: 14rpx;
			}
		}

		// 右内容
		.bgright {
			width: 210rpx;
			right: 30rpx;
			border-radius: 50rpx;
			display: flex;

			text {
				margin: auto;
				font-size: 40rpx;
			}

			.bgtext {
				font-size: 28rpx;
				color: #fff;
				margin: auto;
				margin-left: -20rpx;
				text-align: center;
			}
		}
	}
</style>
