const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const {MongoClient, ReturnDocument}=require("mongodb");
const dotenv=require("dotenv");
const User = require("../models/userModel");
var ObjectId=require('mongodb').ObjectId;
dotenv.config();
const uri=process.env.MONGO_URL;
let client;
async function connectClient() {
    if(!client){
        client=new MongoClient(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    }
    await client.connect();
}
async function getAllUsers(req,res){
    try{
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const users=await usersCollection.find({}).toArray();
        res.json(users);
    }catch(err){
        console.log("error during fecthing : ",err.message);
        res.status(500).send("Server error");
    }
}
async function update(req,res){
    try {
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const result=await usersCollection.updateMany(
            {},
            {
                $set: { description: "No Description" }
            }
        );
    } catch (error) {
        console.log("error during updating : ",err.message);
    }
   
}
async function signup(req,res){
    console.log("i am in signup");
    const {username,password,email}=req.body;
    try{
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const user=await usersCollection.findOne({username});
        if(user){
            return res.status(400).json(({message:"User Already exists"}));
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser={
            username,
            password:hashedPassword,
            email,
            repositories:[],
            followedUsers:[],
            starRepos:[]
        }
        const result=await usersCollection.insertOne(newUser);
        const token=jwt.sign({id:result.insertId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        console.log(result);
        res.json({token,userId:result.insertedId});
    }catch(err){
        console.error("Error during singup : ",err.message);
        res.status(500).send("server error");
    }
}
async function login(req,res){
    console.log("I am in login")
    const {email,password}=req.body;
    try{
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const user=await usersCollection.findOne({email}); 
        if(!user){
            return res.status(400).json(({message:"Invalid credentials"}));
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token,userId:user._id});
    }catch(err){
        console.error("Error during login :",err.message);
        res.status(500).send("server error");
    }
}
async function getUserProfile(req,res){
    const currentId=req.params.id;
    try{
        const user=await User.findById(currentId).populate("repositories");
        if(!user){
            return res.status(404).json(({message:"User not found"}));
        }
        res.send(user);
    }catch(err){
        console.error("error during fecthing : ",err.message);
        res.status(500).send("Server error");
    }
}
async function  updateUserProfile(req,res){
    const {username,description,email,userId}=req.body;
    const currentId=userId;
    try{
        let updateFields={username,description,email};
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const result=await usersCollection.findOneAndUpdate(
            {_id:new ObjectId(currentId)},
            {$set:updateFields},
            {ReturnDocument:"after"}
        )
        if(!result){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User updated successfully",user:result});

    }catch(err){
        console.error("Error updating the profile:",err.message);
        res.status(500).send("Server error");
    }
}

async function deleteUserProfile(req,res){
    const currentId=req.params.id;
    try{
        await connectClient();
        const db=client.db("githubclone");
        const usersCollection=db.collection("users");
        const result=await usersCollection.deleteOne({
            _id:new ObjectId(currentId)
        })
        if(!result.deleteCount==0){
            return res.status(400).json({message:"User not found"});
        }
        res.json({message:"User profile deleted"});
    }catch(err){
        console.error("Error deleting the profile:",err.message);
        res.status(500).send("Server error");
    }
}
module.exports={
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    update
}