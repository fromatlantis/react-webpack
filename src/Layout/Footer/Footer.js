import React, { PureComponent } from "react";
import { Layout } from "antd";
import styles from "./Footer.module.css";
export default class Footer extends PureComponent {
    render() {
        return (
            <Layout.Footer className={styles.footer}>
                @2018-2019 启迪智慧INC.All Rights Reserved | Powered by
                厚载园区运营平台
            </Layout.Footer>
        );
    }
}
