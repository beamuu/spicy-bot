require('dotenv').config();
const Discord = require('discord.js');
const express = require('express');


const client = new Discord.Client();
const port = process.env.PORT || 3000;
const app = express();



// Client Start
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(process.env.DISCORD_TOKEN);

app.use(express.json());
app.post('/uni-sushi/webhook', (req, res) => {
    const { payload, secret } = req.body;
    client.channels.cache.get(process.env.TARGET_CHANNEL_ID).send("Event triggered.");
    const embed = new Discord.MessageEmbed()
        .setAuthor('Spicy Bot')
        .setColor('#34eb83')
        .setDescription('Test')
    return res.sendStatus(200);
});
app.listen(port, () => console.log(`express server is listening on port ${port}`));