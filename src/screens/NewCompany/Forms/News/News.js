import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import formView from '../FormView'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/news'

const mapStateToProps = state => {
    return {
        news: state.news.news,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRecentNews: actions('getRecentNews'),
        },
        dispatch,
    )
}

const dataSource = [
    {
        key: '1',
        source: '国家新闻网',
        time: '2019-05-20',
        publisher: '东方月初',
        title: '关于XX的新闻',
        content:
            '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容',
    },
    {
        source: '国家新闻网',
        time: '2019-05-20',
        publisher: '王权富贵',
        title: '关于XX的新闻',
        content:
            '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容',
    },
]

const columns = [
    {
        title: '新闻来源',
        dataIndex: 'source',
        key: 'source',
    },
    {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '发布人',
        dataIndex: 'publisher',
        key: 'publisher',
    },
    {
        title: '新闻标题',
        dataIndex: 'title',
        key: 'person',
    },
    {
        title: '新闻内容',
        dataIndex: 'content',
        key: 'update',
        width: 300,
    },
]
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class News extends PureComponent {
    componentDidMount = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.getRecentNews({
                companyId: sessionStorage.getItem('companyId'),
                pageNo: 1,
                pageSize: 10,
            })
        }
    }
    render() {
        const { news } = this.props
        return (
            <Card title="企业动态" bordered={false}>
                <Table bordered pagination={false} dataSource={news.list} columns={columns} />
            </Card>
        )
    }
}
export default News
