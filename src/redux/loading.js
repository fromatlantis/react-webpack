import { blaze } from '../utils/blaze'
const model = {
    namespace: 'loading',
    state: {
        complate: true,
    },
    actions: [
        {
            name: 'complate',
            reducer: 'complate',
        },
    ],
}
const loading = blaze(model)
// reducer combineReducers使用
export default loading.reducers
// action connect组件使用
export const actions = loading.actions
