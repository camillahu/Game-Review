import { createContext, useRef } from "react";


function updateView(page, loginref, gameref, handlePageChange) {

    switch (page) {
      case "login":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <LogIn />
          </contextStuff.Provider>
        );
        break;
      case "home":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <Home />
          </contextStuff.Provider>
        );

        break;
      case "signup":
        return (
          <contextStuff.Provider value={{ loginref, handlePageChange }}>
            <SignUp />
          </contextStuff.Provider>
        );

      case "myGames":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <MyGames loginref={loginref} handlePageChange={handlePageChange} />
          </contextStuff.Provider>
        );

      case "gamePage":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <GamePage />
          </contextStuff.Provider>
        );
        break;

      case "profile":
        return (
          <contextStuff.Provider
            value={{ loginref, gameref, handlePageChange }}
          >
            <Profile />
          </contextStuff.Provider>
        );
        break;

      case "editProfile":
        return (
          <EditProfile
            loginref={loginref}
            gameref={gameref}
            handlePageChange={handlePageChange}
          />
        );
        break;

      default:
        return console.log("error changing page");
    }
  }

export default updateView;
export const contextStuff = createContext();
