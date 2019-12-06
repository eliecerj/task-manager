const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'eliecerj@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}.Let me know you get along with he app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'eliecerj@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}. I hope to see you back ometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}


