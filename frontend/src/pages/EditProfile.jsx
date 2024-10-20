import { checkBirthday } from "../utils/formControl";
import { imgUpload } from "../utils/imgUpload";
import { useState, useMemo, useEffect } from "react";
import UploadPic from "../components/EditProfile/UploadPic";
import EditBio from "../components/EditProfile/EditBio";
import EditBirthday from "../components/EditProfile/EditBirthday";
import EditCountry from "../components/EditProfile/EditCountry";
import EditFaveGame from "../components/EditProfile/EditFaveGame";
import { userDetails } from "../api/userDetails";

function EditProfile({ loginref, gameref, handlePageChange }) {
  const [imgFile, setImgFile] = useState(null);
  const [originalImg, setOriginalImg] = useState("/img/default.png");
  const [imgPreview, setImgPreview] = useState();

  const [bioText, setBioText] = useState(null);
  const [originalBioText, setOriginalBioText] = useState("no bio yet");
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    async function fetchUser() {
      const result = await userDetails(loginref.current);
      console.log(result);
      setOriginalImg(result.ProfilePic ?? "/img/default.png");
    }
    fetchUser();
  }, []);

  const handleImageUpload = async () => {
    //denne kjører på save.
    if (imgFile) {
      const result = await imgUpload(imgFile); //denne etter imgPath til pathen som returneres fra bakcenden.
      if (result?.value) {
        setOriginalImg(result.value);
        setErrorMsg("");
      } else if (result?.error) {
        setErrorMsg(result.error);
      }
    } else {
      setErrorMsg("No image selected for upload!");
    }
  };

  const cancelProfileChange = () => {
    const userConfirmed = window.confirm(
      "All changes will be deleted. Do you want to proceed?"
    );

    if (!userConfirmed) {
      return;
    }

    setImgPreview(null);
    setImgFile(null);
  };

  function handleSave() {
    handleImageUpload;
  }

  return (
    <div className="container justify-content-center custom-game-page-container">
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {loginref.current}
        </h2>
      </div>
      <div className="m-4">
        <UploadPic
          originalImg={originalImg}
          setImgFile={setImgFile}
          setImgPreview={setImgPreview}
          imgPreview={imgPreview}
          cancelImageChange={cancelProfileChange}
        />
        <EditBio bioText={bioText} setBioText={setBioText}
        originalBioText={originalBioText} setOriginalBioText={setOriginalBioText} />
        <EditBirthday />
        <EditCountry />
        <EditFaveGame />
      </div>
      <button onClick={handleSave} className="btn btn-primary mt-3">
        Save Changes
      </button>
      {errorMsg && <p style={{ color: "hsl(120, 30%, 35%)" }}>{errorMsg}</p>}
      <button onClick={cancelProfileChange} className="btn btn-primary mt-3">
        Cancel
      </button>
    </div>
  );
}

export default EditProfile;
