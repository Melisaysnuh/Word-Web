import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()


const app = express();

const port = process.env.PORT


app.use(express.static(path.join(__dirname, 'client', 'dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
