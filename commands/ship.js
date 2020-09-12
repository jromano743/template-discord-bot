/*
*   Command: ship
*   Create an image of relationships between randomly selected channel users
*/
const util = require('../utils/util')//Requirement of the "Util" module
const Jimp = require('jimp')//Requirement of the "Jimp" module
module.exports = {
    name: 'ship',         //Command name                                                                      
    cooldown: 10,         //Command cooldown
    aliases: [],          //Command alias
    description: 'El bot tambien shipea a la gente. Debe haber al menos 8 usuarios en el canal',
    args: false,          //If the command needs arguments
    usage: ' ',           //How to use the command. (Example)
    guildOnly: true,      //If the command is only from the server (Generally yes)
    execute: async function(message, args) {//Command execution function
        //Declaration of variables
        let img = './assets/shipTemplate.png'
        let avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8

        let usersInChannel = message.channel.members.array()
        let users = []
        
        //Check that there are at least 8 human users on the channel
        for(let i=0;i<usersInChannel.length;i++){
          if(!usersInChannel[i].user.bot){
            users.push(usersInChannel[i])
          }
        }
        
        if(users.length < 8){
          util.errorMessage(message)
          return
        }

        //Sort the users randomly and choose the first 8
        util.shuffleArray(users)//sort users
        avatar1 = users[0].user
        avatar2 = users[1].user
        avatar3 = users[2].user
        avatar4 = users[3].user
        avatar5 = users[4].user
        avatar6 = users[5].user
        avatar7 = users[6].user
        avatar8 = users[7].user

        //Reading of users' avatar in jpeg format
        let readUserAvatar1 = await Jimp.read(avatar1.displayAvatarURL({format: 'png'}))
        let readUserAvatar2 = await Jimp.read(avatar2.displayAvatarURL({format: 'png'}))
        let readUserAvatar3 = await Jimp.read(avatar3.displayAvatarURL({format: 'png'}))
        let readUserAvatar4 = await Jimp.read(avatar4.displayAvatarURL({format: 'png'}))
        let readUserAvatar5 = await Jimp.read(avatar5.displayAvatarURL({format: 'png'}))
        let readUserAvatar6 = await Jimp.read(avatar6.displayAvatarURL({format: 'png'}))
        let readUserAvatar7 = await Jimp.read(avatar7.displayAvatarURL({format: 'png'}))
        let readUserAvatar8 = await Jimp.read(avatar8.displayAvatarURL({format: 'png'}))

        //Avatar resize
        readUserAvatar1.resize(100,100)
        readUserAvatar2.resize(100,100)
        readUserAvatar3.resize(100,100)
        readUserAvatar4.resize(100,100)
        readUserAvatar5.resize(100,100)
        readUserAvatar6.resize(100,100)
        readUserAvatar7.resize(100,100)
        readUserAvatar8.resize(100,100)

        //The avatars are placed in the image
        Jimp.read(img)
        .then(image => {
          image.composite(readUserAvatar1, 100, 0)
          image.composite(readUserAvatar2, 300, 0)
          image.composite(readUserAvatar3, 500, 0)
          image.composite(readUserAvatar4, 100, 175)
          image.composite(readUserAvatar5, 300, 175)
          image.composite(readUserAvatar6, 500, 175)
          image.composite(readUserAvatar7, 300, 375)
          image.composite(readUserAvatar8, 500, 375)
          
          //Usernames are printed on the image
          Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
            image
              .print(font, 100, 101, avatar1.username, 150)
              .print(font, 401, 14, avatar2.username, 150)
              .print(font, 560, 101, avatar3.username, 150)
              .print(font, 100, 276, avatar4.username, 150)
              .print(font, 401, 196, avatar5.username, 150)
              .print(font, 560, 276, avatar6.username, 150)
              .print(font, 300, 476, avatar7.username, 150)
              .print(font, 500, 476, avatar8.username, 150)
              .getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
              if (err) return console.log(err);
              //Send the image
              message.channel.send({ files: [{ attachment: buffer, name: "image.png"}] })
            })
          })
        })
        .catch(err => {
          //Send error
          message.channel.send("Error al crear la imagen");
        });
    }
}