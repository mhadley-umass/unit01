import express from 'express';
import apiRouter from './routes/api.js';

const app = express();
app.set("view engine", "ejs");
const PORT = 3000;

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello, web!');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/repeat/:word', (req, res) => {
  const word = req.params.word;
  res.send(`${word} ${word} ${word}`);
});

app.get('/count/', (req, res) => {
  const from = req.query.from || 1;
  const to = parseInt(req.query.to) || 10;
  res.send(`Counting from ${from} to ${to}`);
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'Web Programming Course', version: '1.0.0' });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get('/api/error', (req, res) => {
  res.json({ status: 400, message: 'Bad request' });
});

app.get('/broken', (req, res) => {
  const user = undefined;
  res.send(user.name);
});

app.get('/search', (req, res) => {
  const term = req.query.term || 'nothing';
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

