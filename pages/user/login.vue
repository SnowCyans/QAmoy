<template>
	<view>
		<navigationBar title="登录" navBgColor="#b895b7"></navigationBar>
		<view class="login-home padding">
			<view class="login-title">
				登录后体验完整功能
			</view>
			<view class="avatar">
				<image src="../../static/img/xishi1.jpg" mode="aspectFill"></image>
			</view>
			<form @submit="submit">
				<view v-show="false" class="cu-form-group margin-tb login-border padding">
					<view class="title">
						<text class="cuIcon-peoplefill"></text>
					</view>

					<input class="fs-32" placeholder="账号" v-model="loginObj.account" type="nickname"
						name="account"></input>
				</view>
				<view v-show="false" class="cu-form-group login-border padding">
					<view class="title">
						<text class="cuIcon-mobilefill"></text>
					</view>
					<input class="fs-32" placeholder="密码" v-model="loginObj.password" type="number"
						name="password"></input>
				</view>
				<view class="padding-tb-lg margin-tb-lg">
					<button form-type='submit' class="btn2" type="default">已此账号登录</button>
				</view>
			</form>
			<view class="login-bottom">
				<u-checkbox-group @change="change" v-model="arr">
					<u-checkbox  :name="value" labelColor="#fff" activeColor="#fc2b55" shape="circle" label="已阅读并同意"></u-checkbox> <i>用户协议</i>和 <i>隐私政策</i>
				</u-checkbox-group>
			</view>
		</view>
		
		<!-- 登陆成功消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { login } from '../../api/user';
	export default {
		data() {
			return {
				loginObj: {
					account: 'xiaotuxian001',
					password: '123456'
				},
				arr:[],
				value:'QQ'

			};
		},
		methods: {
			async submit() {
				await this.$store.dispatch('user/login', this.loginObj)
				if(this.arr.length !== 0 ){
					this.$refs.uToast.show({
						type:'success',
						message:'登陆成功,正在跳转',
						complete:() => {
							uni.switchTab({
								url:'/pages/user/my'
							})
						}
					})
				} else{
					this.$refs.uToast.show({
						type:'default',
						message:'请先勾选协议'
					})
				}
			},
			change(e){
				this.arr = e
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #b895b7;
		margin-top: 100rpx;
	}
.login-title{
	margin-top: 40rpx;
	font-size: 40rpx;
	color: #fff;
	text-align: center;
	font-family: cursive;
}
	.login-border {
		border-radius: 50rpx;
	}

.avatar{
	display: flex;
	margin: 100rpx 0;
	image{
		width: 250rpx;
		height: 250rpx;
		margin: auto;
		border-radius: 50%;
	}
}

.btn2{
	width: 90%;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 30rpx;
	color: #fff;
	background-color: #27bb9a;
	font-size: 30rpx;
}
.login-bottom{
	width: 100%;
	text-align: center;
	color: #fff;
	::v-deep .uni-checkbox-input{
		border-radius: 50%;
	}
	::v-deep .u-checkbox{
		margin-left: 80rpx;
	}
	i{
		margin: 0 10rpx;
		color: #1a73e8;
	}
}
</style>
