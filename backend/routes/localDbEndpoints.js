const express = require("express");
const sql = require("mssql");
const { dbCon, closeDbCon } = require("../dbcon.js");
const router = express.Router();
const bcrypt = require('bcrypt')

router.use(express.json());

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("username", sql.VarChar)

    const query =
      `SELECT Username, UserPassword FROM Users WHERE Username = @username`;

      await ps.prepare(query);
      const result = await ps.execute({ username });
  
      await ps.unprepare();

      if (result.recordset.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.recordset[0];
      const passwordMatch = await bcrypt.compare(password, user.UserPassword);

      if (passwordMatch) {
        return res.status(200).json({ message: "login successful" });
      } else {
        return res.status(401).json({ message: "invalid credentials" });
      }

  } catch (err) {
    console.error(err);
    res.status(500).send("database connection error");
  } finally {
    closeDbCon();
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("username", sql.VarChar)
    ps.input("hashedPassword", sql.VarChar)

    const userNameExistsQuery =
      `SELECT Username FROM Users WHERE Username = @username`;

      await ps.prepare(userNameExistsQuery);
      const userNameExists = await ps.execute({ username });
  
      await ps.unprepare();

      if (userNameExists.recordset.length !== 0) {
        return res.status(401).json({ message: "Username already exists" });
      }

    const insertQuery = `INSERT INTO USERS (Username, UserPassword) VALUES (@username, @hashedPassword)`;
    
    await ps.prepare(insertQuery);
    const result = await ps.execute({ username, hashedPassword });

    await ps.unprepare();

    return res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send("database connection error");

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

router.get("/userGamesByStatus", async (req, res) => {
  const { username } = req.query; //henter brukernavnet som blir sendt fra loginref i frontend

  if (!username) {
    return res.status(400).send("Must be logged in to view games");
  }

  try {
    await dbCon();
    const result =
      await sql.query`SELECT User_GameStatus.GameId, GameStatus.[Name]
                      FROM User_GameStatus
                      JOIN GameStatus ON User_GameStatus.StatusId = GameStatus.Id 
                      JOIN Users ON User_GameStatus.Username = Users.Username
                      WHERE User_GameStatus.Username = ${username}`;
    const games = result.recordset;

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/statusNames", async (req, res) => {
  try {
    await dbCon();
    const result =
      await sql.query`SELECT GameStatus.[Name], GameStatus.[Id]
                      FROM GameStatus`;

    const statuses = result.recordset;

    res.json(statuses);
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

    if (games.length > 0) res.json(games[0]);
    else res.status(404).send("Game not found");
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
    const result =
      await sql.query`SELECT [User_Id] ,Game_Id, Rating ,Comment, Finished, dnf
                                    FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
                                    WHERE Game_Id = ${gameId};`;
    const ratings = result.recordset;

    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.post("/postRatingComment", async (req, res) => {
  const { gameId, username, newRating, newComment, isFinished, isDNF } =
    req.body;

  try {
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("gameId", sql.Int);
    ps.input("username", sql.VarChar);
    ps.input("newRating", sql.Int);
    ps.input("newComment", sql.NVarChar);
    ps.input("isFinished", sql.Bit);
    ps.input("isDNF", sql.Bit);

    const checkQuery = ` SELECT [User_Id], Game_Id, Rating, Comment, Finished, dnf
      FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
      WHERE Game_Id = @gameId AND [User_Id] = @username;`;

    await ps.prepare(checkQuery);
    const result = await ps.execute({ gameId, username });
    await ps.unprepare();

    if (result.recordset.length > 0) {
      const updateQuery = ` UPDATE Game_Ratings_Comments
      SET Rating = @newRating, Comment = @newComment, Finished = @isFinished, dnf = @isDNF
      WHERE Game_Id = @gameId AND [User_Id] = @username;
      `;

      // console.log(isDNF)

      await ps.prepare(updateQuery);
      const resultUpdate = await ps.execute({
        gameId,
        username,
        newRating,
        newComment,
        isFinished,
        isDNF,
      });
      await ps.unprepare();

      if (resultUpdate.rowsAffected[0] > 0) {
        res.status(200).json({ message: `Rating updated successfully with` });
      } else
        res.json({
          message: "something went wrong when updating db 0, rows affected",
        });
    } else {
      const insertQuery = ` INSERT INTO Game_Ratings_Comments ([User_Id], Game_Id, Rating, Comment, Finished, dnf)
      Values(@username, @gameId, @newRating, @newComment, @isFinished, @isDNF)`;

      await ps.prepare(insertQuery);
      await ps.execute({
        gameId,
        username,
        newRating,
        newComment,
        isFinished,
        isDNF,
      });
      await ps.unprepare();

      if (insertQuery) {
        res.status(200).json({ message: `Rating updated successfully` });
      } else res.json({ message: "something went wrong when updating db" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.delete("/deleteUserRating", async (req, res) => {
  const { username, gameId } = req.body;

  try {
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("gameId", sql.Int);
    ps.input("username", sql.VarChar);

    const query = `DELETE FROM Game_Ratings_Comments WHERE Game_Id = @gameId AND [User_Id] = @username`;
    await ps.prepare(query);
    await ps.execute({ gameId, username });

    await ps.unprepare();
    res.status(200).send({ message: "Record deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.delete("/removeGameStatus", async (req, res) => {
  // console.log("Request body:", req.body);
  const { chosenStatus, gameId, username } = req.body;

  const getTableName = () => {
    switch (chosenStatus) {
      case "owned":
        return "User_OwnedGames";
        break;
      case "wishlist":
        return "User_Wishlist";
        break;
      case "played":
        return "User_HasPlayed";
        break;
      case "currentlyPlaying":
        return "User_CurrentlyPlaying";
        break;
      default:
        return null;
    }
  };

  const tableName = getTableName();
  if (!tableName) {
    return res.status(400).send("invalid status");
  }

  try {
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("gameId", sql.Int);
    ps.input("username", sql.VarChar);

    const query = `DELETE FROM ${tableName} WHERE Game_Id = @gameId AND [User_Id] = @username`;
    await ps.prepare(query);
    await ps.execute({ gameId, username });

    await ps.unprepare();
    res.status(200).send("Record deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.post("/addGameStatus", async (req, res) => {
  const { chosenStatus, gameId, username } = req.body;

  const getTableName = () => {
    switch (chosenStatus) {
      case "owned":
        return "User_OwnedGames";
        break;
      case "wishlist":
        return "User_Wishlist";
        break;
      case "played":
        return "User_HasPlayed";
        break;
      case "currentlyPlaying":
        return "User_CurrentlyPlaying";
        break;
      default:
        return null;
    }
  };

  const tableName = getTableName();
  if (!tableName) {
    return res.status(400).send("Invalid status");
  }
  try {
    const pool = await dbCon();
    const ps = new sql.PreparedStatement(pool);

    ps.input("gameId", sql.Int);
    ps.input("username", sql.VarChar);

    const query = `INSERT INTO [GameReviewExpressDb].[dbo].[${tableName}]
        VALUES (@username, @gameId);`;
    await ps.prepare(query);
    await ps.execute({ gameId, username });

    await ps.unprepare();
    res.status(200).send("Record added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/ratingsByGame", async (req, res) => {
  const { gameId } = req.query;

  try {
    await dbCon();
    // const pool = await dbCon();
    // const ps = new sql.PreparedStatement(pool);

    // ps.input("gameId", sql.Int);

    const result = await sql.query`SELECT Rating
                    FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
                    WHERE Game_Id = ${gameId}`;

    const ratingsArray = result.recordset.map((row) => row.Rating);

    // await ps.prepare(query);
    // const result =  await ps.execute({ gameId });

    res.status(200).json(ratingsArray);

    // await ps.unprepare();
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/userDetails", async (req, res) => {
  const { username } = req.query;
  try {
    await dbCon();
    const result =
      await sql.query` SELECT Users.[ImgPath] AS ProfilePic, Users.[Bio] , Users.[FavoriteGame_Id], 
                                    Users.[Birthday], Users.[Country], Games.[Title], Games.[ImgPath] AS FaveGamePic
                                    FROM [GameReviewExpressDb].[dbo].[Users]
                                    LEFT JOIN Games ON Games.Id= [Users].FavoriteGame_Id
                                    WHERE Username = ${username}
    `;
    const info = result.recordset[0];
    if (!info) {
      return res.status(404).json({ message: "User not found" });
    }
    // const birthday = info?.Birthday
    const responseObject = {
      ...info,
      Username: username,
      // Birthday: birthday ?? null,
    };

    res.status(200).json(responseObject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/genresForPieChart", async (req, res) => {
  const { username } = req.query;

  try {
    await dbCon();
    const result = await sql.query`SELECT g.Id, g.Title,
                              STRING_AGG(gen.Name, ', ') AS Genres
                        FROM Games g
                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                        JOIN Genres gen ON gg.Genre_Id = gen.Id
                        WHERE g.Id IN (
                            SELECT Game_Id FROM User_HasPlayed WHERE User_Id = ${username}
                        )
                        GROUP BY g.Id, g.Title
                        UNION
                        SELECT g.Id, g.Title, 
                              STRING_AGG(gen.Name, ', ') AS Genres
                        FROM Games g
                        JOIN Game_Genres gg ON g.Id = gg.Game_Id
                        JOIN Genres gen ON gg.Genre_Id = gen.Id
                        WHERE g.Id IN (
                            SELECT Game_Id FROM User_CurrentlyPlaying WHERE User_Id = ${username}
                        )
                        GROUP BY g.Id, g.Title
                        ORDER BY g.Title;
    `;
    const games = result.recordset;
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

router.get("/ratingsForBarChart", async (req, res) => {
  const { username } = req.query;

  try {
    await dbCon();

    const result = await sql.query`
      SELECT [User_Id], Game_Id, Rating 
      FROM [GameReviewExpressDb].[dbo].[Game_Ratings_Comments]
      WHERE [User_Id] = ${username};`;

    const ratings = result.recordset;

    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    closeDbCon();
  }
});

module.exports = router;
