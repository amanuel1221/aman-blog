const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");

const router = express.Router();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);


router.get("/google", (req, res) => {
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  const authUrl = googleClient.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",

    scope: [
      "openid",
      "email",
      "profile",
    ],

    redirect_uri: redirectUri,
  });


  res.redirect(authUrl);
});


router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Google authorization code missing");
    }

    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    googleClient.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new Error("Google ID token was not returned");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email?.toLowerCase();
    const name = payload.name;

    if (!googleId || !email) {
      throw new Error("Google account information is incomplete");
    }

  


    let user = await User.findOne({
      googleId,
    });


    if (!user) {
      user = await User.findOne({
        email,
      });
    }


    if (user) {

      if (!user.googleId) {
        user.googleId = googleId;
      }

      user.authProvider = "google";

      await user.save();

    } else {

      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
      });
    }


    const token = generateToken(user._id);


    res.cookie("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL}/`);

  } catch (error) {

    console.error(
      "❌ Google Sign-In error:",
      error.response?.data || error.message
    );

    res.redirect(
      `${process.env.CLIENT_URL}/login?error=google_auth_failed`
    );
  }
});


module.exports = router;