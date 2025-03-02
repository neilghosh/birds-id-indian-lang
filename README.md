# UI and API for Bird ID using Gemini 

This is a simple API and UI for identifying bird names and their names in Indian languages using Google Gemini API

## UI
![alt text](.tests/demo.gif)

## API 
It assumes the following contract 

### Request 
```
curl -v -X POST \
  -F "img=@test.jpeg" \
https://idx-simple-node-3987408-b3zzuedwgq-el.a.run.app/api
```

### Response 
```
{
  "birdData": {
    "bird_name": "Indian Roller",
    "indian_languages": [
      {
        "language": "Hindi",
        "value": "नीलकंठ"
      },
      {
        "language": "Bengali",
        "value": "নীলকণ্ঠ"
      },
      {
        "language": "Odia",
        "value": "ଭଦଭଦଳିଆ"
      },
      {
        "language": "Tamil",
        "value": "பனங்காடை"
      },
      {
        "language": "Telugu",
        "value": "పాల పిట్ట"
      },
      {
        "language": "Kannada",
        "value": "ನೀಲಕಂಠ"
      },
      {
        "language": "Marathi",
        "value": "नीलकंठ"
      },
      {
        "language": "Gujarati",
        "value": "નીલકંઠ"
      },
      {
        "language": "Malayalam",
        "value": "ഭാരതീയ നീലത്തൊപ്പി"
      }
    ],
    "scientific_name": "Coracias benghalensis"
  },
  "message": "models/gemini-2.0-flash Says...",
  "imgBuffer": "/9j/4AAQSkZJRgABAQAAAQABAAD..."
}
```

## Getting Started

Previews should run automatically when starting a workspace. Run the `Show Web Preview` IDX command to see the preview.