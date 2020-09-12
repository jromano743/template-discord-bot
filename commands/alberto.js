/*
*     Command: alberto
*     Generate an image of Alberto with the text sent as a parameter written on the board
*/
const Jimp = require('jimp')//Requirement of the "Util" module
module.exports = {
  name: 'alberto',                            //Command name
  cooldown: 10,                               //Command cooldown
  aliases: ['presi'],                         //Command alias
  description: 'Naide explica como Alberto',  //Command description
  args: true,                                 //If the command needs arguments
  usage: '<text>',                            //How to use the command. (Example)
  guildOnly: true,                            //If the command is only from the server (Generally yes)
  execute: async function(message, args) {    //Command execution function
    //Load the image template
    let template ="./assets/alberto.jpg";

    //Take the text of the argument
    let text = args.join(" ")

    //If there is no text the function ends
    if (!text) return message.channel.send("Necesitas un mensaje")

    let readTemplate = await Jimp.read(template)//Reading the template
    let font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)//Font loading


    readTemplate.print(font, 50, 50, text, 450)//Print the text on image using the font

    //Generate the image buffer
    readTemplate.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
      if(err) return message.channel.send("Error")//If there is an error the program ends
      message.channel.send({ files: [{ attachment: buffer, name: "image.jpeg"}] })//Send the image
    })
  }
}