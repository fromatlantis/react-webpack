import React, { Component } from "react";
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    //return isJPG && isLt2M;
    return false
}

class UploadManyImg extends Component {
    state = {
        loading: false,
    };
    beforeUpload = (file) => {
        getBase64(file, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        this.props.onUpload(file)
        return false
    }
    handleChange = (info) => {
        this.setState({ loading: true });
        //console.log(info.file.status)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info.file.originFileObj)
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">选择图片</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const { url } = this.props
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                //action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {url && !imageUrl ? <img src={url} alt="" style={{ width: 100, height: 100 }} /> : imageUrl ? <img src={imageUrl} style={{ width: 100, height: 100 }} alt="avatar" /> : uploadButton}
                
            </Upload>
        );
    }
}

export default UploadManyImg