import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import customerService from './routes/CustomerService.js';
import notFound  from './middleware/not-found.js';
import errorHandler from  './middleware/error-handler.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.static('./public'));
app.use(express.json());

// api
app.use('/api/v1/customer_service', customerService);

app.use(notFound);
app.use(errorHandler);

connectDB(process.env.MONGO_URI);

app.listen(port, function () {
  console.log(`Server running on port ${port}!`);
})
