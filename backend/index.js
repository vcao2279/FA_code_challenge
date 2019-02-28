const express = require("express");
const axios = require("axios");
const db = require("./database/dbConfig");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    //remove all records from table
    await db("users").truncate();

    //Since uinames.com/api only return a maximum of 500 names, run 2 times to get 1000 names.
    for (let i = 0; i < 2; i++) {
      const { data } = await axios({
        url: "https://uinames.com/api",
        params: {
          amount: 500,
          region: "United States"
        }
      });

      // Create an array of names
      const names = data.map(user => {
        return { name: user.name };
      });

      // Insert names into database
      await db.batchInsert("users", names);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
