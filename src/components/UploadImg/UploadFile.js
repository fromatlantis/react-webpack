import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'

const props = {
    name: 'file',
    headers: {
        authorization: 'authorization-text',
    },
}

class UploadFile extends Component {
    beforeUpload = file => {
        this.props.upLoad(file)
        return false
    }
    onChange = file => {
        console.log(file)
    }
    render() {
        return (
            <div>
                <Upload {...props} beforeUpload={this.beforeUpload} onChange={this.onChange}>
                    <Button>
                        <Icon type="upload" /> 上传文件
                    </Button>
                </Upload>
            </div>
        )
    }
}

export default UploadFile
