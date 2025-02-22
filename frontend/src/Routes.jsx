import React, { useEffect } from "react";
import {useNavigate,useRoutes,useLocation} from 'react-router-dom'
import Dashboard from "./components/dashboard/Dashboard"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import NewRepo from "./components/UI/NewRepo/NewRepo";
import RepositoryList from "./components/UI/AllRepoPage/RepositoryList"
import StarredRepo from "./components/UI/StarredeRepo/StarredRepo";
import { useAuth } from "./AuthContext";
import Repository from "./components/UI/RepoPage/Repository";
import IssuesUI from "./components/issue/IssuePage";
import IssueForm from "./components/issue/IssueForm";
import ProfileHeader from "./components/dashboard/ProfileHeader";
const ProjectRoutes=()=>{
    const {currentUser,setCurrentUser}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const userIdFromStorage=localStorage.getItem("userId");
        if(userIdFromStorage&&!currentUser){
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage&&["/auth"].includes(location.pathname)){
            navigate("/auth");
        }
        if(!userIdFromStorage&&["/singup"].includes(location.pathname)){
            navigate("/signup");
        }
        if(userIdFromStorage&&location.pathname=="/auth"){
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);
    let element=useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        }
        ,
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/new",
            element:<NewRepo/>
        },
        {
            path:"/allRepo",
            element:<RepositoryList/>
        },
        {
            path:"/repo/:id/",
            element:<Repository/>
        },
        {
            path:"/starredRepo",
            element:<StarredRepo/>
        },
        {
            path:"repo/:id/issues",
            element:<IssuesUI/>
        },
        {
            path:"/:id/issues/new",
            element:<IssueForm/>
        },
        {
            path:"/profile",
            element:<ProfileHeader/>
        }
    ])
    return element;
}
export default ProjectRoutes;
