const express = require("express");
const axios = require("axios");
const db = require("./database/dbConfig");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

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

    // Get random 100 names from table
    const randomNames = await db
      .select("*")
      .from("users")
      .orderByRaw("RANDOM()")
      .limit(100);

    res.json(randomNames);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post("/", async (req, res) => {
  const { userId, phone, email } = req.body;
  try {
    await db("users")
      .where({ id: userId })
      .update({ phone: phone, email: email });

    const updatedUser = await db("users")
      .select("*")
      .where({ id: userId });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
