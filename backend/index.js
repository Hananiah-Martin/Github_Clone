const yargs= require("yargs");
const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const http=require('http');
const{Server}=require('socket.io');
dotenv.config();
const mainRouter=require("./routes/main.router.js")
const {hideBin}=require("yargs/helpers");
const exp = require("constants");
const {initRepo}=require("../backend/controllers/init.js")
const {commitRepo}=require("../backend/controllers/commit.js")
const {addRepo}=require("../backend/controllers/add.js");
const userController=require("../backend/controllers/userController.js")
yargs(hideBin(process.argv))
.command(
    "start","Starts a new Server",{},startServer
)
.command(
    "init",
    "Initialize a new repository",
    {},
    initRepo
).command("add <file>",
    "Add new file to the repository",
    (yargs)=>{
        yargs.positional("file",{
            describe:"file to add to the staging area",
            type:"string",
        });
    },
    (argv)=>{
        addRepo(argv.file);
    }
).command("commit <message>","Commit the staged files",(yargs)=>{
    yargs.positional("message",{
        describe:"Commit message",
        type:"string"
    });
    },
    (argv)=>{
        commitRepo(argv.message);
    }
).demandCommand(1,"You need at least one command")
.help().argv;
function startServer(){
    const app=express();
    const port=process.env.PORT||3000;
    app.use(bodyParser.json());
    app.use(express.json());
    const mongoUrl=process.env.MONGO_URL;
    mongoose.connect(mongoUrl).then(()=>{
        console.log("Connected to database suucessfully");
    }).catch((err)=>{
        console.log("Error connecting to database ",err);
    })
    app.use(cors({origin:"*"}));
    app.use("/",mainRouter);
    let user="test";
    const httpServer=http.createServer(app);
    const io=new Server(httpServer,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })
    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
            user=userID;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(userID);
        });
    })
    const db=mongoose.connection;
    db.once("open",async()=>{
        console.log("CRUD operations called");
        //CRUD Operations
    })
    httpServer.listen(port,()=>{
        console.log(`Server is running on PORT ${port}`)
    })
}