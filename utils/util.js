const Discord = require("discord.js")
const fs = require('fs')
const jsonfile = require("jsonfile");
const random = require("random");
const prefix = require("../utils/config.json").PREFIX
let TXT_ERROR_TITLE = "Ups"
let TXT_ERROR_DESCRIPTION = 'El comando esta mal escrito o no existe.\nUtiliza \"'+ prefix +'help\" para conocer la lista de comandos'


var stats = {};

module.exports = {
  sendText: function(msg, text){
    msg.channel.send(text)
  },
  shuffleArray: function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  isNSFW: function (message){
    if(message.channel.nsfw === false){
        const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.usernam)
        .addField(TXT_ERROR_TITLE, "No es un canal apto para eso", true)
        .setColor(0x66b3ff) 
        message.channel.send(embed)
        return (false)
    }
    return(true)
  },
  errorMessage: function (message){
    const embed = new Discord.MessageEmbed()
    embed.setAuthor(client.user.usernam)
    embed.setColor('#ffffff')
    embed.addField(TXT_ERROR_TITLE, TXT_ERROR_DESCRIPTION, true)
    message.channel.send(embed)
  },
  sendEmbed: function (message, title, text, color){
    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription(text)
    .setColor(color)
    message.channel.send(embed)
  },
  sendEmbedWhitImage: function (message, title, text, image, color){
    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription(text)
    .setImage(image)
    .setColor(color)
    message.channel.send(embed)
  },
  generateEmbedUsers: function (title, times, thumbail,author,desc,footer, thumbailS){
    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setTimestamp(times)
    .setThumbnail(thumbail)
    .setAuthor(author)
    .setDescription(desc)
    .setColor('#66b3ff')
    .setFooter(footer, thumbailS);
    return embed
  },
  addExp(message){
    if (fs.existsSync("utils/stats.json")) {
      stats = jsonfile.readFileSync("utils/stats.json");
    }
    if (message.guild.id in stats === false) {
      stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];

    if (message.author.id in guildStats === false) {
      guildStats[message.author.id] = {
        user: message.author.username,
        xp: 0,
        level: 0,
        last_message: 0
      };
    }

    const userStats = guildStats[message.author.id];
    const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
    if (Date.now() - userStats.last_message > 60000) {
      userStats.xp += random.int(15, 25);
      userStats.last_message = Date.now();

      if (userStats.xp > xpToNextLevel) {
        userStats.level = userStats.level + 1;
        userStats.xp = userStats.xp - xpToNextLevel;
        //MENSAJE EMBEBIDO
        const embed2 = new Discord.MessageEmbed()
          .setThumbnail(message.author.avatarURL)
          .setAuthor(message.client.user.username)
          .setDescription(`Felicidades **${message.author.username}** subiste al **nivel ${userStats.level}**`)
          .setColor(0x66b3ff);
        message.channel.send(embed2);
      }

      jsonfile.writeFileSync("utils/stats.json", stats);
    }
  },
  getUserStats(message){
    const guildStats = stats[message.guild.id];
    const userStats = guildStats[message.author.id];
    return(userStats)
  },
  isEven(value){
      if (value%2 == 0){
        return true;
      }else{
        return false;
      }
  }
}