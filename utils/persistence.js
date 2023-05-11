
// 设置本地存储数据
export const setStorage = (key,data) => {
	uni.setStorage({
		key:key,
		data:JSON.stringify(data)
	})
}

// 获取本地存储数据
export const getStorage = (key) => {
	try{
		const value = JSON.parse(uni.getStorageSync(key))
		return value
	}catch(e){
		console.log('本地存储key没有设置或者传错啦!');
		console.log(e);
	}
}

// 删除本地存储数据
export const removeStorage = (key) => {
	uni.removeStorageSync(key)
}
