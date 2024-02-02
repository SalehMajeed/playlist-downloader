import React, {useState} from 'react';

function UserInputCmpt({setPlaylistAddress}) {
  const [userInput, setUserInput] = useState("");


  const HandleInput = (event) =>{
    const data = event.target.value
    setUserInput(data);
  };

  const HandleDownload = () =>{
    setPlaylistAddress(userInput);
    setUserInput("");
  };

  return (
    <div>
    <input type="text" placeholder="enter your text" value={userInput} onChange={HandleInput} />
    <br/>
    <button onClick={HandleDownload}>Get Your Playlist</button>
    </div>
  );
};

export default UserInputCmpt