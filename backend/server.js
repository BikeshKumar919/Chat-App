import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes.js';
import connectToDb from './db/connectTodb.js';
import userrouter from './routes/user.routes.js';
import msgrouter from './routes/message.routes.js';
import {app,server} from './socket/socket.js';
dotenv.config();

const port = process.env.PORT;
//const app = express();


server.listen(port, () => {
  console.log('Server is running on port', port);
  connectToDb();
});


app.use(express.json());//middleware to parse json data from the request body
app.use(cookieParser());//middleware to parse cookies from the request headers
app.use('/api/auth', router);
app.use('/api/messages', msgrouter);
app.use('/api/users', userrouter);