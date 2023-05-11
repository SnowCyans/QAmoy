<template>
	<view>
		<!-- 导航栏组件 -->
		<navigation @clickImgUrl='clickImgUrl'></navigation>
		
		<!-- 背景图片 -->
		<view @click="previewBgImg()" class="bgimgUrl">
			<image :src="bgImg.toString()" mode="aspectFill"></image>
		</view>
		<!-- 内容 -->
		<view class="content">
			<!-- 上部分 -->
			<view class="conTop">
				<!-- 头像 -->
				<view class="avatar">
					<image class="" :src="avatar" mode="aspectFill"></image>
				</view>
				<view @click="putAvatar()" class="mask">
					<text class="cuIcon-cameraaddfill color-fff"></text>
				</view>
				<view class="progress">
					<view></view>
					<text>资料完成度<text class="color-lvse">100%</text></text>
				</view>
				<view @click="putAvatar()" class="editAvatar">
					点击更换头像
				</view>
			</view>

			<!-- 表单 -->
			<view class="padding-lg">
				<u--form :rules="rules" labelPosition="left" :model="userInfoObj" ref="uForm">
					<u-form-item required labelWidth="150rpx" label="昵称" prop="nickname">
						<u--input v-model="userInfoObj.nickname" placeholder="请填写昵称" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="150rpx" label="性别" prop="gender" @click="sexShow = true">
						<u--input readonly v-model="userInfoObj.gender" placeholder="请选择性别" border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>

					<u-form-item labelWidth="150rpx" label="生日" prop="birthday" @click="dateShow = true">
						<u--input readonly :value="userInfoObj.birthday | moment" placeholder="请选择生日" border="none">
						</u--input>

						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>

					<u-form-item labelWidth="150rpx" label="职业" prop="profession" @click="workShow = true">
						<u--input readonly v-model="userInfoObj.profession" placeholder="请选择职业" border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<view class="flex justify-around padding-tb-lg margin-tb-lg">
						<button @click="confirmEdit()" class="btn2 cu-btn bg-qita color-fff lg">修改</button>
					</view>
				</u--form>
			</view>

		</view>

		<!-- 选择器 -->
		<u-picker :show="sexShow" v-model="userInfoObj.gender" :immediateChange="true" :showToolbar="false"
			:columns="sexColumns" @close="sexShow = false" :closeOnClickOverlay="true" itemHeight="50"
			@change="sexChange"></u-picker>
		<u-picker :show="workShow" v-model="userInfoObj.profession" :immediateChange="true" :showToolbar="false"
			:columns="workColumns" @close="workShow = false" :closeOnClickOverlay="true" itemHeight="50"
			@change="workChange"></u-picker>
		<u-datetime-picker @change="birthdayChange" :show="dateShow" v-model="userInfoObj.birthday" :showToolbar="false"
			@close="dateShow = false" :closeOnClickOverlay="true" mode="date">
		</u-datetime-picker>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import navigation from './components/navigation.vue'
	import {
		columns1
	} from '../../utils/occupation.js'
	import moment from 'moment'
	import {
		editUserInfo
	} from '../../api/user.js'
	export default {
		data() {
			return {
				bgImg: ['../../static/img/yc.jpg'],
				avatar:'../../static/img/xishi1.jpg',
				rules: {
					'nickname': [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}]
				},
				// 用户信息参数
				userInfoObj: {},
				sexShow: false,
				dateShow: false,
				workShow: false,
				sexColumns: [
					['男', '女', '未知']
				],
				workColumns: columns1
			};
		},
		onLoad() {
			let channel = this.getOpenerEventChannel()
			channel.on('item', (data) => {
				console.log(data);
				this.userInfoObj = data.data
			})
		},
		methods: {
			// 修改背景
			clickImgUrl(e) {
				console.log(e);
				this.bgImg = e.toString()
			},
			// 预览背景图
			previewBgImg() {
				// 如果这个参数为String类型就将他转为数组
				if (typeof(this.bgImg) === 'string') {
					this.bgImg = this.bgImg.split()
				}
				// 获取图片路径是一个数组
				uni.previewImage({
					current: 0,
					urls: this.bgImg,
					longPressActions: {
						itemList: ['保存图片'],
						success: (res) => {
							console.log(res);
							let imgurl = this.bgImg.toString()
							this.saveImage(imgurl)
						}
					}
				})
			},
			// 保存背景图到手机
			saveImage(imgurl) {
				uni.downloadFile({
					url: imgurl,
					success: (res) => {
						console.log(res);
						let url = res.tempFilePath
						uni.saveImageToPhotosAlbum({
							filePath: url,
							success: () => {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								})
							},
							fail: (err) => {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			// 选择性别
			sexChange(e) {
				this.userInfoObj.gender = e.value.toString()
			},
			//选择生日
			birthdayChange(e) {
				this.userInfoObj.birthday = moment(e.value).format('YYYY-MM-DD')
				console.log(this.userInfoObj.birthday);
			},
			// 选择职业
			workChange(e) {
				this.userInfoObj.profession = e.value.toString()
			},
			// 修改个人信息
			async confirmEdit() {
				this.$refs.uForm.validate().then(async res => {
					await editUserInfo(this.userInfoObj)
					this.$refs.uToast.show({
						message: '修改成功',
						type: 'success',
						complete: () => {
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			putAvatar() {
				// 调用打开相册API
				uni.chooseImage({
					sourceType: ['album'],
					success: async (res) => {
						let q = res.tempFilePaths.toString()
						this.avatar = q
					}
				})
			}
		},
		components:{navigation}
	}
</script>

<style lang="scss">
	// 背景
	.bgimgUrl {
		image {
			margin-top: -80rpx;
			width: 100%;
			height: 450rpx;
		}
	}

	// 内容
	.content {
		position: absolute;
		width: 100%;
		height: 1035rpx;
		background-color: #151724;
		border-radius: 8% 8% 0 0;
		margin-top: -80rpx;

		// 上部分
		.conTop {
			margin-bottom: 100rpx;

			// 头像
			.avatar {
				image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 50%;
					border: 6rpx solid black;
					position: absolute;
					top: -50rpx;
					right: 40%;
				}
			}

			// 遮罩层
			.mask {
				width: 170rpx;
				height: 170rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.4);
				position: absolute;
				top: -50rpx;
				right: 40%;
				display: flex;

				text {
					margin: auto;
				}
			}

			// 资料完成度
			.progress {
				background-color: #1c1e2b;
				position: absolute;
				top: 20rpx;
				right: 40rpx;
				padding: 20rpx;
				border-radius: 20rpx;
				text-align: center;

				view {
					width: 190rpx;
					height: 20rpx;
					border-radius: 20rpx;
					background: linear-gradient(90deg, #f646e5, #897dfb);

				}

				text {
					color: #fff;
					font-size: 22rpx;
				}
			}

			.editAvatar {
				position: absolute;
				top: 130rpx;
				right: 40%;
				color: #f8ce2a;
			}
		}
	}

	::v-deep .u-form {
		margin-top: 80rpx;
	}

	::v-deep .u-form-item__body {
		padding: 40rpx;
	}

	::v-deep .uni-input-input {
		color: #fff;
	}

	::v-deep .u-form-item__body__left__content__label {
		color: #838793;
	}
</style>
