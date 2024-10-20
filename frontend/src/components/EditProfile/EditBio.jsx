import { useState } from "react";

function EditBio({bioText, setBioText, originalBioText, setOriginalBioText }) {


  return (
    <div className="d-flex flex-column mt-3" style={{ color: "HSL(30, 20%, 85%)" }}>
          <span className="lead mb-1">Bio:</span>
          <textarea
            value={bioText ?? originalBioText}
            onChange={(e) => setTextarea(e.target.value)}
            style={{resize:"none", width:"20rem", height: "10rem"}}
          />
        </div>
  );
}

export default EditBio;