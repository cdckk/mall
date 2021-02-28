import {
    ADD_COUNTER,
    ADD_TO_CART,
    RECEIVE_USER_INFO
} from './mutation-type'

import {getUserInfo} from '../network/userInfo'

export default {
    addCart(context, payload) {
        return new Promise((resolve,reject) => {
            //查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            //判断oldProduct
            if(oldProduct) {
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前商品数量+1')
            } else {
                payload.count = 1;
                context.commit(ADD_TO_CART, payload);
                reject('添加了新商品');
            }
        })
    },
    async userInfo(context) {
        let userInfo = await getUserInfo();
        context.commit(RECEIVE_USER_INFO, userInfo.data)
        
    }
}

// export function addCart(context, payload) {
//     return new Promise((resolve,reject) => {
//         //查找之前数组中是否有该商品
//         let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

//         //判断oldProduct
//         if(oldProduct) {
//             context.commit(ADD_COUNTER, oldProduct);
//             resolve('当前商品数量+1')
//         } else {
//             payload.count = 1;
//             context.commit(ADD_TO_CART, payload);
//             reject('添加了新商品');
//         }
//     })
// }

