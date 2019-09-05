import React, { PureComponent, Fragment } from 'react'
import styles from './index.module.css'
export default class Rem extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.chip}>
                    <b>长度12px：</b>
                    <div style={{ width: '12px', backgroundColor: '#ccc' }} />
                </div>
                <div className={styles.chip}>
                    <b>长度0.12rem：</b>
                    <div style={{ width: '0.12rem', backgroundColor: '#ccc' }} />
                </div>
                <div className={styles.chip}>
                    <b>长度100px：</b>
                    <div style={{ width: '100px', backgroundColor: '#ccc' }} />
                </div>
                <div className={styles.chip}>
                    <b>长度1rem：</b>
                    <div style={{ width: '1rem', backgroundColor: '#ccc' }} />
                </div>
                <div className={styles.chip}>
                    <b>字号10px：</b>
                    <div style={{ fontSize: '10px' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号12px：</b>
                    <div style={{ fontSize: '12px' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.1rem：</b>
                    <div style={{ fontSize: '0.1rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.12rem：</b>
                    <div style={{ fontSize: '0.12rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.13rem：</b>
                    <div style={{ fontSize: '0.13rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.14rem：</b>
                    <div style={{ fontSize: '0.14rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.15rem：</b>
                    <div style={{ fontSize: '0.15rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.16rem：</b>
                    <div style={{ fontSize: '0.16rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.17rem：</b>
                    <div style={{ fontSize: '0.17rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.18rem：</b>
                    <div style={{ fontSize: '0.18rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.19rem：</b>
                    <div style={{ fontSize: '0.19rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.20rem：</b>
                    <div style={{ fontSize: '0.20rem' }}>字号</div>
                </div>
                <div className={styles.chip}>
                    <b>字号0.30rem：</b>
                    <div style={{ fontSize: '0.30rem' }}>字号</div>
                </div>
            </Fragment>
        )
    }
}
