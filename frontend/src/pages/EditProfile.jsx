import { checkBirthday } from "../utils/formControl";
import { useState, useMemo } from "react";
import UploadPic from "../components/EditProfile/UploadPic";
import EditBio from "../components/EditProfile/EditBio";
import EditBirthday from "../components/EditProfile/EditBirthday";
import EditCountry from "../components/EditProfile/EditCountry";


function EditProfile({ loginref, gameref, handlePageChange }) {

  

  return (
    <div
      className="container justify-content-center custom-game-page-container"
      
    >
      <div className="d-flex justify-content-between align-items-center mb-3 ps-3 pe-3 p-1 border-bottom border-secondary">
        <h2
          className="display-5"
          style={{ color: "HSL(30, 20%, 85%)", fontWeight: 500 }}
        >
          {loginref.current}
        </h2>
      </div>
      <div className="m-4">
        <UploadPic />
        <EditBio />
        <EditBirthday />
        <EditCountry />

      </div>
    </div>
  );
}

export default EditProfile;
