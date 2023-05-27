import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'





function Contacts( {contacts, currentUser} ) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    
  return (
    <div>Contacts</div>
  )
}

export default Contacts