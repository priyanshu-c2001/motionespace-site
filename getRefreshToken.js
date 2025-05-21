require('dotenv').config();
const { google } = require('googleapis');
const readline = require('readline-sync');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures a refresh token is generated
    scope: ['https://www.googleapis.com/auth/calendar']
  });

  console.log('Authorize this app by visiting this URL:', authUrl);
  const code = readline.question('Enter the code from the page: ');

  const { tokens } = await oAuth2Client.getToken(code);
  console.log('Your Refresh Token:', tokens.refresh_token);
}

getAccessToken();
