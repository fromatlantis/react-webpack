// 企业需求/办理
import React, { PureComponent } from 'react'
import { Avatar, Breadcrumb, Card, Descriptions, Tag } from 'antd'
import { Link } from 'react-router-dom'

class SupplierDetail extends PureComponent {
    state = {
        value: undefined,
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getSupplierDetail({ supplierId: id })
        this.props.getServiceTypeList()
    }
    renderCategoryTags = categoryId => {
        if (categoryId) {
            const { ServiceTypeList } = this.props
            const category = ServiceTypeList.filter(item => categoryId.split(',').includes(item.id))
            return category.map(item => <Tag color="blue">{item.typeName}</Tag>)
        }
    }
    renderClassifyTags = classifyId => {
        if (classifyId) {
            const { ServiceTypeList } = this.props
            const category = ServiceTypeList.filter(item => item.level === '2').filter(item =>
                classifyId.split(',').includes(item.id),
            )
            return category.map(item => <Tag color="blue">{item.typeName}</Tag>)
        }
    }
    render() {
        const { detail } = this.props
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/agency/supplierList">供应商列表</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>供应商详情</Breadcrumb.Item>
                    </Breadcrumb>
                }
                bordered={false}
            >
                <Descriptions title="" column={1}>
                    <Descriptions.Item label="LOGO">
                        <Avatar src={detail.logo} size={100} shape="square" />
                    </Descriptions.Item>
                    <Descriptions.Item label="供应商分类">
                        {this.renderCategoryTags(detail.categoryId)}
                    </Descriptions.Item>
                    <Descriptions.Item label="供应商细类">
                        {this.renderClassifyTags(detail.classifyId)}
                    </Descriptions.Item>
                    <Descriptions.Item label="供应商名称">{detail.supplier}</Descriptions.Item>
                    <Descriptions.Item label="联系人">{detail.contract}</Descriptions.Item>
                    <Descriptions.Item label="联系人电话">{detail.telephone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{detail.email}</Descriptions.Item>
                    <Descriptions.Item label="官网">{detail.website}</Descriptions.Item>
                    <Descriptions.Item label="供应商简介">{detail.introduce}</Descriptions.Item>
                </Descriptions>
            </Card>
        )
    }
}
export default SupplierDetail
