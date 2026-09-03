const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Start Google authorization
router.get("/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });

  res.redirect(authUrl);
});

// Google OAuth callback
router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code missing");
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log("✅ OAuth tokens received");
    console.log("Refresh token:", tokens.refresh_token);

    res.send(`
      <h1>Gmail authorization successful ✅</h1>
      <p>Check your backend terminal for the refresh token.</p>
    `);
  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).send("Google authorization failed");
  }
});

module.exports = router;