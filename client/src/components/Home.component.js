import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';

const Home = () => {

  const [token,setToken]=useState('')
  const [error,setError] =useState('');
  const navigate = useNavigate();
  const handleLogin = async googleData => {
    try {
      const url=process.env.REACT_APP_API_BASE_URL.concat(['/login/google']);

      // const res = await axios.post(apiURL,{
      //     token: googleData.credential
      //   })

      const res = await axios({
        url,
        method:'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'origin':'x-requested-with',
          'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify({
           token: googleData.credential

      })})
      
        if(res.data.token){

      setToken(res.data.token)
      localStorage.setItem('token',res.data.token)

        // store returned user somehow
        navigate('/profile',{replace:true});
      } else {
        setError('Hubo un error')
      }
    } catch (error) {
      setError('Hubo un error')
    }
  }
  return (
    <>
      <h2>Home</h2>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={() => {
          console.log('Login Failed');
        }}
      />
      </GoogleOAuthProvider>
      </>
  );
};
export default Home