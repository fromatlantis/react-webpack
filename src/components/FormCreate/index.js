import { Form } from 'antd'
import FormCreate from './formCreate'
export default itemObj => {
    Object.keys(itemObj).forEach(item => {
        FormCreate[item] = itemObj[item]
    })

    return Form.create({
        // 回填值
        // mapPropsToFields(props) {
        //     if (!props.data) return;
        //     Object.keys(props.data).map((key) => {
        //         let item = {};
        //         item[key] = Form.createFormField({
        //             value: props.data[key]
        //         })
        //         return item;
        //     })
        // }
    })(FormCreate)
}
