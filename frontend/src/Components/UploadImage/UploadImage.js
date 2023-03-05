import React, { useState, useContext } from "react";
import './UploadImage.scss';
// import UploadService from "./FileUploadService";
import axios from "axios";

const UploadImage = (props) => {

  const {selectedImage, setSelectedImage, name, setName} = props;

  const fileUploadHandler = (event) => {

    event.preventDefault();

    let formData = new FormData();
    formData.append('file', selectedImage);

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    console.log(formData);

    axios.post("http://localhost:27017/uploadimage", formData, config)
    .then (res => {
        console.log(res.data);
        //console.log(this.state.filename);
    })
}

  return (
    <div>
      <form encType="multipart/form">

      {selectedImage && (
        <div>
          <img
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
          setName(document.getElementById('file').value);
        }}
      />
      <br /><button className="submitBtn" type="submit" onClick={fileUploadHandler}>Add File</button>
      </form>
    </div>
  );
};

export default UploadImage;

// const ImageUpload = () => {
//     const [currentFile, setCurrentFile] = useState(undefined);
//     const [previewImage, setPreviewImage] = useState(undefined);
//     const [progress, setProgress] = useState(0);
//     const [message, setMessage] = useState("");

//     const selectFile = (event) => {
//         setCurrentFile(event.target.files[0]);
//         setPreviewImage(URL.createObjectURL(event.target.files[0]));
//         setProgress(0);
//         setMessage("");
//       };

//       const upload = () => {
//         setProgress(0);
    
//         UploadService.upload(currentFile, (event) => {
//           setProgress(Math.round((100 * event.loaded) / event.total));
//         })
//           .then((response) => {
//             setMessage(response.data.message);
//             return UploadService.getFiles();
//           })
//           .then((files) => {
//             setImageInfos(files.data);
//           })
//           .catch((err) => {
//             setProgress(0);
    
//             if (err.response && err.response.data && err.response.data.message) {
//               setMessage(err.response.data.message);
//             } else {
//               setMessage("Could not upload the Image!");
//             }
    
//             setCurrentFile(undefined);
//           });
//       };

//       useEffect(() => {
//         UploadService.getFiles().then((response) => {
//           setImageInfos(response.data);
//         });
//       }, []);
  
//     const [imageInfos, setImageInfos] = useState([]);
//     return (
//       <div>
//         <div className="row">
//           <div className="col-8">
//             <label className="btn btn-default p-0">
//               <input type="file" accept="image/*" onChange={selectFile} />
//             </label>
//           </div>
  
//           <div className="col-4">
//             <button
//               className="btn btn-success btn-sm"
//               disabled={!currentFile}
//               onClick={upload}
//             >
//               Upload
//             </button>
//           </div>
//         </div>
  
//         {currentFile && (
//           <div className="progress my-3">
//             <div
//               className="progress-bar progress-bar-info"
//               role="progressbar"
//               aria-valuenow={progress}
//               aria-valuemin="0"
//               aria-valuemax="100"
//               style={{ width: progress + "%" }}
//             >
//               {progress}%
//             </div>
//           </div>
//         )}
  
//         {previewImage && (
//           <div>
//             <img className="preview" src={previewImage} alt="" />
//           </div>
//         )}
  
//         {message && (
//           <div className="alert alert-secondary mt-3" role="alert">
//             {message}
//           </div>
//         )}
  
//         <div className="card mt-3">
//           <div className="card-header">List of Images</div>
//           <ul className="list-group list-group-flush">
//             {imageInfos &&
//               imageInfos.map((img, index) => (
//                 <li className="list-group-item" key={index}>
//                   <p>
//                     <a href={img.url}>{img.name}</a>
//                   </p>
//                   <img src={img.url} alt={img.name} height="80px" />
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };
  
//   export default ImageUpload;