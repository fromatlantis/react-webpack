import React, { PureComponent } from 'react'
import { message, Button, Input, Icon, Tag, Pagination, Divider, Alert } from 'antd'
import styles from './index.module.css'
import chuizi from '../../assets/home/chuizi.png'
import jizhang from '../../assets/home/jizhang.png'
import renzizhuanyuan from '../../assets/home/renzizhuanyuan.png'
import zhishichanquanzizhu from '../../assets/home/zhishichanquanzizhu.png'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../redux/intermediary'
import { push } from 'connected-react-router'
import request from '../../utils/request'

const Search = Input.Search

class Home extends PureComponent {
    constructor() {
        super()
        this.state = {
            RecentNews: [],
            page: 1,
            searchValue: '',
            searchShow: '',
            size: '查公司',
            ServiceTypeList: [],
            companysList: {
                totalCount: 0,
                list: [],
            },
        }
    }
    componentDidMount() {
        this.props.getServiceTypeList()
        let payload = {
            pageNo: 1,
            pageSize: 10,
        }
        this.searchCompany(payload)
        this.getRecentNews()
    }
    async getRecentNews() {
        var result = await request({
            type: 'post',
            url: '/enterprise/getRecentNews',
            data: {
                pageNo: 1,
                pageSize: 6,
            },
            contentType: 'multipart/form-data',
        })
        if (result.code === 1000) {
            this.setState({
                RecentNews: result.data.resultList,
            })
        } else {
            message.info(result.message)
        }
    }
    goback() {
        this.setState({
            searchShow: '',
        })
    }
    lookmore() {
        this.setState({
            searchShow: true,
        })
    }
    search(value) {
        this.setState({
            searchValue: value,
            searchShow: true,
        })
        if (value) {
            let payload = {
                column: '',
                keyWord: value,
                pageNo: 1,
                pageSize: 10,
            }
            if (this.state.size === '查公司') {
                payload.column = 'name'
            } else if (this.state.size === '查法人') {
                payload.column = 'legal_person_name'
            } else if (this.state.size === '查行业') {
                payload.column = 'industry'
            }
            this.searchCompany(payload)
        } else {
            let payload = {
                pageNo: 1,
                pageSize: 10,
            }
            // if (this.state.size === '查公司') {
            //     payload.column = 'name'
            // } else if (this.state.size === '查法人') {
            //     payload.column = 'legal_person_name'
            // } else if (this.state.size === '查行业') {
            //     payload.column = 'industry'
            // }
            this.searchCompany(payload)
        }
    }
    async searchCompany(payload) {
        let url = '/enterprise/searchCompany?pageNo=' + payload.pageNo + '&pageSize=' + 10
        if (payload.column) {
            url = url + '&column=' + payload.column
        }
        if (payload.keyWord) {
            url = url + '&keyWord=' + payload.keyWord
        }
        var result = await request({
            type: 'get',
            url: url,
        })
        let res = result.data
        this.setState({
            companysList: [],
        })
        if (result.code === 1000) {
            this.setState({
                companysList: res,
                page: payload.pageNo,
            })
        } else {
            message.info(result.message)
        }
    }
    onChange = e => {
        this.setState({ size: e.target.value })
    }
    buttonClick(value) {
        this.setState({
            size: value,
        })
    }
    gopush(nav) {
        this.props.push(nav)
    }
    showServiceTypeList() {
        let items = []
        let { intermediary } = this.props.intermediarys
        let TopIntermediary = []
        for (let i in intermediary) {
            if (intermediary[i].level === '1') {
                TopIntermediary.push(intermediary[i])
            }
        }
        if (TopIntermediary && TopIntermediary.length) {
            items.push(<h1 key={0}>中介服务</h1>)
            let item = []
            for (let i in TopIntermediary) {
                item.push(
                    <div
                        key={i}
                        className={styles.service}
                        onClick={() => this.gopush('HumanResourceService/' + TopIntermediary[i].id)}
                    >
                        <img className={styles.serviceImg} src={TopIntermediary[i].logo} alt="" />
                        <h2>{TopIntermediary[i].typeName}</h2>
                    </div>,
                )
            }
            let supplement = 4 - (TopIntermediary.length % 4)
            for (let i = 0; i < supplement; i++) {
                item.push(
                    <div
                        key={i + TopIntermediary.length * 2}
                        className={styles.servicesnoshadow}
                    />,
                )
            }
            items.push(
                <div key={1} className={styles.services}>
                    {item}
                </div>,
            )
            return items
        } else {
            return null
        }
    }
    showCompany() {
        let { companysList } = this.state
        let list = companysList.list
        let item = []
        for (let i in list) {
            if (this.state.size === '查公司') {
                item.push(
                    <div
                        className={styles.company}
                        key={list[i].company_id}
                        onClick={() =>
                            this.gopush(
                                '/companyDetails/information/' + list[i].company_id + '/home',
                            )
                        }
                    >
                        <img className={styles.serviceImg} src={list[i].logo} alt="" />
                        <div className={styles.about}>
                            <h3>{list[i].name}</h3>
                            {/* <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div> */}
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：{list[i].legal_person_name}
                                    </p>
                                    <p className={styles.columnItem}>邮箱：{list[i].email}</p>
                                    <p className={styles.columnItem}>
                                        公司类型：{list[i].company_org_type}
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        注册资本：{list[i].reg_capital}
                                    </p>
                                    <p className={styles.columnItem}>
                                        电弧：{list[i].phone_number}
                                    </p>
                                    <p className={styles.columnItem}>
                                        所属行业：{list[i].industry}
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        成立时间：{list[i].estiblish_time}
                                    </p>
                                    <p className={styles.columnItem}>
                                        官网：{list[i].website_list}
                                    </p>
                                    <p className={styles.columnItem}>{list[i].reg_location}</p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>,
                )
            } else if (this.state.size === '查法人') {
                item.push(
                    <div
                        className={styles.company}
                        key={list[i].company_id}
                        onClick={() =>
                            this.gopush(
                                '/companyDetails/information/' + list[i].company_id + '/home',
                            )
                        }
                    >
                        <img className={styles.serviceImg} src={list[i].logo} alt="" />
                        <div className={styles.about}>
                            <h3>{list[i].name}</h3>
                            {/* <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div> */}
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：<span>{list[i].legal_person_name}</span>
                                    </p>
                                    <p className={styles.columnItem}>邮箱：{list[i].email}</p>
                                    <p className={styles.columnItem}>
                                        公司类型：{list[i].company_org_type}
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        注册资本：{list[i].reg_capital}
                                    </p>
                                    <p className={styles.columnItem}>
                                        电弧：{list[i].phone_number}
                                    </p>
                                    <p className={styles.columnItem}>
                                        所属行业：{list[i].industry}
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        成立时间：{list[i].estiblish_time}
                                    </p>
                                    <p className={styles.columnItem}>
                                        官网：{list[i].website_list}
                                    </p>
                                    <p className={styles.columnItem}>{list[i].reg_location}</p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>,
                )
            } else if (this.state.size === '查行业') {
                item.push(
                    <div
                        className={styles.company}
                        key={list[i].company_id}
                        onClick={() =>
                            this.gopush(
                                '/companyDetails/information/' + list[i].company_id + '/home',
                            )
                        }
                    >
                        <img className={styles.serviceImg} src={list[i].logo} alt="" />
                        <div className={styles.about}>
                            <h3>{list[i].name}</h3>
                            {/* <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div> */}
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：{list[i].legal_person_name}
                                    </p>
                                    <p className={styles.columnItem}>邮箱：{list[i].email}</p>
                                    <p className={styles.columnItem}>
                                        公司类型：{list[i].company_org_type}
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        注册资本：{list[i].reg_capital}
                                    </p>
                                    <p className={styles.columnItem}>
                                        电弧：{list[i].phone_number}
                                    </p>
                                    <p className={styles.columnItem}>
                                        所属行业：<span>{list[i].industry}</span>
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        成立时间：{list[i].estiblish_time}
                                    </p>
                                    <p className={styles.columnItem}>
                                        官网：{list[i].website_list}
                                    </p>
                                    <p className={styles.columnItem}>{list[i].reg_location}</p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>,
                )
            }
        }
        return item
    }
    pageOnChange(page, pageSize) {
        let payload = {
            pageNo: page,
            keyWord: this.state.searchValue,
            column: '',
        }
        if (this.state.searchValue) {
            if (this.state.size === '查公司') {
                payload.column = 'name'
            } else if (this.state.size === '查法人') {
                payload.column = 'legal_person_name'
            } else if (this.state.size === '查行业') {
                payload.column = 'industry'
            }
        }
        this.searchCompany(payload)
    }
    lookUrl(uri) {
        window.open(uri)
    }
    showRecentNews() {
        let { RecentNews } = this.state
        let item = []
        for (let i in RecentNews) {
            item.push(
                <div
                    key={RecentNews[i].id}
                    className={styles.dynamic}
                    onClick={() => this.lookUrl(RecentNews[i].url)}
                >
                    <p className={styles.dynamicTitle}>{RecentNews[i].title}</p>
                    {/* <p className={styles.dynamicAbout}>一段描述，</p> */}
                    <div className={styles.dynamicDescribe}>
                        <span className={styles.dynamicCome}>来源：{RecentNews[i].website}</span>
                        <span className={styles.dynamicTime}>{RecentNews[i].time}</span>
                    </div>
                </div>,
            )
        }
        return item
    }
    render() {
        const { size } = this.state
        return (
            <div className={styles.Container}>
                <div className={styles.radio}>
                    <div className={styles.flex}>
                        <Button
                            onClick={() => this.buttonClick('查公司')}
                            type={size === '查公司' ? 'primary' : ''}
                        >
                            查公司
                        </Button>
                        <Button
                            onClick={() => this.buttonClick('查法人')}
                            type={size === '查法人' ? 'primary' : ''}
                        >
                            查法人
                        </Button>
                        <Button
                            onClick={() => this.buttonClick('查行业')}
                            type={size === '查行业' ? 'primary' : ''}
                        >
                            查行业
                        </Button>
                    </div>
                </div>
                <div className={styles.searchView}>
                    <Search
                        placeholder="请输入企业名称、老板名称等"
                        onSearch={value => this.search(value)}
                        enterButton
                        size="large"
                    />
                </div>
                <Divider />
                {this.state.searchShow ? null : (
                    <div>
                        {this.showServiceTypeList()}
                        <Divider />
                        <h1>
                            企业动态
                            <div
                                className={styles.lookMore}
                                onClick={() => this.gopush('DynamicList')}
                            >
                                <Button type="link">展开更多>></Button>
                            </div>
                        </h1>
                        <div className={styles.dynamics}>{this.showRecentNews()}</div>
                    </div>
                )}
                <div className={styles.allCompanys}>
                    <Alert
                        message={'总计：' + this.state.companysList.totalCount + '个企业'}
                        type="info"
                        showIcon
                    />
                    {this.state.searchShow ? (
                        <p className={styles.more} onClick={() => this.goback()}>
                            <Button type="link">返回首页 >></Button>
                        </p>
                    ) : (
                        <p className={styles.more} onClick={() => this.lookmore()}>
                            {/* 展开更多 >> */}
                            <Button type="link">展开更多>></Button>
                        </p>
                    )}
                </div>
                <div>
                    {this.showCompany()}
                    {this.state.searchShow ? (
                        <div className={styles.end}>
                            <Pagination
                                defaultCurrent={1}
                                total={this.state.companysList.totalCount}
                                hideOnSinglePage={true}
                                onChange={(page, pageSize) => this.pageOnChange(page, pageSize)}
                                current={this.state.page}
                            />
                        </div>
                    ) : null}
                    <div className={styles.bottom} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        router: state.router,
        intermediarys: state.intermediary,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
            getServiceTypeList: actions('getServiceTypeList'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)
