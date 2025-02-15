function fileToGenerativePart(buffer, mimeType) {
    return {
      inlineData: {
        data: buffer,
        mimeType
      },
    };
  }
  
const handleImage = async (req, res, model) => {
    try {
      if (!req.files) {
        const data = { message: "No file choosen." };
        res.render('index', data);
        return; 
      }
      console.log(`Image size uploaded ${req.files.img.size}`);
      const prompt = "Indentify the bird and give its name in all Indian languages including bangla, odiya and hindi.";
      
      const imgBuffer = req.files.img.data.toString('base64');
      const imageParts = [
        fileToGenerativePart(imgBuffer, "image/jpeg")
      ];
  
      const generatedContent = await model.generateContent([prompt, ...imageParts]);
      const result = JSON.parse(generatedContent.response.text());
      console.log(result);
      const message = "Tried my best to recognize following";
      res.render('index', { birdData: result, message: message, imgBuffer: imgBuffer });
      return;
  
    } catch (error) {
      console.error("Error processing image:", error);
      const data = { message: "Error processing image." };
      res.render('index', data);
      return; 
    }
  };
  
  module.exports = { handleImage };