const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const shopifyToFiken = require('./shopifyToFiken');

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

app.post('/api/shopify', upload.single('file'), async (req, res) => {
  const filePath = await req.file.path;
  const apiKey = await req.body.apiKey;
  const companySlug = await req.body.companySlug;
  console.log(filePath, apiKey, companySlug);
  shopifyToFiken.fikenImport(apiKey, companySlug, filePath);
  res.status(201).send();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}. Link: http://localhost:${PORT}`);
});
