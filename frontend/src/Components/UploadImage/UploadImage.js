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

  const removeClicked = (event) => {
    event.preventDefault();
    console.log('removeClicked');
    console.log('selectedImage', selectedImage);
    if (selectedImage === undefined) {
      setPreview(selectedImage);
    }
    else {
      setSelectedImage(null);
    }
  }

  const headd = 'http://localhost:27017/';
  const path = 'uploads/Screen Shot 2022-10-04 at 10.43.43.png-1678451568386';
  let src1 = headd+path;
  console.log('src1', src1);

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

  const [preview, setPreview] = useState(selectedImage === undefined ? src1 : URL.createObjectURL(selectedImage));

  return (
    <div>
      {/* <img src ={src1} alt="not found" /> */}
      <form action="http://localhost:27017/uploadimage" method="post" encType="multipart/form-data">

        { (
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
          }}
        />
        <br/><button className="submitBtn" type="submit" onClick={fileUploadHandler}>Add File</button>
      </form>
    </div>
  );
};

export default UploadImage;