import express from 'express';
import { styleText } from 'node:util';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  console.log(styleText(['green', 'bold'], 'GET: /'));

  res.send('hello world!! 👽');
});

app.listen(PORT, (error) => {

  if (error) {
    console.error('error: ', error);
    process.exitCode = 1;
    return;
  }

  console.log(`server running at http://localhost:${PORT}`);
});