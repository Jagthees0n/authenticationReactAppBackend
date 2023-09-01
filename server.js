import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from './models/User';

await mongoose.connect('mongodb://localhost:27017/auth', 
{useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.log);

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({extended:true}));

app.get('/',(req, res)=>{
    res.send('Ok');
});

app.post('/register', (req, res)=>{
    const {email, password} = req.body;
    const user = User
})

app.listen(4000);