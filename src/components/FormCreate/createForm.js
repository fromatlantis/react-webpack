import  React from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../TableView/TableView.module.css';
const FormItem = Form.Item;
const CreateQueryForm = Form.create()(props => {
    const { form, name } = props;
    const querySubmit = () => {
        let fields = form.getFieldsValue();
        props.onSubmit({
            pageNo: 1,
            pageSize: props.pageSize,
            ...fields
        })
    }
      
    return (
        <Form layout="inline" onSubmit={querySubmit}>
            <FormItem>
                {
                    form.getFieldDecorator(name)(<Input placeholder="请输入" className={styles.search}/>)
                }
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    查询
                </Button>
            </FormItem>
        </Form>
    )
})


export default CreateQueryForm;