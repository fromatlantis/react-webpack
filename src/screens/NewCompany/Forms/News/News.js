import React, { PureComponent } from 'react'
import { Card, Table } from 'antd'
import Toolbar from '../../Toolbar/Toolbar'
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
            <Card title="企业动态" bordered={false} extra={<Toolbar />}>
                <Table bordered pagination={false} dataSource={news.list} columns={columns} />
            </Card>
        )
    }
}
export default News
