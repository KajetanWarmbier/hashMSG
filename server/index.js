import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

// const aleph = require('aleph-js');

const app = express();
const port = 4567;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
