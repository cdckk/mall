import {
    ADD_COUNTER,
    ADD_TO_CART,
    RECEIVE_USER_INFO
} from './mutation-type'

export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true;
        state.cartList.push(payload)
    },
    [RECEIVE_USER_INFO](state, payload) {
        state.userInfo = payload;
        console.log('哈哈哈哈');
        console.log(state.userInfo);
    }
}