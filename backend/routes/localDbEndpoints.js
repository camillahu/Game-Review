const express = require("express");
const sql = require("mssql");
const { dbCon, closeDbCon } = require("../dbcon.js");
const router = express.Router();
const cors = require("cors");

router.use(cors());
router.use(express.json());

router.get("/allGames", async (_, res) => {
  // res er et objekt sender respons tilbake til klienten
  try {
    await dbCon();
    const result = await sql.query("SELECT * FROM dbo.Games"); // result er resultatet av sql-spørringen
    res.json(result.recordset);
    // sender responsen som json til klienten. recordset er et
    // property av result som inneholder radene som blir returnert av spørringen. Det er en array av objekter hvor hvert objekt representerer en rad med data.
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // bruker object destructoring til å hente ut username og password som blir sendt fra klienten.
    await dbCon();

    const result =
      await sql.query`SELECT * FROM Users WHERE Username = ${username}`; //mssql sin query gjør det trygt å bruke parameteret slikt i følge chatgpt.
    const user = result.recordset[0]; //her brukes recordset til å hente ut kun en verdi som er det vi forventer.

    if (user) {
      if (password === user.UserPassword) {
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("database connection error");
  } finally {
    closeDbCon();
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    await dbCon();

    const userNameExists = async (username) => {
      const usernameExistsResult =
        await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
      return usernameExistsResult.recordset.length > 0;
    };
    if (await userNameExists(username)) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      const result =
        await sql.query`INSERT INTO USERS (Username, UserPassword) VALUES (${username}, ${password})`;
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("database connection error");
    // return res.status(500).send('Internal Server Error');
  } finally {
    closeDbCon();
  }
});

router.get("/games", async (_, res) => {
  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                        STRING_AGG(gen.Name, ', ') AS Genres
                                        FROM Games g
                                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                        JOIN Genres gen ON gg.Genre_Id = gen.Id
                                        GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                        ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/genres", async (_, res) => {
  try {
    await dbCon();
    const result = await sql.query`Select Id, Name FROM Genres ORDER BY Id`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/allUserGames", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                        STRING_AGG(gen.Name, ', ') AS Genres
                                        FROM Games g
                                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                        JOIN Genres gen ON gg.Genre_Id = gen.Id
										WHERE g.Id IN (
										SELECT Game_Id FROM User_HasPlayed WHERE User_Id = ${username}
										UNION
										SELECT Game_Id FROM User_OwnedGames WHERE User_Id = ${username}
										UNION
										SELECT Game_Id FROM User_CurrentlyPlaying WHERE User_Id = ${username}
										UNION
										SELECT Game_Id FROM User_Wishlist WHERE User_Id = ${username}
									)
                                        GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                        ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/ownedUserGames", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                        STRING_AGG(gen.Name, ', ') AS Genres
                                        FROM Games g
                                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                        JOIN Genres gen ON gg.Genre_Id = gen.Id
										WHERE g.Id IN (
										SELECT Game_Id FROM User_OwnedGames WHERE User_Id = ${username}
									)
                                        GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                        ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/wishlistUserGames", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                        STRING_AGG(gen.Name, ', ') AS Genres
                                        FROM Games g
                                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                        JOIN Genres gen ON gg.Genre_Id = gen.Id
										WHERE g.Id IN (
										SELECT Game_Id FROM User_Wishlist WHERE User_Id = ${username}
									)
                                        GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                        ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/playedUserGames", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                          STRING_AGG(gen.Name, ', ') AS Genres
                                          FROM Games g
                                          JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                          JOIN Genres gen ON gg.Genre_Id = gen.Id
                                          WHERE g.Id IN (
                                          SELECT Game_Id FROM User_HasPlayed WHERE User_Id = ${username}
                                      )
                                          GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                          ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/currentlyPlayingUserGames", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath, 
                                          STRING_AGG(gen.Name, ', ') AS Genres
                                          FROM Games g
                                          JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                          JOIN Genres gen ON gg.Genre_Id = gen.Id
                                          WHERE g.Id IN (
                                          SELECT Game_Id FROM User_CurrentlyPlaying WHERE User_Id = ${username}
                                      )
                                          GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.ImgPath
                                          ORDER BY g.Title`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/gameDetails", async (req, res) => {
  const { gameId } = req.query;
  try {
    await dbCon();
    const result =
      await sql.query`Select g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.Rating, g.ImgPath, 
                                          STRING_AGG(gen.Name, ', ') AS Genres
                                          FROM Games g
                                          JOIN Game_Genres gg ON g.Id = gg.Game_Id
                                          JOIN Genres gen ON gg.Genre_Id = gen.Id
										                      WHERE g.Id = ${gameId}
                                          GROUP BY g.Id, g.Title, g.Developer, g.Publisher, g.ReleaseDate, g.rating, g.ImgPath`;
    const games = result.recordset;
    
    if(games.length > 0) res.json(games[0]);
    else res.status(404).send('Game not found');
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/gameDetailsCommunity", async (req, res) => {
  const { gameId } = req.query;
  try {
    await dbCon();
    const result = await sql.query`SELECT [User_Id] ,Game_Id, Rating ,Comment
                                    FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
                                    WHERE Game_Id = ${gameId};`;
    const games = result.recordset;

    res.json(games);
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/gameDetailsUser", async (req, res) => {
  const { gameId, username } = req.query;
  
  try {
    await dbCon();
    
    const result = await sql.query`
      SELECT [User_Id], Game_Id, Rating, Comment
      FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
      WHERE Game_Id = ${gameId} AND [User_Id] = ${username};`;

    const games = result.recordset;

    if (games.length > 0) {
      res.json(games[0]);
    } else {
      res.json({
        User_Id: username,
        Game_Id: gameId,
        Rating: null,
        Comment: null
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.post('/postRatingComment', async (req, res) => {
  const {gameId, username, newRating, newComment} = req.body;
  try {
    await dbCon();
    
    const checkQuery = await sql.query`
      SELECT [User_Id], Game_Id, Rating, Comment
      FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
      WHERE Game_Id = ${gameId} AND [User_Id] = ${username};`;

    

    if(checkQuery.recordset.length > 0) {
      const updateQuery = await sql.query`
      UPDATE Game_Ratings_Comments
      SET Rating = ${newRating}, Comment = ${newComment}
      WHERE Game_Id = ${gameId} AND [User_Id] = ${username};
      `

      if (updateQuery.rowsAffected[0] > 0) {
        res.status(200).json({ message: `Rating updated successfully with` });
      } else res.json({message: 'something went wrong when updating db 0, rows affected'})
    }
    else {
      const insertQuery = await sql.query`
      INSERT INTO Game_Ratings_Comments ([User_Id], Game_Id, Rating, Comment)
      Values(${username},${gameId}, ${newRating}, ${newComment})`

      if (insertQuery) {
        res.status(200).json({ message: `Rating updated successfully with` });
      } else res.json({message: 'something went wrong when updating db'})
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon(); 
  }
})


module.exports = router;
