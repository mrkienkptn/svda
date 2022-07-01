const nodemailer = require('nodemailer')

const { nodemailer: config } = require('../../config/vars')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.user,
    pass: config.pass,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken
  },
  from: config.user
})

const sendInviteMail = async (to, ogzName, acceptToken) => {
  try {
    const response = await transporter.sendMail({
      from: 'Learning Path System',
      to,
      subject: 'Invite collaborate',
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      
      <body style="text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <h2>Invite Collborating</h2>
        <br />
        <div style="font-size: 30px; margin-bottom: 20px;">${ogzName} invite you to my organization</div>
        <a href="http://localhost:8000/organizations/members/accept?token=${acceptToken}"
          style="background-color: darkgreen ; border: none; border-radius: 5px; padding: 8px; font-weight: 600; cursor: pointer; text-decoration: none; color: white;"
          id="accept-btn">Accept</a>
        <a href="/#"
          style="background-color: orangered; color: white ; border: none; border-radius: 5px; padding: 8px; font-weight: 600; cursor: pointer; text-decoration: none;"
          id="deny-btn">Deny</a>
      </body>
      </html>
      `
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendInviteMail
