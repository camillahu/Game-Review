import { useState } from "react";


// https://www.geeksforgeeks.org/how-to-upload-image-and-preview-it-using-reactjs/

function UploadPic({ originalImg, setImgFile, setImgPreview, imgPreview}) {
    const [errorMsg, setErrorMsg] = useState("");
  
  

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if(file) {
        setImgFile(file); //denne setter filen i parent.
        setImgPreview(URL.createObjectURL(file)); //denne lager en preview
    }
    else {
        setErrorMsg("Failed to load image.");
      }
  };

  return (
    <div className="d-flex align-items-start justify-content-between" style={{ color: "HSL(30, 20%, 85%)" }}>
      <div style={{ width: "20rem" }}>
        <span className="lead">Change profile picture: &nbsp; </span>
        <label htmlFor="files" className="btn btn-light btn-sm">
          Select Image
        </label>
        <input
          id="files"
          type="file"
          style={{ visibility: "hidden" }}
          onChange={handleImgChange}
        />
      </div>
      <div className="square-box-4">
        <img
          className="img-fluid img-cover"
          src={imgPreview ?? originalImg}
        />
      </div>
      <span>{errorMsg}</span>
    </div>
  );
}

export default UploadPic;
