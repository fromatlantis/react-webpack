import { takeEvery } from "redux-saga/effects";
/**
 * @author vincen
 * @description redux相关封装
 */
export const blaze = (model) => {
    const generateType = (name) => {
        return `${model.namespace}/${name}`
    }
    return {
        // 方法：返回action
        actions: (name) => {
            let { actions } = model
            let item = actions.find(item => item.name === name)
            return function (param) {
                return {
                    type: generateType(item.name),
                    payload: param
                };
            }
        },
        // 方法：返回更新后的状态
        reducers: (state = model.state, action = {}) => {
            let { actions } = model
            let item = actions.find(item => generateType(item.name) === action.type)
            // return getNewState(item,state,action)
            return item && item.reducer ? (typeof (item.reducer) === 'string' ? {
                ...state,
                [item.reducer]: action.payload
            } : item.reducer(state, action)) : { ...state }
        },
        // 属性：代表包含takeEvery的数组
        effects: model.actions.filter(item => item.effect).map(item => {
            let type = generateType(item.name)
            return takeEvery(type, item.effect)
        })
    }
}