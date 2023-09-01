import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

await mongoose.connect('mongodb://127.0.0.1:27017/auth', 
{useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.log);

const app = express();
const secret = "Mohan123";

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials (cookies, headers)
  };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));

app.get('/',(req, res)=>{
    res.send('Ok');
});

app.post('/register', (req, res)=>{
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    const user = new User({
        email,
        password : hashedPassword
    });
    user.save().then(userInfo => {
        jwt.sign({id : userInfo._id, email : userInfo.email}, secret, (err, token)=>{
            if(err){
                console.log(err);
                res.send(500);
            }else{
                res.cookie('token', token).json({id : userInfo._id, email : userInfo.email});
            }
        })
    })
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});