import React, {useState, useEffect} from "react";
import axios from "axios";

function Account() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  async function pullInfo (){
    try {
      const response = await axios.get(`http://localhost:3500/account/${username}`);
      setEmail(response.data.email);
      setPassword(response.data.password);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }

  pullInfo();
  console.log(username);
  console.log(email);
  console.log(password);

  if(!password || !email || !username) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  
  return (
    <div>
      <p>{localStorage.getItem('username')}</p>
    </div>
  )
}

export default Account;