/*
*   Command: lboard
*   Displays with an embedded message the ranking table of the users' level on the server
*/
const util = require('../utils/util')//Requirement of the "Util" module
const fs = require('fs')//Requirement of the "fileSystem" module
module.exports = {
    name: 'lboard',                                             //Command name
    cooldown: 10,                                               //Command cooldown
    aliases: ['leaders'],                                       //Command alias
    description: 'Observa la tabla de lideres del servidor',    //Command description
    args: false,                                                //If the command needs arguments
    usage: ' ',                                                 //How to use the command. (Example)
    guildOnly: true,                                            //If the command is only from the server (Generally yes)
    execute(message, args) {//Command execution function
        //Read the file and find the array corresponding to the id of the server where the command was invoked
	    var lb = JSON.parse(fs.readFileSync("stats.json", "utf8"));
        var guildServer = lb[message.guild.id];
        var levels_array = Object.keys(guildServer).map(function(clave) {
        var element = guildServer[clave];
        element.id = clave;
        return element;
        });

        //Order the elements from highest to lowest
        levels_array.sort(function(a, b) {
            return b.level - a.level;
        });


        var leaderText = "" //Message variable
        var lLimit          //Variable with the limit of names to be displayed

        //The limit is set
        if (levels_array.length < 10) {
            lLimit = levels_array.length;
        } else {
            lLimit = 10;
        }

        //The message is configured by placing a medal on the first 3 elements of the array
        for (let i = 0; i < lLimit; i++) {
            leaderText += `**${i + 1})** <@${levels_array[i].id}>`;
            if (i == 0) {
            leaderText += "\t🥇";
            }
            if (i == 1) {
            leaderText += "\t🥈";
            }
            if (i == 2) {
            leaderText += "\t🥉";
            }
            leaderText += "\n";
        }

        //Message is sent
        util.sendEmbed(message, 'Tabla de lideres', leaderText, 'RANDOM')
	}
}