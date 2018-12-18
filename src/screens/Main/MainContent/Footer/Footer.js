import React, { PureComponent } from "react";
import { Layout } from "antd";
import styles from "./Footer.module.css";
export default class Footer extends PureComponent {
    render() {
        return (
            <Layout.Footer className={styles.footer}>
                copyright©2016 - 2020年 启迪数字集团 All Rights Reserved | Powered by
                厚载园区运营平台 | 回到顶部
            </Layout.Footer>
        );
    }
}
