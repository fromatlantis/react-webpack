import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}
export default class ImageView extends PureComponent {
    static defaultProps = {
        max: 5,
    }
    static propTypes = {
        max: PropTypes.number,
    }
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }
    handleChange = ({ fileList }) => {
        this.setState({ fileList })
        const onChange = this.props.onChange
        //console.log(changedValue)
        if (onChange) {
            onChange(fileList.map(item => item.originFileObj))
        }
    }
    beforeUpload = file => {
        return false
    }
    render() {
        const { previewVisible, previewImage } = this.state
        const { fileList } = this.props
        return (
            <div>
                <Upload
                    listType="picture-card"
                    fileList={(fileList || []).map((item, index) => ({
                        uid: index,
                        url: item,
                    }))}
                    showUploadList={{
                        showRemoveIcon: false,
                    }}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                />
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="缩略图" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
