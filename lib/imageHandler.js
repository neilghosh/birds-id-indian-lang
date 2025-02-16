var fs = require('fs');

function fileToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer,
        mimeType
      },
    };
  }
  
const handleImage = async (req, res, model) => {
   console.log(req.body);
    try {
      if (!(req.files || req.body.demo)) {
        const data = { message: "No file choosen." };
        res.render('index', data);
        return; 
      }
      const prompt = "Identify this bird and tell what are they called in various indian languages including Bangla and Odia etc. Try to give in indian language script";
      
      let imgBuffer;
      if(req.files) {
        imgBuffer = req.files.img.data.toString('base64');
        console.log(`Image size uploaded ${req.files.img.size}`);

      } else {
        imgBuffer = base64_encode("public/test.jpeg")
      }
   
      const imageParts = [
        fileToGenerativePart(imgBuffer, "image/jpeg")
      ];
  
      const generatedContent = await model.generateContent([prompt, ...imageParts]);
      const result = JSON.parse(generatedContent.response.text());
      //console.log(model);
      const message = model.model+" Says...";
      res.render('index', { birdData: result, message: message, imgBuffer: imgBuffer });
      return;
  
    } catch (error) {
      console.error("Error processing image:", error);
      const data = { message: "Error processing image." };
      res.render('index', data);
      return; 
    }
  };
  
  function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
  module.exports = { handleImage };