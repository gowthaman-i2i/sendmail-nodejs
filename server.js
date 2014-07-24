var nodemailer=require('nodemailer');
var readline = require('readline');

var config = {
    service: 'gmail',
    auth: {
        username: 'test@test.com',//provide valide email address 
        password: 'XXXXX',//provide valide password
    },
    toAddress: '',
    subject: '',
    text: ''
};

//Read input and output
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        user: config.auth.username,
        pass: config.auth.password
    }
});


rl.question('Enter To address: ', function (answer) {
    config.toAddress = answer.trim();

    rl.question('Enter Subject:', function (answer) {
        config.subject = answer;

        rl.question('Enter Text:', function (answer) {
            config.text = answer;

            rl.question('You want sendMail Now(yes/no)', function (answer) {
                rl.close()
                if (answer === "yes") {
                    transporter.sendMail({
                        from: config.auth.toAddress,
                        to: config.toAddress,
                        subject: config.subject,
                        text: config.text
                    },function(err, response){
                        if(err) {
                         console.log("............err.......",err);
                        }else{
                           console.log("............response.......",response);
                        }
                    });
                } else {
                    console.log("................EXIT...............")
                }
            });
        });
    });
});
