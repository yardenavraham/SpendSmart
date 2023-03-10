import React, { useState, useContext } from "react";
// import './UploadImage.scss';
import axios from "axios";

const UploadImage = (props) => {

  const {selectedImage, setSelectedImage, setFile} = props;
  console.log('props', props);

  async function fileUploadHandler (event) {
    console.log('fileUploadHandler');

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

const headd = 'http://localhost:27017/';
const path = 'uploads/Screen Shot 2023-03-03 at 0.34.14.png-1678441002948';
const src1 = headd+path;
console.log('src1', src1);

const getUrlExtension = (url) => {
  return url
    .split(/[#?]/)[0]
    .split(".")
    .pop()
    .trim();
}

const onImageEdit = async (imgUrl) => {
  console.log('onImageEdit');
  console.log('imgUrl', imgUrl);

  var imgExt = getUrlExtension(imgUrl);
  console.log('imgExt', imgExt);

  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], "profileImage." + imgExt, {
    type: blob.type,
  });
  console.log('file222', file);
  console.log('type file', typeof file);

  return file;
}

const file1 = onImageEdit(src1);
console.log('type file1', typeof file1);

console.log('file1', file1);
// if (selectedImage !== undefined) console.log('URL.createObjectURL(selectedImage)', URL.createObjectURL(selectedImage));

const preview = selectedImage === undefined ? onImageEdit(src1) : selectedImage;

  return (
    <div>
      <form action="http://localhost:27017/uploadimage" method="post" encType="multipart/form-data">

      {selectedImage && (
        <div>
          <img
            className='upload-image-preview'
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
            onClick={() => setSelectedImage(null)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
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
        }}
      />
      <br /><button className="submitBtn" type="submit" onClick={fileUploadHandler}>Add File</button>
      </form>
    </div>
  );
};

export default UploadImage;