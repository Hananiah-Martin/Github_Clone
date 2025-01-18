const fs = require("fs").promises;
const path = require("path");
const {promisify}=require("util");
const readdir=promisify(fs.readdir);
const copyFile=promisify(fs.copyFile);
async function revertRepo(commitID){
    const repoPath=path.resolve(process.cwd(),".myGit");
    const commitPath=path.join(repoPath,"commit");
    try{
        const commitDir=path.join(commitPath,commitID);
        const files=await readdir(commitDir);
        const parentDir=path.resolve(repoPath,"..");
        for(const file of files){
            await copyFile(path.join(commitDir,file),path.join(parentDir,file));
        }
        console.log(`Commit ${commitID} reverted Successfully`);
    }catch(err){
        console.log("Unable to revert the changes ",err);
    }
}
module.exports={revertRepo}