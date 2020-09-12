/*
*       Command: choose
*       Choose at random from one of the options proposed by the user. These options are separated by ";"
*/
const util = require('../utils/util.js')//Requirement of the "Util" module
module.exports = {
    name: 'choose',                                                 //Command name
    cooldown: 10,                                                   //Command cooldown
    aliases: [],                                                    //Command alias
    description: 'Si estas indeciso deja que el bot elija por ti',  //Command description
    args: true,                                                     //If the command needs arguments
    usage: '<option1> ; <option2>',                                 //How to use the command. (Example)
    guildOnly: true,                                                //If the command is only from the server (Generally yes)
      execute(message, args) {//Command execution function
        //Array that will contain user options
		let options = [];
        options[0] = " ";

        let idx = 0;//Index for the options array

        /*
        *   Places the elements of the argument array in the options array. 
        *   Increasing the index of the options array every time the symbol ";" appears
        */
        for (let i = 0; i < args.length; i++) {
            if (args[i] !== ";") {
            options[idx] += args[i] + " ";
            } else {
            idx++;
            options[idx] = " ";
            }
        }

        //Takes an index based on the number of elements in the array
        let index = Math.floor(Math.random() * (options.length - 0))

        //An option is chosen from the array of options using the index
        //The answer to the question is sent
        util.sendEmbed(message, "Bot dice: ", "**" + message.author.username + "**, yo escojo **" + options[index] + "**", 'RANDOM')
	}
};