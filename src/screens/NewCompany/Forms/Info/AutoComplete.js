import React, { PureComponent } from 'react'
import { Input } from 'antd'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'

import styles from './AutoComplete.module.css'

const mapStateToProps = state => {
    return {
        searchWord: state.newCompany.searchWord,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSearchWord: actions('getSearchWord'),
            getBaseInfo: actions('getBaseInfo'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class AutoComplete extends PureComponent {
    state = {
        showOptions: false,
        searchValue: this.props.value,
    }
    componentWillReceiveProps = nextProps => {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            const value = nextProps.value
            console.log(value)
            console.log(this.props.value)
            this.setState({
                searchValue: value,
            })
        }
    }
    onChange = e => {
        this.setState({
            searchValue: e.target.value,
            showOptions: true,
        })
        this.props.getSearchWord(e.target.value)
    }
    onFocus = () => {
        let { searchWord } = this.props
        let { searchValue } = this.state
        if (searchValue && searchWord.length > 0) {
            this.setState({
                showOptions: true,
            })
        }
    }
    onBlur = () => {
        setTimeout(() => {
            this.setState({
                showOptions: false,
            })
        }, 300)
    }
    onSelect = (name, id) => {
        //this.refs.search.focus()
        this.setState({
            searchValue: name,
            showOptions: false,
        })
        const { onChange, getBaseInfo } = this.props
        if (onChange) {
            onChange(name)
        }
        getBaseInfo(name)
    }
    render() {
        let { showOptions, searchValue } = this.state
        console.log(searchValue)
        let { searchWord, disabled } = this.props
        return (
            <div className={styles.root}>
                <Input
                    type="text"
                    onChange={this.onChange}
                    onBlurCapture={this.onBlur}
                    onFocus={this.onFocus}
                    value={searchValue}
                    disabled={disabled}
                    ref="search"
                />
                {showOptions && searchWord.length > 0 && (
                    <div className={styles.options}>
                        {searchWord.map(item => {
                            return (
                                <p
                                    key={item.id}
                                    onClick={e => {
                                        e.stopPropagation()
                                        this.onSelect(
                                            item.name.replace(/<em>/g, '').replace(/<\/em>/g, ''),
                                            item.id,
                                        )
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: item.name }} />
                                </p>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}
export default AutoComplete
