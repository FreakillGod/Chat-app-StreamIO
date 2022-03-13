const express = require('express');
const cors= require('cors');

const authRoutes=require('./routes/auth.js')

require('dotenv').config();

const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/auth',authRoutes)

const Port=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(Port,()=>console.log(`server is running on port ${Port}...`))
