import React, { PureComponent } from "react";
import { Form, Button } from "antd";

const FormItem = Form.Item;

export default class FormBody extends PureComponent {
    renderItems = () => {
        const props = this.props
        const { getFieldDecorator } = props.form;
        let { items, formItemLayout, handleActions } = props;
        return (
            items.map((x, i) => {
                if (x.field) {
                    return (
                        <FormItem {...formItemLayout} label={x.label} key={i} >
                            {getFieldDecorator(x.field, {
                                initialValue: props[x.field] ? props[x.field] : x.initialValue,
                                rules: x.rules
                            })(
                                x.render(handleActions)
                            )}
                        </FormItem>
                    )
                } else {
                    return (
                        <FormItem {...formItemLayout} label={x.label} key={i} >
                            {x.render(handleActions)}
                        </FormItem>
                    )
                }
            })
        )
    }
    render() {
        return (
            <div >
                {this.renderItems()}
                <FormItem>
                    <Button type="primary" htmlType="submit" >
                        保存
                    </Button>
                    <Button style={{ marginLeft: 8 }} >
                        清空
                    </Button>
                </FormItem>
            </div>
        )
    }
}
