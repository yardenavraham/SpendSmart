import React, { useState, useContext } from "react";
// import './UploadImage.scss';
import axios from "axios";

const UploadImage = (props) => {

  const {selectedImage, setSelectedImage, setImageName, currentImageName} = props;
  //selectedImage: The image that the user choose
  //setSelectedImage: state function for 'selectedImage'
  //setImageName: state function for 'imageName' that is used in EditAccount component
  //currentImageName: current image name that is tored in DB

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
    setImageName(response.data.file);

  }

  const removeClicked = (event) => {
    event.preventDefault();
    console.log('removeClicked');
    console.log('selectedImage', selectedImage);
    if (currentImage) {
      console.log('here1');
      setShowPreview(false);
      setCurrentImage(null);
    }
    else {
      console.log('here2');
      setShowPreview(false);
      setSelectedImage(null);
    }
  }

  const head = 'http://localhost:27017/uploads/';
  const [currentImage, setCurrentImage] = useState(head+currentImageName);
  console.log('currentImage', currentImage);

  const [preview, setPreview] = useState(currentImage ? currentImage : selectedImage ? URL.createObjectURL(selectedImage): null);
  const [showPreview, setShowPreview] = useState(currentImage ? true : false);

  return (
    <div>
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