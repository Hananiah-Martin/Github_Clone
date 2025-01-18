const mongoose=require("mongoose");
const {Schema}=mongoose;
const userSchema=new Schema({
    username:{
        type:String,
        requied:true,
        unique:true,
    },
    email:{
        type:String,
        requied:true,
        unique:true,
    },
    password:{
        type:String,
    },
    repositories:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository",
        }
    ],
    followedUsers:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            res:"User",
        }
    ],
    description:{
        type:String,
    },
})
const User=mongoose.model("User",userSchema);
module.exports=User;