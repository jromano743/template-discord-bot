/*
*   Command: srole
*   Returns a position of League of Legends for the first 5 users mentioned
*/
const util = require('../utils/util')//Requirement of the "Util" module
const Discord = require("discord.js")//Requirement of the "Discord" module
module.exports = {
    name: 'srole',                                                                      //Command name
    cooldown: 10,                                                                       //Command cooldown
    aliases: ['sr'],                                                                    //Command alias
    description: 'Devuelve un rol aleatorio para las personas mencionadas (maximo 5)',  //Command description
    args: false,                                                                        //If the command needs arguments
    usage: '(user) |5 max|',                                                            //How to use the command. (Example)
    guildOnly: true,                                                                    //If the command is only from the server (Generally yes)
    execute(message, args) {//Command execution function
        text = args.join(" ");
        let mentions = message.mentions.users.array()

        //If there are no tagged users or text the function ends
        if (mentions.length === 0) {
            util.errorMessage(message)
            return
        }
        if (!text) {
            util.errorMessage(message)
            return
        }

        //Users are placed in a array (only the first 5)
        let roles = ["Top ⚔️", "Jg 🌲", "Mid 🧙‍", "Adc 🏹", "Supp 👩‍👧‍👦"];
        let names = [];
        let limit = mentions.length
        if (limit >= 6) {
            limit = 5;
        }
        for (let i = 0; i < limit; i++) {
            names.push('<@'+mentions[i]+'>')//mentions[i].username
        }

        //Array of roles are mixtures
        util.shuffleArray(roles);
        embed = new Discord.MessageEmbed()
        embed.setAuthor("Beaters");
        embed.setColor('RANDOM');

        //Generate the message
        let msg = "\n";
        for (let j = 0; j < limit; j++) {
            msg = msg + (names[0] + " es el " + roles[0]) + "\n";
            names.splice(0, 1);
            roles.splice(0, 1);
        }
        embed.addField("Los roles son", msg, true);

        //Message is sent
        message.channel.send({ embed });
    }
}