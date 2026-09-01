const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const getWelcomeEmailTemplate = (name) => {
  const blogUrl = process.env.CLIENT_URL || "https://aman-blog-seven.vercel.app";
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>Welcome to Aman Blog</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
          
          @media screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            .content-padding {
              padding: 32px 20px !important;
            }
            .button-wrapper {
              width: 100% !important;
            }
            .button {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box;
            }
          }
        </style>
      </head>

      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', Arial, Helvetica, sans-serif; color: #0f172a;">
        <!-- PREHEADER TEXT (Invisible preview in inbox) -->
        <div style="display: none; max-height: 0px; overflow: hidden;">
          Welcome aboard, ${name}! Your account is ready. Discover top articles and share your thoughts.
          &#847, &#847, &#847, &#847, &#847, &#847, &#847, &#847, &#847, &#847, &#847, &#847, 
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 40px 0;">
          <tr>
            <td align="center">
              
              <!-- MAIN CONTAINER -->
              <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                
                <!-- BRAND HEADER -->
                <tr>
                  <td align="left" style="background-color: #ffffff; padding: 36px 40px 20px 40px; border-bottom: 1px solid #f1f5f9;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <span style="font-size: 22px; font-weight: 800; tracking: -0.5px; color: #0f172a; text-decoration: none;">
                            Aman<span style="color: #2563eb;">Blog</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- HERO / CONTENT -->
                <tr>
                  <td class="content-padding" style="padding: 40px;">
                    <h1 style="margin: 0 0 16px; color: #0f172a; font-size: 26px; line-height: 1.3; font-weight: 700; letter-spacing: -0.5px;">
                      Welcome aboard, ${name}! 👋
                    </h1>

                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      Thank you for joining <strong>Aman Blog</strong>. We’re thrilled to have you as part of our growing community of readers and creators.
                    </p>

                    <!-- FEATURE CARDS -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0; background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #f1f5f9;">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <strong style="color: #1e293b; font-size: 15px;">Here is what you can do next:</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #475569; font-size: 14px; line-height: 1.8;">
                          •  <strong>Discover:</strong> Read curated insights, stories, and deep dives.<br/>
                          •  <strong>Publish:</strong> Write and share your ideas with our community.<br/>
                          •  <strong>Engage:</strong> Join discussions and connect with other members.
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 32px 0 24px 0;">
                      <tr>
                        <td align="center" style="border-radius: 10px; background-color: #2563eb;" class="button-wrapper">
                          <a href="${blogUrl}" target="_blank" class="button" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 10px; background-color: #2563eb; text-align: center;">
                            Explore Aman Blog &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                      If you have any questions or feedback, feel free to reply directly to this email. We'd love to hear from you!
                    </p>

                    <p style="margin: 28px 0 0; color: #334155; font-size: 15px; font-weight: 500;">
                      Best regards,<br/>
                      <span style="color: #0f172a; font-weight: 600;">The Aman Blog Team</span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 28px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
                    <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                      &copy; ${currentYear} Aman Blog. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                      You received this email because you registered an account on Aman Blog.<br/>
                      <a href="${blogUrl}" style="color: #2563eb; text-decoration: none;">Visit Website</a>
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};


const sendWelcomeEmail = async (name, email) => {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  console.log(`📧 Sending welcome email to: ${email}`);

  try {
    const info = await transporter.sendMail({
      from: `"Aman Blog" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Aman Blog 👋",
      html: getWelcomeEmailTemplate(name),
    });

    console.log(`✅ Welcome email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

module.exports = {
  sendWelcomeEmail,
};