const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'eliecerj@gmail.com',
    from: 'eliecerj@gmail.com',
    subject: 'This is my first creation!',
    text: 'Suck my dick.'
})