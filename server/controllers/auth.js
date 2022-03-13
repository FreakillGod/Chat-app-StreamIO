const crypto= require('crypto')
const bcrypt = require('bcrypt')
const {connect}= require('getstream')
const StreamChat= require('stream-chat').StreamChat  // .StreamChat compulsary

require('dotenv').config();

const api_key=process.env.STREAM_API_KEY;
const api_secret=process.env.STREAM_API_SECRET;
const app_id=process.env.STREAM_APP_ID;

const signup = async (req,res)=>{
    try {
        const {fullName, username, password, phoneNumber}= req.body;

        const userId= crypto.randomBytes(16).toString('hex');

        const serverClient= connect(api_key,api_secret,app_id);

        const hashedPassword=await bcrypt.hash(password,10);

        const token=serverClient.createUserToken(userId);

        res.status(200).json({token,fullName,username,userId,hashedPassword,phoneNumber})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}

const login = async(req,res)=>{
    try {
        
        const {username, password}=req.body;

        const serverClient=await connect(api_key,api_secret,app_id);

        const client=StreamChat.getInstance(api_key,api_secret)
        
        const {users}= client.queryUsers({name:username});
        console.log(users)

        if(!users.lenght){
            return res.status(400).json({message: 'user not found'})
        }

        const authenticatedUser= await bcrypt.compare(password,users[0].hashedPassword)

        const token=serverClient.createUserToken(users[0].id);

        if(authenticatedUser){
            res.status(200).json({token,fullName:users[0].fullName,userId:users[0],id})
        }else{
            res.status(500).json({message:'incorrect password'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}

module.exports={login,signup}