/*
*   Command: say
*   Returns the user's message as an embedded message
*/
const Discord = require('discord.js')//Requirement of the "Discord" module
const util = require('../utils/util')//Requirement of the "Util" module
module.exports = {
    name: 'say',                                //Command name
    cooldown: 10,                               //Command cooldown
    aliases: [],                                //Command alias
    description: 'El bot dirá las cosas por ti',//Command description
    args: true,                                 //If the command needs arguments
    usage: '<text>',                            //How to use the command. (Example)
    guildOnly: true,                            //If the command is only from the server (Generally yes)
    execute(message, args) {//Command execution function
        //If there is no text as an argument, the function ends
        let text = args.join(" ");
        if (!text) {
            return util.errorMessage();
        }
        
        //Delete the message
        message.delete();

        //Generate the messaege
        const embed = new Discord.MessageEmbed()
        .setThumbnail(message.author.avatarURL)
        .setAuthor(message.author.username)
        .setDescription(text)
        .setColor(0x66b3ff);

        //Send the message
        message.channel.send(embed);
	}
}