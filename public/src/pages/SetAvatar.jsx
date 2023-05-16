import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../utlis/APIRoutes';
import { Buffer } from "buffer";


export default function SetAvatar() {

  const api = 'https://api.multiavatar.com/45678985';
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const setProfilePicture = async () => {};
  useEffect( () => {

    async function fetchAvatar() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 10000)}`
      );
      console.log(image);
      const buffer =  Buffer.from(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    setLoading(false);

  }
  fetchAvatar();  
}, []);
// useEffect(() => {
//   async function fetchAvatar() {
//     try {
//       const data = [];
//       const api = 'https://api.multiavatar.com/45678985';


//       for (let i = 0; i < 4; i++) {
//         const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
//         if (!response.ok) {
//           throw new Error('Error fetching avatars');
//         }
//         const image = await response.text();

//         const buffer = Buffer.from(image, 'base64');
//         data.push(buffer.toString('base64'));
//       }

//       setAvatar(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching avatars:', error);
//     }
//   }

//   fetchAvatar();
// }, []);
  
//   useEffect( () => {

//     async function fetchAvatar() {
//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `${api}/${Math.round(Math.random() * 1000)}`
//       );
//       const buffer =  Buffer.from(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatar(data);
//     setLoading(false);
// }}, []);
  



  return (
    <>
      <Container>
        <div className='title-container'>
          <h1>
            Pick an avatar as your profile picture
          </h1>
          <div className='avatars'>
            {avatars.map((avatar, index) =>{
              return (
                <div className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  )
}


const Container = styled.div``;