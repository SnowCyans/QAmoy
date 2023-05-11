<template>
	<view class="margin-left-xs">
		<!-- 导航栏组件 -->
		<navigationBar title='搜索' :search="true"></navigationBar>
		<!-- 搜索框 -->
		<view class="padding">
			<u-search @focus="searchFocus" @search="handleSearch" placeholder="请输入关键字" @change="searchChange" :animation="true" height="40"
				v-model="searchComObj.keyword"></u-search>
		</view>
		<!-- 搜索联想 -->
		<view v-if="lenovoShow" class="lenovo">
			<view @click="searchCom(item)" v-for="(item,i) in lenovoList" class="padding">
				<text class="cuIcon-search color-huise margin-right-sm"></text>
				<text>{{item.associatedWord}}</text>
			</view>
		</view>
		<!-- 猜你想搜 -->
		<view class="">
			<view class="flex justify-between align-center padding-sm">
				<view class="">
					<text class="cuIcon-infofill fs-30 margin-right-xs color-huise"></text>
					<text class="color-huise fs-30">猜你想搜</text>
				</view>
				<text @click="discoverShow = !discoverShow" class=" fs-40 color-huise flex-wrap" :class="[ discoverShow ? 'cuIcon-attention' : 'cuIcon-attentionfill']"></text>
			</view>
			<view v-if="discoverShow" class="flex justify-between align-center flex-wrap">
				<view @click="handleisc(item)" v-for="(item,i) in discoverList" :key="i" class="discover">
					<text>{{item.keyword}}</text>
				</view>
			</view>
		</view>
		<!-- 搜索结果商品 -->
		<view v-if="searchComObj.keyword !== ''" @click="lenovoShow = false" class="resultCom">
			<view @click="searchGoods(item)" v-for="(item,i) in searchComResult" :key="i" class="topicInfo flex padding-sm">
				<image :src="item.picture" mode="aspectFill"></image>
				<view class="padding-left-sm fs-26">
					<h4 class="fs-28 margin-bottom-xs">{{item.name}}</h4>
					<view class="comelli margin-tb color-huise2">
						<text class="fs-26">商品数:{{item.orderNum}}</text>
					</view>
					<text class="fs-26 color-red">￥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		searchTips,
		searchAll
	} from '../../api/search.js'
	import {
		goodsList
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				// 联想词是否显示
				lenovoShow: false,
				// 联想词
				lenovoList: [{
						associatedWord: '胸包'
					},
					{
						associatedWord: '出行胸包'
					},
					{
						associatedWord: '多功能出行胸包'
					},
					{
						associatedWord: '超能装多功能出行胸包'
					},
				],
				copyLenovoList: [{
						associatedWord: '胸包'
					},
					{
						associatedWord: '出行胸包'
					},
					{
						associatedWord: '多功能出行胸包'
					},
					{
						associatedWord: '超能装多功能出行胸包'
					},
				],
				// 搜索商品参数
				searchComObj: {
					keyword: '',
					associatedIds: []
				},
				// 搜索商品结果
				searchComResult: [],
				//是否选择的猜你想搜
				clickComShow:false,
				// 是否显示猜你想搜
				discoverShow:true,
				// 猜你想搜
				discoverList: [{
						keyword: '经典格子衫'
					}, {
						keyword: '礼物'
					},
					{
						keyword: '男鞋'
					}, {
						keyword: '女鞋'
					},
					{
						keyword: '回弹健腹滚轮'
					}, {
						keyword: '黑科技'
					},
				],
			};
		},
		// 监听输入框是否有内容和是否选择了猜你想搜来判断联想词是否显示
		//这里练习Vue的监听功能
		watch: {
			'searchComObj.keyword': {
				handler: function(val) {
					if(val !== '' && this.clickComShow !== true){
						this.lenovoShow = true
					} else{
						this.lenovoShow = false
					}
				},
			}
		},
		methods: {
			// 输入框获取焦点时触发
			searchFocus(){
				if(this.searchComObj.keyword !== ''){
					this.lenovoShow = true
				} else{
					this.lenovoShow = false
				}
				
			},
			// 搜索联想
			async searchChange(e) {
				const res = await searchTips(e)
				console.log(res);
				// 如果搜索联想不为空就将值赋给
				if (res.data.result.length !== 0) {
					this.lenovoList = [...res.data.result]
				} else{
					this.lenovoList = this.copyLenovoList
				}
			},
			// 封装确认搜索商品
			async goodsResult(e){
				const res = await searchAll(e)
				console.log(res);
				this.searchComResult = res.data.result.pageData.items
			},
			// 点击联想商品进行搜索
			async searchCom(item) {
				console.log(item);
				Object.assign(this.searchComObj, item)
				// 调用封装的商品搜索
				this.goodsResult(this.searchComObj)
				this.lenovoShow = false
			},
			// 回车搜索
			async handleSearch(e) {
				let q = {keyword:e}
				this.goodsResult(q)
				this.lenovoShow = false
			},
			// 搜索出的商品
			async searchGoods(item){
				const res = await goodsList(item.id)
				console.log(res);
				uni.navigateTo({
					url: '/pages/goods/goods-info',
					success: (res2) => {
						res2.eventChannel.emit('item', {
							data: res.data.result
						})
					}
				})
			},
			// 点击猜你想搜
			async handleisc(item){
				console.log(item);
					this.clickComShow = true
				this.lenovoShow =false
				this.searchComObj.keyword = item.keyword
			
				this.goodsResult(item)
			}
		}
	}
</script>

<style lang="scss">
	page {
		margin-top: 50px;
	}

	// 联想词
	.lenovo {
		position: absolute;
		top: 113rpx;
		left: 0;
		z-index: 9;
		width: 100%;
		border-radius: 10rpx;
		background-color: #fff;
	}

	// 猜你想搜
	.discover {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #f2f2f2;
		border-radius: 30rpx;
		margin: 20rpx 20rpx 20rpx 0;
	}

	// 搜索结果商品
	.resultCom {
		position: absolute;
		top: 114rpx;
		left: 0;
		padding: 20rpx;
		width: 100%;
		height: 100%;
		background-color: #fff;

		.topicInfo {
			background-color: #ffffff;

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 15rpx;
			}

			view {
				h4 {
					width: 420rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
