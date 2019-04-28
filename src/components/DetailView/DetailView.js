import React, { PureComponent } from 'react'
import styles from './DetailView.module.css'
export default class DetailView extends PureComponent {
    renderChip = () => {
        let { items, data } = this.props
        return items.map((x, i) => {
            let rendered = <span>{data[x.field] || ''}</span>
            if (x.render) {
                rendered = x.render(data[x.field], data)
            }
            return (
                <div className={styles.chip} key={i}>
                    <b>{x.title}：</b>
                    <span>{rendered}</span>
                </div>
            )
        })
    }
    render() {
        return <div className={styles.root}>{this.renderChip()}</div>
    }
}
