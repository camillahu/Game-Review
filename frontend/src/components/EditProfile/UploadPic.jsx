import { useState } from "react";

// https://www.geeksforgeeks.org/how-to-upload-image-and-preview-it-using-reactjs/

function UploadPic() {

  const [imgFile, setImgFile] = useState();
  const handleImgChange = (e) => {
    setImgFile(URL.createObjectURL(e.target.files[0]));
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
          src={imgFile ?? "/img/default.png"}
        />
      </div>
    </div>
  );
}

export default UploadPic;
