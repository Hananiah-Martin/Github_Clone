import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";
function Navbar2() {
  const filters = ["Type", "Language", "Sort"];
  const [repositories, setRepositories] = useState(["newrepo"]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function changePath(e) {
    e.preventDefault();
    navigate("/new");
  }
  useEffect(() => {
      if (searchQuery == "") {
        setSearchResults(repositories);
      } else {
        const filteredRepo = repositories.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(filteredRepo);
        setSearchResults(filteredRepo);
      }
    }, [searchQuery, repositories]);
     useEffect(() => {
      }, [searchResults]);
  return (
   <div></div>
  );
}

export default Navbar2;
