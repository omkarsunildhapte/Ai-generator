const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const router = require('./app/routes/router');
app.use(express.json({ limit: '10mb' })); 

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use('/api/', router);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON payload', status: 400 });
  } else {
    next();
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
