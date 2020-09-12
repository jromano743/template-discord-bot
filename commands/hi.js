/*
*   Command: hi
*   Reply with an embedded message, an image and a text. A user can be mentioned
*/
const util = require('../utils/util')//Requirement of the "Util" module
module.exports = {
    name: 'hi',                                         //Command name
    cooldown: 10,                                       //Command cooldown
    aliases: ['hola'],                                  //Command alias
    description: 'Brinda una calurosa bienvenida',      //Command description
    args: false,                                        //If the command needs arguments
    usage: '(user)',                                    //How to use the command. (Example)
    guildOnly: true,                                    //If the command is only from the server (Generally yes)
      execute(message, args) {//Command execution function
        
        //Save the first mentioned user
        const taggedUser = message.mentions.users.first();

        //Contains the images that can be displayed
		let gifs = [
            "https://media1.tenor.com/images/e488bdf4797da06294f0ad84b26a5ea8/tenor.gif?itemid=5177258",
            "https://media.tenor.com/images/6870fd2f3f7be6bc6f08083a899c4889/tenor.gif",
            "https://media1.tenor.com/images/8f5430367d6c8ded5778fb1c850021c1/tenor.gif?itemid=12395961",
            "https://media1.tenor.com/images/673726fd35121fc1e96755346328f3c1/tenor.gif?itemid=9473392",
            "https://media1.tenor.com/images/79f33c2f524cbfed4ef6896b39e67663/tenor.gif?itemid=9416181",
            "https://media1.tenor.com/images/2ef78ab2f3e2acbf077388e26d3bc2da/tenor.gif?itemid=14815980",
            "https://media1.tenor.com/images/bd5763e0036ec74455f13d25eeedb99c/tenor.gif?itemid=16737420",
            "https://media1.tenor.com/images/5fe3d72c88c132fb8c7233e075569b1c/tenor.gif?itemid=11038905",
            "https://media1.tenor.com/images/dc5f420c67a36df162240d47ac9bba51/tenor.gif?itemid=11579994"
        ];

        //Select a random index
        let index = Math.floor(Math.random() * gifs.length);

        //Set message depending on whether a user was mentioned or not
        let textEmbed
        if (taggedUser) {
            textEmbed =`**${message.author.username}** saluda a **${taggedUser.username}** 👋`
        } else {           
            textEmbed = `**${message.author.username}** saluda a todo el mundo 👋`
        }

        //Message is sent
        util.sendEmbedWhitImage(message, "", textEmbed, gifs[index], "RANDOM")
	}
}