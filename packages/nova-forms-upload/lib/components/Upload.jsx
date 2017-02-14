import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import 'isomorphic-fetch';

class Upload extends Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.clearImage = this.clearImage.bind(this);

    this.state = {
      preview: '',
      uploading: false,
      value: props.value || '',
      videoUrl:''
    }
  }

  componentWillMount() {
    this.context.addToAutofilledValues({[this.props.name]: this.props.value || []});
  }

  onDrop(files) {
    // set the component in upload mode with the preview
    this.setState({
      preview: files[0].preview,
      uploading: true,
      value: '',
    });

    // request url to cloudinary
	const cloudinaryCloudName = Telescope.settings.get("cloudinaryCloudName") == undefined ? 'dvrif5vdu' : Telescope.settings.get("cloudinaryCloudName");
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/'+cloudinaryCloudName+'/upload';
	
	console.log("Telescope.settings",Telescope.settings.get("cloudinaryCloudName"));
  var avatarUrlArr = [];
    // request body
  const body = new FormData();
  for(var i=0 ; i<files.length;i++) {
    uploadImageToCloud(files[i])
  }  
  
    var that = this;
    function uploadImageToCloud(file) {    
        body.append("file", file);
     //  body.append("upload_preset", this.props.options.preset );
    	  body.append("upload_preset", "myposts" );

        // post request to cloudinary
        fetch(cloudinaryUrl, {
          method: "POST",
          body,
        })
        .then(res => res.json()) // json-ify the readable strem
        .then(body => {

          // use the https:// url given by cloudinary
          //const avatarUrl = body.secure_url;
          avatarUrlArr.push({type:"image",url:body.secure_url})
          // set the uploading status to false
          

          // tell NovaForm to catch the value
          that.context.addToAutofilledValues({[that.props.name]: avatarUrlArr});
          that.setState({
            preview: '',
            uploading: false,
            value: avatarUrlArr,
          });
        })
        .catch(err => console.log("err", err));
  }

  }

  clearImage(e) {
    e.preventDefault();
    this.context.addToAutofilledValues({[this.props.name]: ''});
    this.setState({
      preview: '',
      value: '',
    });
  }

  uploadVideo(e){
    if(this.state.videoUrl.length>0){
    var that = this;
    for(var i=0;i< that.state.value.length ;i++){ 
       if(that.state.value[i].type=="video"){
         that.state.value[i] = ({type:'video',url:that.state.videoUrl})
         that.context.addToAutofilledValues({[that.props.name]: that.state.value });
         that.setState({value:that.state.value});
         return;
      }
    }
    that.context.addToAutofilledValues({[that.props.name]: that.state.value.push({type:'video',url:that.state.videoUrl})});
    that.setState({value:that.state.value});
  }
  }

  render() {

    const { uploading, preview, value } = this.state;
    // show the actual uploaded image or the preview
    const image =  value;
    if(!this.state.videoUrl){
      for(var i=0;i<image.length;i++){
        if(image[i].type=="video"){
          this.state.videoUrl = image[i].url;
        }
      }
    }
    console.log("image",image);

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <div className="upload-field">
            <Dropzone ref="dropzone" 
              multiple={true} 
              onDrop={this.onDrop}
              accept="image/*"
              className="dropzone-base"
              activeClassName="dropzone-active"
              rejectClassName="dropzone-reject"
            >
              <div>Drop an image here, or click to select an image to upload.</div>
            </Dropzone>
            
            {image ? 
              <div className="upload-state">
                {uploading ? <span>Uploading... Preview:</span> : null}
                {value ? <a onClick={this.clearImage}><Telescope.components.Icon name="close"/> Remove Images and Video</a> : null}
               {image.map(function(imgSrc,imgIndex){
                  if(imgSrc.type=="image") {
                    return  <img key={"cloudImgUpload_"+imgIndex } style={{height: 30}} src={imgSrc.url} />
                  }
                })}

                               
              </div> 
            : null}
          </div>
        </div>

        <div className="videoUrlUploadContainer">
          <label className="control-label col-sm-3 "> Upload Video : </label>
          <div className="col-md-5">
            <input type="text" className="form-control" value={this.state.videoUrl} onChange={ (e)=> {  this.setState({ videoUrl : e.target.value }) }}/>
          </div>
            <button className="col-md-2 btn btn-primary" type="button" onClick={this.uploadVideo.bind(this)}>Upload Video Url</button>
        </div>

      </div>
    );
  }
}

Upload.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
};

Upload.contextTypes = {
  addToAutofilledValues: React.PropTypes.func,
}

export default Upload;
// {image.map(function(imgSrc,imgIndex){
//                   if(!imgSrc.type) {
//                     return  <img key={"cloudImgUpload_"+imgIndex } style={{height: 30}} src={imgSrc} />
//                   }
//                 })}
