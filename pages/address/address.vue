<template>
	<view>
		<!-- 导航栏组件 -->
		<navigationBar title="收货地址"></navigationBar>
		<!-- 收货地址 -->
		<view class="address">
			<!-- 有地址显示 -->
			<view v-if="addressList.length !== 0" v-for="(item,i) in addressList" :key="item.id"
				class="default margin-sm u-border padding-sm">
				<view :class="item.isDefault === 0 ? 'default-address' : ''">
					{{item.isDefault === 0 ? '默' : ''}}
				</view>
				<view class="flex justify-between align-center">
					<view class="flex justify-between padding">
						<u-switch v-model="item.isDefault === 0" @change="radioChange(item)"></u-switch>
						<view class="padding-left">
							{{item.receiver}} - {{item.contact}}
							<view class="">
								{{item.address}}
							</view>
						</view>
					</view>

					<view @click="editAddress(item)" class="edit margin-bottom-xs">
						<u-icon name="edit-pen-fill"></u-icon>
					</view>
				</view>
				<view class="padding-xs flex justify-between align-center">
					<view @click="cancelDefault(item)" class="fs-20 color-lvse" v-if="item.isDefault === 0">
						取消默认地址
					</view>
					<view @click="setDefault(item)" v-else class="bgisDefault fs-20">
						设为默认
					</view>
					<u-line length="10" direction="col" color="#282c35"></u-line>
					<view @click="getAddressId(item.id)" class="bgisDefault fs-20">
						删除地址
						<u-modal :show="deleteShow" @confirm="confirmDelete" title="删除提示" content='确定删除该地址吗？'
							:closeOnClickOverlay="true" @close="deleteShow = false" :showCancelButton="true"
							@cancel="deleteShow = false" confirmColor="#66bbad"></u-modal>
					</view>
				</view>
			</view>
			
			<!-- 没地址显示 -->
			<u-empty v-if="addressList.length === 0" mode="address" marginTop="300rpx" icon="http://cdn.uviewui.com/uview/empty/address.png">
			</u-empty>
		</view>

		<!-- 添加地址 -->
		<view @click="clickAddAddress()" class="add-view">
			<view class="">
				<view class="add-btn">
					+
				</view>
				<view class="add-text">
					添加地址
				</view>
			</view>
			<!-- 弹出添加地址窗 -->
			<u-popup bgColor="black" :show="addressShow" mode="bottom" @close="addressShow = false">
				<map class="my-map"></map>
				<!-- 表单 -->
				<view class="padding-lg">
					<u--form :rules="rules" labelPosition="left" :model="addressObj" ref="uForm">
						<u-form-item required labelWidth="150rpx" label="收货人" prop="receiver">
							<u--input v-model="addressObj.receiver" placeholder="请填写名称" border="none"></u--input>
						</u-form-item>
						<u-form-item required labelWidth="150rpx" label="手机号" prop="contact">
							<u--input v-model="addressObj.contact" placeholder="请填写手机号" border="none"></u--input>
						</u-form-item>
						<u-form-item @click="location()" required labelWidth="150rpx" label="地区" prop="provinceCode">
							<u--input v-model="addressObj.provinceCode" placeholder="请选择地区" border="none">
							</u--input>
						</u-form-item>
						<u-form-item required labelWidth="150rpx" label="详细地址" prop="address">
							<u--input v-model="addressObj.address" placeholder="请填写详细地址" border="none"></u--input>
						</u-form-item>
						<u-form-item required labelWidth="150rpx" label="默认地址" prop="isDefault">
							<u-switch v-model="addressObj.isDefault === 0" @change="switchChange"></u-switch>
						</u-form-item>
						<view class="flex justify-around padding-tb-lg margin-tb-lg">
							<button @click="addressShow = false" class="btn2 cu-btn bg-qita color-fff lg">关闭</button>
							<button @click="confirm()"
								class="btn2 cu-btn bg-qita color-fff lg">{{addORedit? '添加' : '修改'}}</button>
							
						</view>
					</u--form>
				</view>
			</u-popup>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getAddress,
		addAddress,
		putAddress,
		deleteAddress
	} from '../../api/address.js'
	export default {
		data() {
			return {
				addressList: [],
				addressShow: false,
				// 判断是添加还是修改 true为添加
				addORedit: true,
				addressObj: {
					receiver: '',
					contact: '',
					provinceCode: '',
					cityCode: "",
					countyCode: '',
					address: '',
					isDefault: 1,
				},
				copyAddressObj: {
					receiver: '',
					contact: '',
					provinceCode: '',
					cityCode: "北京市",
					countyCode: '北京市',
					address: '',
					isDefault: 1
				},
				// 校验规则
				rules: {
					'receiver': [{
						required: true,
						message: '请填写收货人',
						trigger: ['blur', 'change']
					}],
					'contact': [{
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					'address': [{
						required: true,
						message: '请填写详细地址',
						trigger: ['blur', 'change']
					}],
				},
				// 控制删除提示
				deleteShow: false,
				addressId: '',
			};
		},
		onLoad() {
			this.address()
		},
		methods: {
			// 获取收货地址列表
			async address() {
				const res = await getAddress()
				console.log(res);
				this.addressList = res.data.result
			},
			location() {
				uni.chooseLocation({
					success: (res) => {
						let {
							address,
							name
						} = res
						if (address) {
							this.addressObj.provinceCode = address
							this.addressObj.cityCode = address
							this.addressObj.countyCode = address
						} else if (name) {
							this.addressObj.provinceCode = name
							this.addressObj.cityCode = name
							this.addressObj.countyCode = name
						}
					}
				})
			},
			// 修改地址
			async editAddress(item) {
				this.addORedit = false
				this.addressShow = true
				//使用扩展运算符如果赋值引用数据类型为浅拷贝
				this.addressObj = {
					...item
				}
				console.log(this.addressObj);
			},
			// 添加地址
			clickAddAddress() {
				this.addORedit = true
				this.addressShow = true
				// 深拷贝
				this.addressObj = JSON.parse(JSON.stringify(this.copyAddressObj))
			},
			// 是否为默认地址
			switchChange(e) {
				if (e) {
					this.addressObj.isDefault = 0
				} else {
					this.addressObj.isDefault = 1
				}
			},
			// 取消默认地址
			async cancelDefault(item) {
				item.isDefault = 1
				await putAddress(item)
				this.address()
				this.qqToast('none', '已取消')
			},
			// 设为默认地址
			async setDefault(items) {
				let flag = this.addressList.filter((item) => {
					return item.isDefault === 0
				})
				// 判断是否有数据的isDefault为0
				if (flag.length) {
					// 如果有就将其他的默认地址取消,将当前地址设为默认
					let obj = {}
					this.addressList.filter((item) => {
						return item.isDefault === 0
					}).forEach((item) => {
						obj = item
					})
					// 将上一个默认地址设为否
					obj.isDefault = 1
					await putAddress(obj)
					// 将当前地址设为默认地址
					items.isDefault = 0
					await putAddress(items)
					this.address()
				} else {
					// 如果没有就直接将当前地址设为默认地址
					items.isDefault = 0
					await putAddress(items)
					this.address()
				}
				this.qqToast()
			},
			// 点击开关设置默认地址
			async radioChange(item) {
				console.log(item.isDefault);
				if (item.isDefault === 1) {
					item.isDefault = 0
					await putAddress(item)
					this.qqToast()
				} else {
					item.isDefault = 1
					await putAddress(item)
					this.qqToast('none', '已取消')
				}

				this.address()
			},

			// 确定添加或修改地址
			async confirm() {
				if (this.addORedit) {
					this.$refs.uForm.validate().then(async res => {
						await addAddress(this.addressObj)
						this.qqToast('success', '添加成功')
						this.addressShow = false
						this.address()
					}).catch(errors => {
						uni.$u.toast('校验失败')
					})
				} else {
					this.$refs.uForm.validate().then(async res => {
						await putAddress(this.addressObj)
						this.qqToast('success', '修改成功')
						this.addressShow = false
						this.address()
					}).catch(errors => {
						uni.$u.toast('校验失败')
					})

				}
			},
			// 获取当前点击地址ID
			getAddressId(id) {
				this.deleteShow = true
				this.addressId = id
			},
			// 删除地址
			async confirmDelete() {
				await deleteAddress(this.addressId)
				this.qqToast('success', '删除成功')
				this.address()
				this.deleteShow = false
			},
			// 封装消息状态提示
			qqToast(type = 'success', msg = '设置成功',duration="1000") {
				this.$refs.uToast.show({
					type: type,
					message: msg,
					duration:duration
				})
			},
		}
	}
</script>

<style lang="scss">
	.address {
		margin-top: 120rpx;
		height: 1000rpx;

	}

	.default {
		position: relative;
		overflow: hidden;

		.default-address {
			padding: 35rpx 10rpx 10rpx;
			width: 100rpx;
			background-color: #66bbad;
			font-size: 12rpx;
			color: #e6e6ee;
			text-align: center;
			height: 70rpx;
			position: absolute;
			top: -28rpx;
			right: -45rpx;
			// 旋转
			transform: rotate(45deg);
		}
	}

	.edit {
		width: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #e6e6ee;
		border-radius: 50%;
		display: flex;

		::v-deep .uicon-edit-pen-fill {
			margin: auto;
			margin-left: 20rpx;
		}
	}

	.bgisDefault {
		border-radius: 50rpx;
		width: 130rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1rpx solid #66bbad;
	}


	.add-view {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 0 8rpx 1rpx gray;
		view {

			// background-color: pink;
			.add-btn {
				margin-left: 300rpx;
				width: 70rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 46rpx;
				border-radius: 50%;
				text-align: center;
				background-color: #66bbad;
			}

			.add-text {
				padding: 3rpx;
				margin-left: 280rpx;
				color: gray;
			}
		}


	}

	.my-map {
		height: 422rpx;
		width: 100%;
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
