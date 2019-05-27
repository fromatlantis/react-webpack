import React, { Component } from 'react'
import styles from './ListClick.module.css'

class ListClick extends Component {
    state = {
        activeKey: 'undefined',
        navTitle: [],
        spot: true,
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    updateAll = () => {
        this.setState({ activeKey: 'undefined' })
        this.props.getId('undefined')
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.state.navTitle.length) {
            let list = nextProps.data.filter((item, i) => {
                return i <= 6
            })
            this.setState({
                activeKey: this.state.activeKey ? this.state.activeKey : '',
                navTitle: list,
            })
        }
    }
    titleClick = (id, name) => {
        this.setState({
            activeKey: id,
        })
        let that = this
        setTimeout(() => {
            that.props.getId(id, name)
        }, 0)
    }
    allList = () => {
        this.setState({
            navTitle: this.props.data,
            spot: !this.state.spot,
        })
    }
    render() {
        // const navTitle1 = this.props.data || [];
        const title = this.props.title || ''
        return (
            <div style={{ position: 'relative', lineHeight: 2, overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: 4, left: 0 }}>{title}</span>
                <div style={{ paddingLeft: 80 }}>
                    {this.state.navTitle.map((item, i) => {
                        return (
                            <span
                                key={i}
                                onClick={() => {
                                    // this.titleClick(item.Ids, item.Names)
                                    this.titleClick(item.id, item.typeName)
                                }}
                                className={`${styles.typeBut} ${
                                    this.state.activeKey === item.id ? styles.active : ''
                                }`}
                            >
                                {item.typeName}
                            </span>
                        )
                    })}
                    <span
                        onClick={this.allList}
                        style={{
                            margin: 2,
                            display:
                                this.state.spot && this.state.navTitle.length > 6
                                    ? 'inline-block'
                                    : 'none',
                        }}
                    >
                        ···
                    </span>
                </div>
            </div>
        )
    }
}
export default ListClick
