var nodemailer = require('nodemailer')
  , yaml = require('js-yaml')
  , fs = require('fs')
  , creds

try {
  creds = yaml.safeLoad(fs.readFileSync('./gif_credentials.yml', 'utf8'));

  module.exports = function (email, link) {
  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport('SMTP',{
    service: 'Gmail',
    auth: {
      user: creds.user,
      pass: creds.pass
    }
  })

  , mailOptions = {
    from: creds.name + ' <' + creds.user + '>', // sender address
    to: email, // list of receivers
    subject: 'Here. Have a gif.', // Subject line
    text: 'A fleeting. A moment. A memory.\n' + link, // plaintext body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error)
    }else{
      console.log('Message sent: ' + response.message)
    }
  })
}
} catch (e) {
  console.log('yaml parsing error. email funcionality disabled.', e);
}
