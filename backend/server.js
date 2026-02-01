
const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors()); 
app.use(express.json()); 


let games = [];
let id = 1;


app.post("/games", (req, res) => {
  const { name } = req.body;
  

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Game name is required" });
  }

  const game = { id: id++, name: name.trim() };
  games.push(game);
  res.status(201).json(game);
});


app.get("/games", (req, res) => {
  res.json(games);
});


app.put("/games/:id", (req, res) => {
  const { name } = req.body;
  

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Game name is required" });
  }


  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  game.name = name.trim();
  res.json(game);
});


app.delete("/games/:id", (req, res) => {

  const initialLength = games.length;
  games = games.filter(g => g.id !== parseInt(req.params.id));
  

  if (games.length === initialLength) {
    return res.status(404).json({ error: "Game not found" });
  }
  
  res.json({ message: "Game deleted successfully" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/games`);
});