/*
*   Command: trap
*   Create a yu gi oh meme with the text as a trap letter
*   You can also use another letter as a parameter
*/
const util = require('../utils/util')//Requirement of the "Util" module
const Jimp = require('jimp')//Requirement of the "Jimp" module
module.exports = {
    name: 'trap',                               //Command name
    cooldown: 10,                               //Command cooldown
    aliases: [],                                //Command alias
    description: 'Revela tu carta trampa',      //Command description
    args: true,                                 //If the command needs arguments
    usage: '<user> (arg)\nLos argumentos son:\nv: Visto\nf: F\nr: Reverse\nSi no usas ninguno puedes introducir un texto',//How to use the command. (Example)
    guildOnly: true,                            //If the command is only from the server (Generally yes)
    execute: async function(message, args) {
      //Check that a user is mentioned
      let user = message.mentions.users.first()
      if(!user){
          util.errorMessage(message)
          return
      }
      args.shift()

      //Reading the avatar and mask
      let mask = "./assets/mask.png"
      let avatar = user.displayAvatarURL({format: 'png'})

      let readMask = await Jimp.read(mask)
      let readAvatar = await Jimp.read(avatar)

      //Resize the avatar and mask
      readMask.resize(100,100)
      readAvatar.resize(100,100)

      //Apply the mask to the avatar
      readAvatar.mask(readMask, 0, 0)

      let image
      //Generate the image according to the specified argument
      switch(args[0]){
        case 'v':
        case 'V':
            image = await Jimp.read("./assets/veido.jpg")
            image.composite(readAvatar, 100 , 270)
            image.getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
                if (err) return console.log(err);
                message.channel.send({ files: [{ attachment: buffer, name: "image.png"}] })
              })
            break;
        case 'r':
        case 'R':
            image = await Jimp.read("./assets/reverse.jpg")
            image.composite(readAvatar, 100 , 270)
            image.getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
                if (err) return console.log(err);
                message.channel.send({ files: [{ attachment: buffer, name: "image.png"}] })
              })
            break;
        case 'f':
        case 'F':
            image = await Jimp.read("./assets/f.jpg")
            image.composite(readAvatar, 100 , 270)
            image.getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
                if (err) return console.log(err);
                message.channel.send({ files: [{ attachment: buffer, name: "image.png"}] })
              })
            break;
        default:
            let text = args.join(' ')
            image = await Jimp.read("./assets/blanco.jpg")
            image.composite(readAvatar, 100 , 270)
            let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
            image.print(font, 50, 25, text, 125)
            image.getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
                if (err) return console.log(err);
                message.channel.send({ files: [{ attachment: buffer, name: "image.png"}] })
            })
            break;
      }
    }
}