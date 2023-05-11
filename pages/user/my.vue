<template>
	<view>
		<!-- 登录显示 -->
		<view v-if="token !== ''">
			<view class="contain">
				<image @click="previewImg()" :src="bgImg.toString()" mode="aspectFill"></image>
				<view class="avatar flex justify-between">
					<view class="text-center padding flex align-center">
						<image @click="editUserInfo()" :src="avatar" mode="aspectFill"></image>
						<view class="fs-34 margin-left text-center text-bold color-fff">
							{{userInfoObj.nickname}}
							<text @click="accountShow=true"
								class="xiala margin-left-xs color-fff cuIcon-triangledownfill"></text>
							<!-- 切换账号弹出窗口 -->
							<u-popup :show="accountShow" @close="accountShow = false">
								<view class="popup-info">
									<view class="accountActive padding flex justify-between align-center">
										<view class="flex align-center">
											<image :src="avatar" mode="aspectFill"></image>
											<view class="padding-left-sm">
												<text class="color-fff">{{userInfoObj.nickname}}</text>
												<view class="text-left">
													<text class="fs-26 color-huise">待收货0收藏0</text>
												</view>
											</view>
										</view>
										<radio color="red" checked="true" />
									</view>
									<view @click="addAccount()" class="padding text-left flex align-center">
										<view class="accountAdd  margin-right">
											<text class=" cuIcon-add color-huise"></text>
										</view>
										<text class="color-fff fs-30">添加或切换账号</text>
									</view>
								</view>
							</u-popup>

							<view class="fs-20 text-left color-huise2">
								职业:{{userInfoObj.profession}}
							</view>
						</view>
					</view>
				</view>

				<view class="fun flex padding">
					<view class="padding-right-sm margin-right">
						<u-icon @click="kefu()" size="45rpx" color="#fff" name="kefu-ermai"></u-icon>
					</view>

					<view @click="settingShow = true">
						<u-icon size="45rpx" color="#fff" name="setting"></u-icon>
					</view>

				</view>
				<u-popup bgColor="black" :round="10" mode="center" :show="settingShow" @close="settingShow = false">
					<view class="setting padding flex">
						<view @click="changeBgImg()" class="margin-right padding-sm">
							<text>更换背景</text>
						</view>
						<view @click="editUserInfo()" class="padding-sm">
							<text>修改信息</text>
						</view>
					</view>
				</u-popup>
			</view>

			<view class="content">
				<view class="padding-xl">
					<!-- 收藏 收货地址 我的足迹-->
					<view class="fillet padding-bottom bg-huise margin-bottom">
						<u-grid :border="false">
							<u-grid-item @click="clickCollection(item)" v-for="(item,i) in baseList" :key="i">
								<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" color="#66bbad"
									:size="22">
								</u-icon>
								<text class="fs-26">{{item.title}}</text>
							</u-grid-item>
						</u-grid>
					</view>

					<!-- 宫格 -->
					<view class="fillet grids bg-huise">
						<u-grid :border="false">
							<u-grid-item @click="clickMyorder(i)" v-for="(item,i) in orderList" :key="i">
								<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.name" color="#66bbad"
									:size="22">
								</u-icon>
								<text class="fs-26">{{item.title}}</text>
							</u-grid-item>
						</u-grid>
					</view>
				</view>

				<view class="padding btn-info">
					<u-button @click="loginOut()" text="退出登录" :plain="true" shape="circle" color="#66bbad"
						:hairline="true">
					</u-button>
				</view>
			</view>
		</view>


		<!-- 未登录显示 -->
		<view v-else>
			<u-empty mode="permission" icon="http://cdn.uviewui.com/uview/empty/permission.png">
			</u-empty>
		</view>
		<!-- 退出登录提示 -->
		<u-modal @confirm="logOutConfirm" @cancel="logOutShow = false" :show="logOutShow" :showCancelButton="true"
			cancelColor="#fed68a" confirmColor='#66bbad' title="退出登录" content='确定退出吗？'></u-modal>
		<!-- 如果没登录 提示去登录 -->
		<u-modal @confirm="loginConfirm" @cancel="loginCancel" :show="loginShow" :showCancelButton="true"
			cancelText='返回首页' confirmText="去登录" cancelColor="#fed68a" confirmColor='#66bbad' title="请先登录"
			content='去登录？'></u-modal>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '../../api/user.js'
	import {
		mapState
	} from 'vuex'
	import {
		getStorage
	} from "../../utils/persistence.js"
	import {
		baseList,
		orderList
	} from '../../utils/occupation.js'
	export default {
		data() {
			return {
				bgImg: ['../../static/img/xishi2.png'],
				avatar:'../../static/img/xishi1.jpg',
				userInfoObj: {},
				accountShow: false,
				settingShow: false,
				logOutShow: false,
				loginShow: false,
				baseList: baseList,
				orderList: orderList,
			};
		},
		onLoad() {
			// 页面加载时获取token并判断是否存在
			// 不存在即未登录 提示去登录
			let token = this.$store.state.user.token
			if (token === '') {
				this.loginShow = true
			}
			this.getUserInfo()
		},
		methods: {
			// 用户信息
			async getUserInfo() {
				const res = await getUserInfo()
				this.userInfoObj = res.data.result
				console.log(this.userInfoObj);
			},
			// 更换资料卡
			changeBgImg() {
				// 调用打开相册API
				uni.chooseImage({
					sourceType: ['album'],
					success: (res) => {
						this.bgImg = res.tempFilePaths.toString()
						this.settingShow = false
					}
				})
			},
			// 编辑用户信息
			editUserInfo() {
				this.settingShow = false
				uni.navigateTo({
					url: '/pages/user/userInfo',
					success: (res) => {
						res.eventChannel.emit('item', {
							data: this.userInfoObj
						})
					}
				})
			},
			// 预览图片
			previewImg() {
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
			// 保存图片到手机
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
			// 添加或切换账号
			addAccount() {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			// 收藏类
			clickCollection(item){
				if(item.title === '我的收藏'){
					uni.navigateTo({
						url:'/pages/collection/collection'
					})
				} else if(item.title === '收货地址'){
					uni.navigateTo({
						url:'/pages/address/address'
					})
				} else{
					uni.navigateTo({
						url:'/pages/collection/browseHistory'
					})
				}
			},
			// 我的订单
			async clickMyorder(i) {
				// 点击跳转到对应的订单状态
				uni.navigateTo({
					url:'/pages/order/order',
					success: (res) => {
						// 传递参数
						res.eventChannel.emit('item',{data:i})
					}
				})
			},
			// 跳转至收货地址页
			jumpAddress(){
				uni.navigateTo({
					url:'/pages/address/address'
				})
			},
			// 退出登录
			loginOut() {
				this.logOutShow = true
			},
			// 确定退出
			logOutConfirm() {
				this.$store.commit('user/removeLogin')
				this.logOutShow = false
			},
			// 去登录
			loginConfirm() {
				uni.redirectTo({
					url: '/pages/user/login'
				})
			},
			// 返回首页
			loginCancel() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			// 客服
			kefu(){
				uni.showToast({
					icon:'none',
					title:'客服休息了~'
				})
			},
		},
		computed: {
			...mapState('user', ['token']),
		}
	}
</script>

<style lang="scss">
	.contain {
		width: 100%;

		image {
			width: 100%;
			height: 350rpx;
		}
	}

	.grid .iconfont {
		font-size: 60rpx;
		color: #888;
	}

	// 头像
	.avatar {
		width: 100%;
		position: absolute;
		top: 130rpx;
		padding: 20rpx 0 20rpx 0;

		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
		}

		.xiala {
			width: 50rpx;
			height: 50rpx;
			background-color: #66bbad;
			border-radius: 50%;
		}

	}
	// 切换账号弹出窗口
	.popup-info {
		width: 100%;
		height: 320rpx;
		background-color: #151724;
		border-radius: 20rpx 20rpx 0 0;
	
		.accountActive {
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}
	
		.accountAdd {
			display: flex;
			width: 100rpx;
			height: 100rpx;
			background-color: #3b3b43;
	
			border-radius: 50%;
	
			text {
				margin: auto;
				font-size: 50rpx;
			}
		}
	}

	// 功能
	.fun {
		position: absolute;
		top: 50rpx;
		right: 0;

		view {
			width: 65rpx;
			height: 65rpx;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 50%;

			::v-deep .uicon-setting {
				margin-left: 10rpx;
			}

			::v-deep .uicon-kefu-ermai {
				margin-left: 10rpx;
			}
		}
	}

	// 设置
	.setting {
		view {
			background: rgba(0, 0, 0, 0.4);
			border-radius: 20rpx;
			color: #fff;
		}
	}
	
	// 内容
	.content {
		position: absolute;
		top: 380rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 30rpx;
		.grids {
			height: 220rpx;
			background-color: #fff;
		}
		
		// 圆角
		.fillet {
			border-radius: 20rpx;
		}
	}
</style>
