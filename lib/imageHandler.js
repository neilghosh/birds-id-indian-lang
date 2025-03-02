var fs = require('fs');

function fileToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer,
        mimeType
      },
    };
  }
  
const handleImage = async (files, model) => {
    try {
      if (!(files)) {
        const data = { message: "No file choosen."};
        // res.render('index', data);
        return data; 
      }
      const prompt = "Identify this bird and tell what are they called in various indian languages including Bangla and Odia etc. Try to give in indian language script";
      
      let imgBuffer;
      if(files) {
        imgBuffer = files.img.data.toString('base64');
        console.log(`Image size uploaded ${files.img.size}`);

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
      //res.render('index', );
      return { birdData: result, message: message, imgBuffer: imgBuffer };
  
    } catch (error) {
      console.error("Error processing image:", error);
      const data = { message: "Error processing image." };
      // res.render('index', );
      return data; 
    }
  };
  
  function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
  module.exports = { handleImage };