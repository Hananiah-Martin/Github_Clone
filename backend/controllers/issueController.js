const mongoose=require("mongoose");
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel")
async function createIssue(req,res){
    const {title,description,status,repoId}=req.body;
    const repo=await Repository.findById(repoId);
    try {
        const newIssue=new Issue({
            title,
            description,
            status,
            repository:repoId
        })
        repo.issues.push(newIssue);
        await repo.save();
        const result=await newIssue.save();
        res.status(201).json({message:"New Issue created",issueId:result._id});
    } catch (error) {
        console.error("Error during creating : ",error.message);
        res.status(500).send("Server error");
    }
}
async function  updateIssueById(req,res){
    const {title,description}=req.body;
    const issues=await Issue.findOne({title:title});
    const issueId=issues._id;
    try {
        const issue=await Issue.findById(issueId);
        issue.title=title;
        issue.description=description;
        await issue.save();
        res.json({message:"issue updated",issue:issue});
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function deleteIssueById(req,res){
    const { title } = req.query;
    const issues=await Issue.findOne({title:title});
    const issueId=issues._id;
    try {
        const issue=await Issue.findByIdAndDelete(issueId);
        res.json({message:"Repository deleted succesffuly",issue:issue});
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function  getAllIsues(req,res){
    try {
        const issues=await Issue.find({}).populate("repository");
        res.json(issues);
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
async function  getIssueById(req,res){
    const issueId=req.params.id;
    try {
        const issue=await Issue.find({_id:issueId}).populate("repository");
        res.json(issue);
    } catch (error) {
        console.error("Error during fetching : ",error.message);
        res.status(500).send("Server error");
    }
}
module.exports={
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIsues,
    getIssueById
}