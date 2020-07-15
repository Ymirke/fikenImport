const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
  res.send('hello - this is test');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}. Link: http://localhost:${PORT}`);
});
