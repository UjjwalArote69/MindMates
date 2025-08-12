import React, { useState } from 'react'
import { getMe } from '../services/user.service';

const Home = () => {

  const [user, setUser] = useState();
  
  

  return (
    <div className='text-5xl '>Home</div>
  )
}

export default Home