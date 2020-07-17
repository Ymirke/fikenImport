const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const fiken = require('./fiken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/import', upload.single('file'), async (req, res) => {
  const path = await req.file.path;
  const apiKey = await req.body.apiKey;
  const companySlug = await req.body.companySlug;
  console.log(path, apiKey, companySlug);
  fiken.fikenImport(apiKey, companySlug, path);
  res.status(201).send();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}. Link: http://localhost:${PORT}`);
});
