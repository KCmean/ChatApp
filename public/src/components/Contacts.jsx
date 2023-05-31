import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'



function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.name);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {

  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h3>Chatzzy</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index}>
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatar.image}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="username">
                        <h3>
                          {contact.username}
                        </h3>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>
                  {currentUserName}
                </h2>

              </div>
            </div>

          </Container>
        )}
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #000420;

  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
      height: 2rem;
    }
    h3{
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact{
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5ms ease-in-out;
      .avatar{
        img{
          height: 3rem;
        }
      }
      .username{
        h3{
          color: white;
        }
      }
    }
    .selected{
      background-color: #9186f3;

    }
  }

  .current-user{
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar{
      img{
        height: 4rem;
        max-inline-size: 100%;
      }
    }
  }
`

export default Contacts