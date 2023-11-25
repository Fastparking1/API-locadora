// app.js
const express = require('express');
const bodyParser = require('body-parser');
const filmesRouter = require('./routes/filmes');

const app = express();

app.use(bodyParser.json());

app.use('/filmes', filmesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
