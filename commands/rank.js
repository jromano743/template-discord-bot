/*
*   Command: rank
*   Returns user level statistics
*/
const Discord = require("discord.js")//Requirement of the "Discord" module
const util = require('../utils/util')//Requirement of the "Util" module
module.exports = {
    name: 'rank',                                                   //Command name
    cooldown: 10,                                                   //Command cooldown
    aliases: [],                                                    //Command alias
    description: 'Controla cuantos puntos tienes en el servidor',   //Command description
    args: false,                                                    //If the command needs arguments
    usage: ' ',                                                     //How to use the command. (Example)
    guildOnly: true,                                                //If the command is only from the server (Generally yes)
    execute(message, args) {//Command execution function
      //Take user level statistics
      const userStats = util.getUserStats(message)

      //Check the experience for the next level
      const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;

      //Generate the message with the answer
		  const embed = new Discord.MessageEmbed()
      .setAuthor(message.client.user.username)
      .setDescription(`**${message.author.username}** eres **nivel ${userStats.level}**\n
        Te falta **${xpToNextLevel - userStats.xp}xp** para el siguiente nivel`)
      .setColor(0x66b3ff);

      //Message is sent
      message.channel.send(embed);
	}
}