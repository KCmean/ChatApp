import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../utlis/APIRoutes';
import { Buffer } from "buffer";



export default function SetAvatar() {

  const api = 'https://api.multiavatar.com';
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

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
      toast.error("please select an avatar", toastOptions);
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("error setting avatar please try again", toastOptions);
      }
    }

  };

  //   useEffect( () => {

  //     async function fetchAvatar() {
  //     const data = [];
  //     const api = 'https://api.multiavatar.com';

  //     for (let i = 0; i < 4; i++) {
  //       const image = await axios.get(
  //         `${api}/${Math.round(Math.random() * 10000)}`
  //       );
  //       console.log(image);
  //       const buffer =  Buffer.from(image.data);
  //       data.push(buffer.toString("base64"));
  //     }
  //     setAvatar(data);
  //     setLoading(false);

  //   }
  //   fetchAvatar();  
  // }, []);
  // useEffect(() => {
  //   async function fetchAvatar() {
  //     try {
  //       const data = [];
  //       const api = 'https://api.multiavatar.com';
  //       const api_key ='apikey=9ltuDFd82KEqSL'


  //       for (let i = 0; i < 4; i++) {
  //         const response = await fetch(`${api}/${Math.round(Math.random() * 1000000)}?${api_key}`);
  //         console.log(response);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = [];
  //       const api = 'https://api.multiavatar.com/78945';
  //       const api_key = 'apikey=9ltuDFd82KEqSL'


  //       for (let i = 0; i < 4; i++) {
  //         const response = await fetch(`${api}/${Math.round(Math.random() * 1000000)}?${api_key}`);
  //         if (!response.ok) {
  //           throw new Error('Error fetching avatars');
  //         }
  //         // console.log(response);
  //         const image = await response.text();

  //         // console.log(image);

  //         const buffer = Buffer.from(image, 'base64');
  //         data.push(buffer.toString('base64'));
  //         // console.log(data);
  //       }

  //       setAvatar(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching avatars:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(avatars);

    useEffect( () => {

      async function fetchAvatar() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=9ltuDFd82KEqSL`
        );
        const buffer =  Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setLoading(false);
  }fetchAvatar()}, []);




  return (
    <>
    {
      loading ? <Container>
        <img src={loader} alt="loader" className='' />
      </Container> : (
      <Container>
        <div className='title-container'>
          <h1>
            Pick an avatar as your profile picture
          </h1>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
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
        <button className='submit-btn' onClick={setProfilePicture}>
          Set As Profile Picture
        </button>
      </Container>
      )
    }
      <ToastContainer />
    </>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader{
    max-inline-size: 100%; 
  }
  .title-container{
    h1{
      color: #fff;
      padding-bottom: 2rem;
    }
  }
  .avatars{
    display: flex;
    gap: 2rem;
    .avatar{
      border: 0.4rem solid transparent;
      padding: 0.5rem;
      /* padding-top: 1rem; */
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      img{
        height: 6rem;
      } 
    }
    .selected{
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn{
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover{
        background-color: #4e0eff;
        transition: 0.5s ease-in-out;
      }
    }

`;