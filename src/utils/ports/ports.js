let apiMall = ''
export default {
    /* 商品 */
    // 获取分类
    getTypes: apiMall + '1.0/XcxProduct/getTypes',
    // 获取商品分类列表
    getProductList: apiMall + '1.0/XcxProduct/getProductList',
    /*图片 img_url, id,商品名 name,价格 price,库存 num* */
    // 获取商品详情
    getProductDetails: apiMall + '1.0/XcxProduct/getProductDetails',
    /* 用户 */
    // 我的地址
    shippingAddresslist: apiMall + '1.0/user/shippingAddresslist',
    // 添加&编译地址
    saveShippingAddressReturnId: apiMall + '1.0/user/saveShippingAddressReturnId',
    // 删除地址
    deleteShippingAddress: apiMall + '1.0/user/deleteShippingAddress',
    /* 购物车 */
    // 添加、修改购物车
    changeCart: apiMall + '1.0/SupplychainCart/save',
    // 删除、清空购物车
    delCart: apiMall + '1.0/SupplychainCart/del',
    // 获取购物车列表
    cartList: apiMall + '1.0/SupplychainCart/getlist',
}
