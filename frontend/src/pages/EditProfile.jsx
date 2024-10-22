import { checkBirthday } from "../utils/formControl";
import { imgUpload } from "../utils/imgUpload";
import { useState, useMemo, useEffect } from "react";
import UploadPic from "../components/EditProfile/UploadPic";
import EditBio from "../components/EditProfile/EditBio";
import EditBirthday from "../components/EditProfile/EditBirthday";
import EditCountry from "../components/EditProfile/EditCountry";
import EditFaveGame from "../components/EditProfile/EditFaveGame";
import { userDetails } from "../api/userDetails";
import { gamesAndGenres } from "../api/gamesAndGenres";

function EditProfile({ loginref, gameref, handlePageChange }) {
  const [imgFile, setImgFile] = useState(null);
  const [originalImg, setOriginalImg] = useState("/img/default.png");

  const [bio, setBio] = useState(null);
  const [originalBio, setOriginalBio] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [birthday, setBirthday] = useState(null);
  const [originalBirthday, setOriginalBirthday] = useState({
    Day: null,
    Month: null,
    Year: null,
  });

  const [country, setCountry] = useState(null)
  const [originalCountry, setOriginalCountry] = useState(null)

  const [faveGame, setFaveGame] = useState(null);
  const [originalFaveGame, setOriginalFaveGame] = useState(null)
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const result = await userDetails(loginref.current);
      const games = await gamesAndGenres();
      
      
      setOriginalImg(result.ProfilePic ?? "/img/default.png");
      setOriginalBio(result.Bio ?? null);
      setOriginalCountry(result.Country ?? '')
      setOriginalFaveGame(result.FaveGameTitle ?? '')

      const gamesOptions = games.map(game => ({
        value: game.Id,
        label: game.Title
      }));
  
      setAllGames(gamesOptions);

      if (result.Birthday) {
        const date = new Date(result.Birthday);
        setOriginalBirthday({
          day: date.getDate(), // Get the day
          month: date.getMonth() + 1, // Get the month (0-based index)
          year: date.getFullYear(), // Get the full year
        });
      } else {
        setOriginalBirthday({ day: null, month: null, year: null });
      }
    }
    fetchUser();
  }, []);

  const handleImageUpload = async () => {
    //denne kjører på save.
    if (imgFile) {
      const result = await imgUpload(imgFile); //denne etter imgPath til pathen som returneres fra bakcenden.
      if (result?.value) {
        setOriginalImg(result.value); //må endre denne sånn at den bare endres hvis originalImg ikke er der
        setErrorMsg("");
      } else if (result?.error) {
        setErrorMsg(result.error);
      }
    } else {
      setErrorMsg("No image selected for upload!");
    }
  };

 function handleBirthdayChange() {
    if (
      birthday.day !== originalBirthday.day ||
      birthday.month !== originalBirthday.month ||
      birthday.year !== originalBirthday.year
    ) {
      setOriginalBirthday(birthday);
  }
}

  function handleCountryChange() {
    if (country !== originalCountry) {
      setOriginalCountry(country) 
    }
  }

  function handleBioChange() {
    if (bio !== originalBio) {
      setOriginalBio(bio) 
    }
  }

  function handleFaveGameChange() {
    if (faveGame !== originalFaveGame) {
      setOriginalFaveGame(faveGame) 
    }
  }

  const cancelProfileChange = () => {
    const userConfirmed = window.confirm(
      "All changes will be deleted. Do you want to proceed?"
    );

    if (!userConfirmed) {
      return;
    }
    setImgFile(null);
    setBio(originalBio);
    setCountry(originalCountry);
    setBirthday(originalBirthday);
  };

  function handleSave() {
    handleImageUpload;
    handleBirthdayChange();
    handleCountryChange();
    handleBioChange();
    handleFaveGameChange()
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
        />
        <EditBio
          setBioText={setBio}
          originalBioText={originalBio}
        />
        <EditBirthday
          setBirthday={setBirthday}
          originalBirthday={originalBirthday}
        />
        <EditCountry setCountry = {setCountry} originalCountry= {originalCountry}/>
        <EditFaveGame setFaveGame = {setFaveGame} originalFaveGame= {originalFaveGame} allGames = {allGames}/>
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
