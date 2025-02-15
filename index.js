const app = require('./server'); // Assuming your main app logic is in index.js

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});