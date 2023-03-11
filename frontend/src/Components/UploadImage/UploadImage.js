import React, { useState, useContext } from "react";
// import './UploadImage.scss';
import axios from "axios";

const UploadImage = (props) => {

  const {selectedImage, setSelectedImage, setFile, authCtxImage} = props;
  // console.log('props', props);

  async function fileUploadHandler (event) {
    console.log('fileUploadHandler');
    console.log('selectedImage', selectedImage);
    event.preventDefault();

    let formData = new FormData();
    formData.append('file', selectedImage);

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    console.log('formData', formData);

    const response = await axios.post("http://localhost:27017/uploadimage", formData, config);
    console.log('response', response.data.file);
    setFile(response.data.file);

  }

  const removeClicked = (event) => {
    event.preventDefault();
    console.log('removeClicked');
    console.log('selectedImage', selectedImage);
    if (existingImage) {
      console.log('here1');
      setShowPreview(false);
      setExistingImage(null);
    }
    else {
      console.log('here2');
      setSelectedImage(null);
      setShowPreview(false);
    }
  }

  // const headd = 'http://localhost:27017/';
  // const path = 'uploads/Screen Shot 2022-10-04 at 10.43.43.png-1678451568386';

  const head = 'http://localhost:27017/uploads/';
  const [existingImage, setExistingImage] = useState(head+authCtxImage);
  console.log('existingImage', existingImage);

// const getUrlExtension = (url) => {
//   return url
//     .split(/[#?]/)[0]
//     .split(".")
//     .pop()
//     .trim();
// }

// const onImageEdit = async (imgUrl) => {
//   console.log('onImageEdit');
//   console.log('imgUrl', imgUrl);

//   var imgExt = getUrlExtension(imgUrl);
//   console.log('imgExt', imgExt);

//   const response = await fetch(imgUrl);
//   const blob = await response.blob();
//   const file = new File([blob], "profileImage." + imgExt, {
//     type: blob.type,
//   });
//   console.log('file222', file);
//   console.log('type file', typeof file);

//   return file;
// }

// const file1 = onImageEdit(src1);
// console.log('type file1', typeof file1);

// console.log('file1', file1);

  const [preview, setPreview] = useState(existingImage ? existingImage : selectedImage ? URL.createObjectURL(selectedImage): null);
  const [showPreview, setShowPreview] = useState(existingImage ? true : false);

  return (
    <div>
      {/* <img src ={src1} alt="not found" /> */}
      <form action="http://localhost:27017/uploadimage" method="post" encType="multipart/form-data">

        {showPreview && (
          <div>
            <img
              className='upload-image-preview'
              alt="not found"
              width={"250px"}
              src={preview}
              onClick={() => setSelectedImage(null)}
            />
            <br />
            <button onClick={(event) => removeClicked(event)}>Remove</button>
          </div>
        )}

        <br />
        <br />
        
        <input
        type="file" 
        name="file" 
        id="file" 
          onChange={(event) => {
            console.log('file', event.target.files[0].name);
            setSelectedImage(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
            setShowPreview(true);
          }}
        />
        <br/><button className="submitBtn" type="submit" onClick={fileUploadHandler}>Add File</button>
      </form>
    </div>
  );
};

export default UploadImage;