const express = require('express');
const path = require('path')
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const projectId = "demoneil";
const secretId = "GEMINI_API_KEY";
const secretName = `projects/${projectId}/secrets/${secretId}/versions/latest`; 
const setupGemini = async function() {
  const client = new SecretManagerServiceClient({});
  const [version] = await client.accessSecretVersion({ name: secretName });

    // Extract the payload as a string.
    if (!version.payload || !version.payload.data) {
      throw new Error('Secret payload is empty or undefined.');
    }
    const payload = version.payload.data.toString();
  
  const genAI = new GoogleGenerativeAI(payload);
  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      bird_name: {
        type: SchemaType.STRING,
        nullable: false,
      },
      scientific_name: {
        type: SchemaType.STRING,
        nullable: false,
      },
      indian_languages: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            language: { "type": "STRING" },
            value: { "type": "STRING" },
          }
        }
      },
    },
    required: ["indian_languages", "bird_name", "scientific_name"]
  };
  model = genAI.getGenerativeModel({
    model: "gemini-pro", generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    },
  })
}

// Call start
let model;
setupGemini();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  data = { message: "Upload a bird photo." }
  res.render('index', data);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer,
      mimeType
    },
  };
}

app.post('/', async (req, res) => {
  try {
    if (!req.files) {
      //return res.status(400).send('No file uploaded.');
      data = { message: "No file choosen." }
      res.render('index', data);
    }
    else {
      const prompt = "Indentify the bird and give its name in all indian languages including translation in bangla, odiya and hindi. return in json format "
      console.log(req.files.img);
      const imgBuffer = req.files.img.data.toString('base64');
      const imageParts = [
        fileToGenerativePart(imgBuffer, "image/jpeg")
      ];

      const generatedContent = await model.generateContent([prompt, ...imageParts]);
      const result = JSON.parse(generatedContent.response.text());
      console.log(result);
      const message = "Tried my best to recognize following";
      res.render('index', { birdData: result, message: message, imgBuffer: imgBuffer });

    }
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send('Error processing image.');
  }
});
