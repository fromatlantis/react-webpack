import React, { PureComponent } from 'react'
import { Button, Modal } from 'antd'
import Archives from '../../CompanyDetails/Archives/Archives'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/company'

const mapStateToProps = state => {
    return {
        archivesDetail: state.company.archivesDetail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getArchivesDetail: actions('getArchivesDetail'),
            saveArchives: actions('saveArchives'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Toolbar extends PureComponent {
    state = {
        visible: false,
    }
    save = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.saveArchives({
                companyId,
            })
        }
    }
    preview = () => {
        const companyId = sessionStorage.getItem('companyId')
        if (companyId) {
            this.props.getArchivesDetail({
                companyId,
            })
            this.setState({
                visible: true,
            })
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    handleOk = () => {
        this.setState({
            visible: false,
        })
    }
    render() {
        const { archivesDetail } = this.props
        return (
            <div>
                <Button type="primary" style={{ marginRight: '15px' }} onClick={this.preview}>
                    预览
                </Button>
                <Button onClick={this.save}>存档</Button>
                <Modal
                    title="档案详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1200}
                    footer={null}
                >
                    <Archives archivesDetail={archivesDetail.snapshot || {}} />
                </Modal>
            </div>
        )
    }
}
export default Toolbar
