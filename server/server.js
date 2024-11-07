import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});
// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
