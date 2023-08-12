import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

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

  if(!password || !email || !username) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='rounded-2xl border-4 border-[#47220f] flex flex-col items-center justify-center bg-white p-8 my-4 drop-shadow-lg gap-4'>
          <h1 className='text-3xl font-bold py-2'>{username}</h1>
          <h2>email: {email}</h2>
          <Link className='w-full text-center h-auto rounded-lg py-1 mt-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' to='/register'>Log Out</Link>
        </div>
      </div>
    </div>
  )
}

export default Account;