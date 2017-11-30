// React Image Preview & Upload A PEN BY Brian Emil Hartz
// https://codepen.io/hartzis/pen/VvNGZP

import React from 'react';

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: this.props.image_url };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ imagePreviewUrl: nextProps.image_url })
    }
    
    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.props.handleImageFile(this.state.file, reader.result);
        }
        reader.readAsDataURL(file);
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">
                A default image will be used if no images to be uploaded.
                </div>);
        }
        return (
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                        id="image"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}