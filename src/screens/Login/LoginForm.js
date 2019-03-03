import React, { PureComponent } from 'react'
import { withRouter } from "react-router-dom"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './Login.module.css'

const FormItem = Form.Item;

class LoginForm extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.type = '0';
                this.props.login(values);
                //console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.form}>
                <p className={styles.title}>数字园区云平台</p>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className={styles.remember}>自动登录</Checkbox>
                    )}
                    <a className={styles.forgot} href=":;">忘记密码</a>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        登录
                    </Button>
                    <a href=":;">马上注册</a>
                </FormItem>
            </Form>
        );
    }
}
export default withRouter(Form.create()(LoginForm))