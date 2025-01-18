const mongoose=require("mongoose");
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel");
async function update(req,res){
    try{
        const result=User.updateMany({},{
            $unset:{starRepos:" "},
        });
    }catch(err){
        console.error("Error during updating : ",err.message);
        res.status(500).send("Server error");
    }
}
async function createRepository(req,res){
    const {name,description,content,visibility,owner,issues}=req.body;
    try {
        if(!name){
            res.status(400).json({message:"Repository name required"});
        }
        const newRepository=new Repository({
            name,
            description,
            content,
            visibility,
            owner,
            issues
        })
        const result=await newRepository.save();
        res.status(201).json({message:"New Repository created",repositoryId:result._id});
    } catch (error) {
        console.error("Error during creating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function getAllRepositories(req,res){
    try {
        const repositories=await Repository.find({}).populate("owner").populate("issues");
        res.json(repositories);
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function fetchRepositoryById(req,res){
    const repoId=req.params.id;
    try {
        const repository=await Repository.find({_id:repoId}).populate("owner").populate("issues");
        res.json(repository);
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function fetchRepositoryByName(req,res){
    const repoName=req.params.name;
    try {
        const repository=await Repository.find({name:repoName}).populate("owner").populate("issues");
        res.json(repository);
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function fetchRepositoryForCurrentUser(req,res){
    const user=req.params.userId;
    try {
        const repository=await Repository.find({owner:user}).populate("owner").populate("issues");
        res.json({message:"Repositories found",repository});
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function updateRepositoryById(req,res){
    const repoId=req.params.id;
    const {name,description,visibility}=req.body;
    try {
        const repository=await Repository.findById(repoId);
        if(!repository){
            res.status(404).json({message:"Repository not found"});
        }
        repository.name=name;
        repository.description=description;
        repository.visibility=visibility;
        const updatedRepo=await repository.save();
        res.json({message:"Repository updated succesffuly",
                repository:updatedRepo});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function toggleVisibilityById(req,res){
    const repoId=req.params.id;
    try {
        const repository=await Repository.find({_id:repoId});
        repository.visibility=!repository.visibility;
        const updatedRepo=await repository.save();
        res.json({message:"visibility toggled succesffuly",
                repository:updatedRepo});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function deleteRepositoryById(req,res){
    const repoId=req.params.id;
    try {
        const repository=await Repository.findByIdAndDelete(repoId);
        res.json({message:"Repository deleted succesffuly",repository});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function updateReadme(req,res){
    const {repoId,readMe}=req.body;
    try {
        const repository=await Repository.findById(repoId);
        repository.readMe=readMe;
        const updatedRepo=await repository.save();
        res.json({message:"Readme updated succesffuly",
                repository:updatedRepo});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function starRepo(req,res){
    const {repoId,userId}=req.body;
    try {
        const user=await User.findById(userId);
        const repo=await Repository.findById(repoId);
        if(!user){
            res.json({message:"User not found"});
        }
        user.repositories.push(repoId);
        repo.isStarrred=true;
        await repo.save();
        const updatedUser=await user.save();
        res.json({message:"Repository starred succesfully",
                user:updatedUser});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function unstarRepo(req,res){
    const {repoId,userId}=req.body;
    try {
        const user=await User.findById(userId);
        const repo=await Repository.findById(repoId);
        if(!user){
            res.json({message:"User not found"});
        }
        const index=user.repositories.indexOf(repoId);
        user.repositories.splice(index,1);
        repo.isStarrred=false;
        await repo.save();
        const updatedUser=await user.save();
        res.json({message:"Repository starred succesfully",
                user:updatedUser});
    } catch (error) {
        console.error("Error during updating : ",error.message);
        res.status(500).send("Server error");
    }
}
module.exports={
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
    update,
    updateReadme,
    starRepo,
    unstarRepo
}