<template>
	<view class="nav-info">
		<view class="cu-bar" :style="{backgroundColor: navBgColor}">
			<view class="padding-left">
				<!-- 位置 -->
				<view @tap="handleAddress()" v-if="address" class="flex color-huise2">
					<u-icon  name='map' size="22" color="#3b3b3b"></u-icon>
					<text>{{city === '' ? '北京' : city}}</text>
				</view>
				<!-- 返回上一页 -->
				<view v-else @click="back()">
					<u-icon name="arrow-left" size="22" color="gray"></u-icon>
				</view>
			</view>
			<view class="content text-bold">
				<text :style="{color:titleColor}">{{title}}</text>
			</view>

			<view class="flex align-center margin-right">
				<a v-if="search"  href="https://github.com/SnowCyans?tab=repositories" class="top-github cuIcon-github"></a>
				<text @click="jumpSearch()" v-else class="cuIcon-search fs-36 margin-right-xs color-huise"></text>
				<u-line length="10" direction="col" color="gray"></u-line>
				<text class="cuIcon-sort color-huise2 text-bold fs-40 padding-left-xs"></text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			address: {
				type: Boolean
			},
			// 标题
			title: {
				type: String
			},
			// 自定义导航栏背景颜色
			navBgColor: {
				type: String,
				default: '#fff'
			},
			// 自定义导航栏标题颜色
			titleColor: {
				type: String,
				default: '#27bb9a'
			},
			search:{
				type:Boolean,
				default:false
			}
		},
		name: "navigationBar",
		data() {
			return {
				// 当前城市
				city: '',
			};
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 地址
			handleAddress() {
				uni.chooseLocation({
					success: (res) => {
						let {
							address,
							name
						} = res
						let len = name.length === 3 || name.length === 5 || name.length === 6 || name
							.length === 7 || name.length === 8
						if (len) {
							this.city = name
						} else {
							let pindex = address.indexOf('省')
							let cindex = address.indexOf('市')
							let province = address.slice(pindex + 1, cindex + 1)
							this.city = province
						}


					}
				})
			},
			jumpSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav-info {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		z-index: 1;
		box-shadow: 0 1px 1px -1px gray;
	}
	.top-github{
		text-decoration: none;
		color: gray;
		font-size: 40rpx;
		margin-right: 10rpx;
	}
</style>
