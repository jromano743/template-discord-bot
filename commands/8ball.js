/*
*   Command: 8ball
*   Respond with a random message to a question asked by the user
*/
const util = require('../utils/util.js')//Requirement of the "Util" module
module.exports = {
  name: '8ball',                              //Command name
  cooldown: 10,                               //Command cooldown
  aliases: ['hola'],                          //Command alias
  description: 'Hazle una pregunta al bot',   //Command description
  args: true,                                 //If the command needs arguments
  usage: '<text>',                            //How to use the command. (Example)
  guildOnly: true,                            //If the command is only from the server (Generally yes)
  execute(message, args) {                    //Command execution function
    //Take the text of the argument
    let text = args.join(" ")
    
    //If there is no text the function ends
    if (!text) return util.errorMessage(message)

    //Variable with possible responses to the message
    var rpts = [
      "Sí 😁",
      "No 😕",
      "Obviamente 😌",
      "Obviamente no 😒",
      "Eso no se pregunta 😉",
      "Pienso que si 🤔",
      "Pineso que... no! 🤨",
      "¡Claro! 😄",
      "Nope 😶",
      "Por supuesto! 😁",
      "Por supuesto que no! 😩",
      "No me preguntes, solo soy un bot 🤖",
      "A lo mejor... 🤔",
      "Seguro 😎"
    ]

    //The answer to the question is sent
    util.sendEmbed(message, '🎱8-Ball', `** ${message.author.username} ** la respuesta a tu pregunta:\n **${text}** es:\n ${rpts[Math.floor(Math.random() * rpts.length)]}`, 'RANDOM')
	}
};