import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "somdoi"; // Replace with your actual username
const yourPassword = "65160382"; // Replace with your actual password
const yourAPIKey = "3bdace3b-07f6-4e1b-9755-6d446359be91"; // Replace with your actual API key
const yourBearerToken = "f3d28037-b9a4-4ffc-aef6-43e3686ce084"; // Replace with your actual bearer token

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter?apiKey=${yourAPIKey}&embarrassmentScore=5`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/42`, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
