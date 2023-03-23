import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const OAuthPopup = ({ buttonText, onTokenReceived }) => {
  let popupWindow;

  const handleOpenPopup = () => {
    const width = 600;
    const height = 800;
    const left = window.screenLeft + (window.innerWidth - width) / 2;
    const top = window.screenTop + (window.innerHeight - height) / 2;

  // get oauth url


    const oauthUrl = "https://openstreetmap.org/login";

    const options = {
        method: 'GET',
        headers: { 'accept': 'application/json' },
        url: 'https://fmtm-api.hotosm.org/auth/osm_login/',
        }         
        console.log( options );    
    
    axios.request(options).then(function(res) {
        console.log(" response this ");  
        console.log(res);
        const oauthUrl = res.data.login_url;
    
    }).catch(function(err) {
            console.log("not this error = " + err);
    }); 
  

    popupWindow = window.open(
      oauthUrl,
      'OAuth Popup',
      `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=${width},height=${height},top=${top},left=${left}`
    );

    const checkPopupClosed = setInterval(() => {
      if (popupWindow.closed) {
        clearInterval(checkPopupClosed);
        handleReceiveMessage();
      }
    }, 500);
  };

  const handleReceiveMessage = () => {
    const token = localStorage.getItem('oauth2_token');
    if (token) {
      localStorage.removeItem('oauth2_token');
      onTokenReceived(token);
    }
  };



 





  return (
    <Button variant="contained" color="primary" onClick={handleOpenPopup}>
      {buttonText}
    </Button>
  );
};

export default OAuthPopup;
