import React, { PureComponent } from 'react'
import { Button, Input, Icon, Tag, Pagination, Divider, Alert } from 'antd'
import styles from './index.module.css'
import chuizi from '../../assets/home/chuizi.png'
import jizhang from '../../assets/home/jizhang.png'
import renzizhuanyuan from '../../assets/home/renzizhuanyuan.png'
import zhishichanquanzizhu from '../../assets/home/zhishichanquanzizhu.png'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
const Search = Input.Search

class Home extends PureComponent {
    constructor() {
        super()
        this.state = {
            searchValue: '',
            size: '查公司',
        }
    }
    search(value) {
        console.log(value)
        this.setState({
            searchValue: value,
        })
    }
    onChange = e => {
        this.setState({ size: e.target.value })
    }
    buttonClick(value) {
        if (this.state.size === value) {
            this.setState({
                size: '',
            })
        } else {
            this.setState({
                size: value,
            })
        }
    }
    gopush(nav) {
        this.props.push(nav)
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
                {this.state.searchValue ? null : (
                    <div>
                        <h1>中介服务</h1>
                        <div className={styles.services}>
                            <div
                                className={styles.service}
                                onClick={() => this.gopush('humanResourceService/1')}
                            >
                                <img
                                    className={styles.serviceImg}
                                    src={zhishichanquanzizhu}
                                    alt=""
                                />
                                <h2>知识产权</h2>
                            </div>
                            <div
                                className={styles.service}
                                onClick={() => this.gopush('humanResourceService/2')}
                            >
                                <img className={styles.serviceImg} src={jizhang} alt="" />
                                <h2>代理记账</h2>
                            </div>
                            <div
                                className={styles.service}
                                onClick={() => this.gopush('humanResourceService/3')}
                            >
                                <img className={styles.serviceImg} src={chuizi} alt="" />
                                <h2>法律服务</h2>
                            </div>
                            <div
                                className={styles.service}
                                onClick={() => this.gopush('humanResourceService/4')}
                            >
                                <img className={styles.serviceImg} src={renzizhuanyuan} alt="" />
                                <h2>人资服务</h2>
                            </div>
                        </div>
                        <Divider />
                        <h1>
                            企业动态
                            <span
                                className={styles.lookMore}
                                onClick={() => this.gopush('dynamicList')}
                            >
                                查看更多>>
                            </span>
                        </h1>
                        <div className={styles.dynamics}>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>题目</p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>来源：来源</span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>
                                    题目题目题目题目题目题目题目题目题目题目
                                </p>
                                <p className={styles.dynamicAbout}>一段描述，</p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>
                                        来源：数据来源数据来源
                                    </span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>
                                    题目题目题目题目题目题目题目题目题目题目
                                </p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>
                                        来源：数据来源数据来源
                                    </span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>题目</p>
                                <p className={styles.dynamicAbout}>
                                    1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                                </p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>
                                        来源：数据来源数据来源
                                    </span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>
                                    题目很长很长很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长
                                </p>
                                <p className={styles.dynamicAbout}>
                                    1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                                </p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>
                                        来源：数据来源数据来源
                                    </span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                            <div
                                className={styles.dynamic}
                                onClick={() => this.gopush('dynamicDetails/1')}
                            >
                                <p className={styles.dynamicTitle}>题目</p>
                                <p className={styles.dynamicAbout}>
                                    1、展示爬取到的园区企业的新闻（存放在企服管理的基本信息的企业动态中），按照时间顺序倒序排列；
                                </p>
                                <div className={styles.dynamicDescribe}>
                                    <span className={styles.dynamicCome}>来源：来源</span>
                                    <span className={styles.dynamicTime}>时间</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.allCompanys}>
                    <Alert message="总计：25个企业" type="info" showIcon />
                    <p className={styles.more}>展开更多 >></p>
                </div>
                <div>
                    <div className={styles.company}>
                        <img className={styles.serviceImg} src={renzizhuanyuan} alt="" />
                        <div className={styles.about}>
                            <h3>润江物业服务优先公司</h3>
                            <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：<span>王花</span>
                                    </p>
                                    <p className={styles.columnItem}>邮箱：wanghua@163.com</p>
                                    <p className={styles.columnItem}>公司类型：其他责任有限公司</p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>注册资本：5000万元人民币</p>
                                    <p className={styles.columnItem}>电弧：010-897788-906</p>
                                    <p className={styles.columnItem}>
                                        所属行业：科技研究和技术服务行业
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>成立时间：2019-01-01</p>
                                    <p className={styles.columnItem}>官网：www.baidu.com</p>
                                    <p className={styles.columnItem}>
                                        企业地址：石家庄科技中心润江大厦B座1201室
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>
                    <div className={styles.company}>
                        <img className={styles.serviceImg} src={renzizhuanyuan} alt="" />
                        <div className={styles.about}>
                            <h3>润江物业服务优先公司</h3>
                            <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：<span>王花</span>
                                    </p>
                                    <p className={styles.columnItem}>邮箱：wanghua@163.com</p>
                                    <p className={styles.columnItem}>公司类型：其他责任有限公司</p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>注册资本：5000万元人民币</p>
                                    <p className={styles.columnItem}>电弧：010-897788-906</p>
                                    <p className={styles.columnItem}>
                                        所属行业：科技研究和技术服务行业
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>成立时间：2019-01-01</p>
                                    <p className={styles.columnItem}>官网：www.baidu.com</p>
                                    <p className={styles.columnItem}>
                                        企业地址：石家庄科技中心润江大厦B座1201室
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>
                    <div className={styles.company}>
                        <img className={styles.serviceImg} src={renzizhuanyuan} alt="" />
                        <div className={styles.about}>
                            <h3>润江物业服务优先公司</h3>
                            <div className={styles.companyTypes}>
                                <Tag color="#87d068">实驻企业</Tag>
                                <Tag color="#108ee9">投资机构</Tag>
                                <Tag color="#108ee9">高新技术企业</Tag>
                                <Tag color="#108ee9">香港有限港股</Tag>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>
                                        法人：<span>王花</span>
                                    </p>
                                    <p className={styles.columnItem}>邮箱：wanghua@163.com</p>
                                    <p className={styles.columnItem}>公司类型：其他责任有限公司</p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>注册资本：5000万元人民币</p>
                                    <p className={styles.columnItem}>电弧：010-897788-906</p>
                                    <p className={styles.columnItem}>
                                        所属行业：科技研究和技术服务行业
                                    </p>
                                </div>
                                <div className={styles.column}>
                                    <p className={styles.columnItem}>成立时间：2019-01-01</p>
                                    <p className={styles.columnItem}>官网：www.baidu.com</p>
                                    <p className={styles.columnItem}>
                                        企业地址：石家庄科技中心润江大厦B座1201室
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Tag color="green" className={styles.companyType}>
                            在业
                        </Tag>
                    </div>
                    {this.state.searchValue ? (
                        <div className={styles.end}>
                            <Pagination defaultCurrent={1} total={50} hideOnSinglePage={true} />
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
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)
