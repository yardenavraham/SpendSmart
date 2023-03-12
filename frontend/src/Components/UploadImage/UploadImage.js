import React, { useState, useRef } from "react";
// import './UploadImage.scss';
import axios from "axios";
import { Button, Input, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadImage = (props) => {

  const {selectedImage, setSelectedImage, currentImageName} = props;
  //selectedImage: The image that the user choose
  //setSelectedImage: state function for 'selectedImage'
  //setImageName: state function for 'imageName' that is used in EditAccount component
  //currentImageName: current image name that is tored in DB

  const domainAndDir = 'http://localhost:27017/uploads/';
  const [currentImage, setCurrentImage] = useState(currentImageName !== undefined && currentImageName !== null ? domainAndDir+currentImageName : null);
  const [preview, setPreview] = useState(currentImage ? currentImage : selectedImage ? URL.createObjectURL(selectedImage): null);
  const [showPreview, setShowPreview] = useState(currentImage ? true : false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef('');

  // async function fileUploadHandler (event) {
  //   event.preventDefault();
  //   setImageNotUploadedErr(false);


  //   let formData = new FormData();
  //   formData.append('file', selectedImage);

  //   const config = {     
  //       headers: { 'content-type': 'multipart/form-data' }
  //   }
  //   console.log('formData', formData);

  //   const response = await axios.post("http://localhost:27017/uploadimage", formData, config);
  //   // console.log('response', response.data.file);
  //   setImageName(response.data.file);

  // }

  const removeClicked = (event) => {
    event.preventDefault();
    setShowPreview(false);
    setCurrentImage(null);
    setSelectedImage(null);
    setInputText('');
    inputRef.current.calue = '';
    // if (currentImage) {
    //   setShowPreview(false);
    //   setCurrentImage(null);
    // }
    // else {
    //   setShowPreview(false);
    //   setSelectedImage(null);
    // }
  }

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
            <div>
              <TextField 
                disabled 
                fullWidth 
                variant="standard" 
                InputProps={{ disableUnderline: true, 
                  inputProps: {
                  style: { textAlign: "center" },
                  }  
                }} 
                value={inputText}
              />
            </div>
            <Button 
              variant="outlined" 
              onClick={(event) => removeClicked(event)}>
                <DeleteIcon />Remove
            </Button>
          </div>
        )}

        <br />
        <br />
        
        {/* <Input
          type="file" 
          name="file" 
          id="file" 
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
            setShowPreview(true);
          }}
        /> */}

    <div>
      <Button 
        variant="outlined" 
        component="label" 
        color="primary">
        {/* {" "} */}
        <AddIcon/> Browse Image
        <input 
          type="file" 
          name="file" 
          id="file" 
          hidden
          ref={inputRef}
          onChange={(event) => {
            console.log('hereee', event.target.files[0]);
            setSelectedImage(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
            setShowPreview(true);
            setInputText(event.target.files[0].name)
            console.log('inputRef ', inputRef.current.value)
          }}/>
      </Button>
    </div>


        {/* <br/>
          <Button 
            className="submitBtn" 
            type="submit" 
            variant="contained" 
            onClick={fileUploadHandler}>
              Upload Image
          </Button> */}
      </form>

    </div>
  );
};

export default UploadImage;
