const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

const getGoogleAuthUrl = () => {
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;


  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
    prompt: "select_account",
    redirect_uri: redirectUri,
  });


  return url;
};

const getGoogleUser = async (code) => {
  const { tokens } = await googleClient.getToken({
    code,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
  });

  googleClient.setCredentials(tokens);

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    name: payload.name,
    email: payload.email.toLowerCase(),
    picture: payload.picture,
  };
};

module.exports = {
  getGoogleAuthUrl,
  getGoogleUser,
};