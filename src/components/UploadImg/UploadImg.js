import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
        message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    //return isJPG && isLt2M;
    return false
}

class UploadImg extends Component {
    state = {
        loading: false,
        imageUrl: this.props.value,
    }
    componentWillReceiveProps = nextProps => {
        if ('value' in nextProps) {
            const value = nextProps.value
            // 如果传过来的是File对象，转换成base64
            // console.log(value)
            if (value && typeof value === 'object') {
                getBase64(value, imageUrl => {
                    this.setState({
                        imageUrl,
                        loading: false,
                    })
                })
            } else {
                this.setState({
                    imageUrl: value,
                })
            }
        }
    }
    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange
        //console.log(changedValue)
        if (onChange) {
            onChange(changedValue)
        }
    }
    beforeUpload = file => {
        //console.log(file)
        getBase64(file, imageUrl => {
            //this.triggerChange(imageUrl)
            this.setState({
                imageUrl,
                loading: false,
            })
        })
        return false
    }
    handleChange = info => {
        this.setState({ loading: true })
        this.triggerChange(info.file)
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">选择图片</div>
            </div>
        )
        //alert(this.props.value)
        const { imageUrl } = this.state
        //console.log(imageUrl)
        return (
            <Upload
                accept="image/*"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                //action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? (
                    <img src={imageUrl} style={{ width: 120 }} alt="avatar" />
                ) : (
                    uploadButton
                )}
            </Upload>
        )
    }
}

export default UploadImg
