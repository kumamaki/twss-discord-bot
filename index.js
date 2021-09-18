require('dotenv').config();

const express = require('express');
const Discord = require('discord.js');
const twss = require('twss');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', msg => {
    twss.threshold = 0.75;
    console.log('msg.content 👉 ', msg.content);
    console.log('twss.prob(msg.content) 👉 ', twss.prob(msg.content));
    if (
        twss.is(msg.content) &&
        msg.content !== `That's what she said`
    ) {
        msg.reply(`That's what she said`);
    }
});

client.login(process.env.CLIENT_TOKEN);

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send(`Checked Health @ [${new Date()}]`);
});
app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
});