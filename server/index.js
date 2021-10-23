const express = require('express');
const cors = require('cors');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

const authRoutes = require("./routes/auth.js");

const app= express();

const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello, World !!');
});

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new'){
        members
        .filter((member)=> member.user_id !== sender.id )
        .forEach(({user}) => {
                if(!user.online) {
                    twilioClient.messages.create({
                        body : `Tu as reçu un nouveau message de ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                    .then(() => console.log('Message Envoyer'))
                    .catch((err) =>console.log(err) );
                }
           
        })

        res.status(200).send('Message Envoyer!')
    }

    return res.status(200).send('Pas un nouveau message!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Serveur tourne sur le port ${PORT}`));