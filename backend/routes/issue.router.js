const express=require("express");
const issueController=require("../controllers/issueController");
const issueRouter=express.Router();
issueRouter.post("/issue/create",issueController.createIssue);
issueRouter.put("/issue/update",issueController.updateIssueById);
issueRouter.delete("/issue/delete",issueController.deleteIssueById);
issueRouter.get("/issue/all",issueController.getAllIsues);
issueRouter.get("/issue/:id",issueController.getIssueById);
module.exports=issueRouter;