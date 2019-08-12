import React, { PureComponent } from 'react'
import { Button, Input, Select } from 'antd'
import styles from './Company.module.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { actions } from 'reduxDir/configure'
const { Option, OptGroup } = Select
const mapStateToProps = state => {
    return {
        industryList: state.configure.industryList.map(item => ({
            id: item.id,
            label: item.label,
            labelType: 'industry',
        })),
        qualityList: state.configure.qualityList.map(item => ({
            id: item.id,
            label: item.label,
            labelType: 'qualification',
        })),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getLabelList: actions('getLabelList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class SearchChip extends PureComponent {
    state = {
        column: 'name',
    }
    componentDidMount() {
        this.props.getLabelList({ type: 'industry' })
        this.props.getLabelList({ type: 'qualification' })
    }
    change = column => {
        this.setState({ column })
    }
    changeName = e => {
        this.setState({ name: e.target.value })
    }
    changePerson = e => {
        this.setState({ legal_person_name: e.target.value })
    }
    changeIndustry = e => {
        this.setState({ industry: e.target.value })
    }
    changeTags = labels => {
        this.setState({ labels })
    }
    changeGrade = companyLevel => {
        this.setState({
            companyLevel,
        })
    }
    renderInput = () => {
        const { column, name, legal_person_name, industry, labels, companyLevel } = this.state
        const { industryList, qualityList } = this.props
        if (column === 'name') {
            return (
                <Input
                    size="large"
                    placeholder="请输入企业名称"
                    value={name}
                    onChange={this.changeName}
                />
            )
        } else if (column === 'legal_person_name') {
            return (
                <Input
                    size="large"
                    placeholder="请输入法人名称"
                    value={legal_person_name}
                    onChange={this.changePerson}
                />
            )
        } else if (column === 'industry') {
            return (
                <Input
                    size="large"
                    placeholder="请输入行业名称"
                    value={industry}
                    onChange={this.changeIndustry}
                />
            )
        } else if (column === 'labels') {
            return (
                <Select
                    size="large"
                    placeholder="请选择标签"
                    mode="multiple"
                    value={labels}
                    onChange={this.changeTags}
                >
                    <OptGroup label="行业标签" key="1">
                        {industryList.map(item => (
                            <Option value={item.label}>{item.label}</Option>
                        ))}
                    </OptGroup>
                    <OptGroup label="资质标签" key="2">
                        {qualityList.map(item => (
                            <Option value={item.label}>{item.label}</Option>
                        ))}
                    </OptGroup>
                </Select>
            )
        } else if (column === 'companyLevel') {
            return (
                <Select
                    size="large"
                    placeholder="请选择等级"
                    mode="multiple"
                    value={companyLevel}
                    onChange={this.changeGrade}
                >
                    <Option value="A">A级</Option>
                    <Option value="B">B级</Option>
                    <Option value="C">C级</Option>
                    <Option value="D">D级</Option>
                </Select>
            )
        }
    }
    handleSearch = () => {
        const { column } = this.state
        const value = this.state[column]
        this.props.onSearch({
            column,
            keyWord: Array.isArray(value) ? value.join(',') : value,
        })
    }
    render() {
        const { column } = this.state
        return (
            <div className={styles.searchChip}>
                <Select value={column} size="large" style={{ width: 110 }} onChange={this.change}>
                    <Option value="name">查公司</Option>
                    <Option value="legal_person_name">查法人</Option>
                    <Option value="industry">查行业</Option>
                    <Option value="labels">查标签</Option>
                    <Option value="companyLevel">查分级</Option>
                </Select>
                <div className={styles.input}>{this.renderInput()}</div>
                <Button
                    type="primary"
                    icon="search"
                    size="large"
                    style={{ width: '0.8rem' }}
                    onClick={this.handleSearch}
                />
            </div>
        )
    }
}
export default SearchChip
