const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path')
const bodyParser = require('body-parser');

const { setupGemini } = require('./lib/geminiSetup'); 
const { schema } = require('./lib/schema');
const { handleImage } = require('./lib/imageHandler');

const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));

const projectId = 'demoneil';
const apiKeyName = 'GEMINI_API_KEY';

let model;

// const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  data = { message: "" }
  res.render('index', data);
});

// app.listen(port, () => {
//   console.log(`Listening on http://localhost:${port}`);
// })


app.post('/', async (req, res) => {
  console.log(req.body);
  model = await setupGemini(projectId, apiKeyName, schema);
  await handleImage(req, res, model);
});

// (async () => {
// })();

module.exports = app;
