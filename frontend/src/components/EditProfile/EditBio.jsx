import { useState, useEffect } from "react";

function EditBio({setBioText, originalBioText}) {
const [localBio, setLocalBio] = useState(
  originalBioText ? originalBioText : "no bio yet"
)

useEffect(() => {
  setLocalBio(originalBioText || "no bio yet");
}, [originalBioText]);

const changeHandler = (text) => {
  setLocalBio(text);
  setBioText(text || "");
};

  return (
    <div className="d-flex flex-column mt-3" style={{ color: "HSL(30, 20%, 85%)" }}>
          <span className="lead mb-1">Bio:</span>
          <textarea
            value={localBio}
            onChange={(e) => changeHandler(e.target.value)}
            style={{resize:"none", width:"20rem", height: "10rem"}}
          />
        </div>
  );
}

export default EditBio;