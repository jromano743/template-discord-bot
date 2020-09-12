
/*
*   Command: love
*   Returns an image with a percentage of love between the mentioned 
*   user and the one who invoked the command or two mentioned users
*/
const Jimp = require('jimp')//Requirement of the "Jimp" module
module.exports = {
    name: 'love',                                                 //Command name
    cooldown: 10,                                                 //Command cooldown
    aliases: ['amors'],                                           //Command alias
    description: 'Comprueba tu amor con una persona etiquetada',  //Command description
    args: true,                                                   //If the command needs arguments
    usage: '<user>',                                              //How to use the command. (Example)
    guildOnly: true,                                              //If the command is only from the server (Generally yes)
    execute: async function(message, args) {//Command execution function
      //Verify the existence of a mention
      let mentionAray = message.mentions.users.array();
      if (mentionAray.length === 0) return message.channel.send("Debes mencionar a alguien");
      
      //Declaration of variables
      let avatar1, avatar2, mask;
      let loveText, loveBar = "";
      
      //Check whether the user mentions himself or not
      if (mentionAray.length === 1) {
        avatar1 = message.author.displayAvatarURL({format: 'png'});
        avatar2 = mentionAray[0].displayAvatarURL({format: 'png'});
      } else {
        avatar1 = mentionAray[0].displayAvatarURL({format: 'png'});
        avatar2 = mentionAray[1].displayAvatarURL({format: 'png'});
      }
      mask = "./assets/mask.png";
      
      //Reading the avatars and the mask
      let readAvatar1 = await Jimp.read(avatar1);
      let readAvatar2 = await Jimp.read(avatar2);
      let readMask = await Jimp.read(mask);

      //Resize avatars and mask
      readMask.resize(300, 300);
      readAvatar1.resize(300, 300);
      readAvatar2.resize(300, 300);

      //Apply the mask to the avatars
      readAvatar1.mask(readMask, 0, 0);
      readAvatar2.mask(readMask, 0, 0);

      //Initialize the variables for the message
      var randomAmountLove; //Love percentage value
      let randomLimit;      //Value containing the number of times a square will be printed on the love bar
      let heard = "";       //Variable containing the image link
      let mirror = false;   //Variable that indicates if the user mentioned himself

      //Generate the message
      if (message.author.id == mentionAray[0].id) {
        //If the user mentioned himself. Possible values will be 0 and 100.
        mirror = true;
        randomAmountLove = Math.floor(Math.random() * 2);
        if (randomAmountLove === 1) {
          randomLimit = randomAmountLove = 100;
          loveText = `**${message.author.username} el amor mas importante es el que tiene uno mismo 💕**`;
          heard = "./assets/trueLove.png";
        } else {
          randomLimit = 0;
          loveText = `**${message.author.username} seamos realistas, ni tu te quieres 💔**`;
          heard = "./assets/sad.png";
        }
      } else {
        //If the user mentioned another user, the possible values will be between 0 and 100
        randomAmountLove = Math.floor(Math.random() * 100);
        randomLimit = randomAmountLove / 10;
        randomLimit = Math.floor(randomLimit);
      }

      //Generate love bar with emojis
      //Green for values that are within the limit, gray for those that are not
      for (let l = 0; l < 10; l++) {
        if (l < randomLimit) {
          loveBar += "🟩";
        } else {
          loveBar += "⬜";
        }
      }

      /*
      *   If the mentioned user is different from the user who invoked the command, 
      *   the description and the image are loaded in relation to the value of "randomAmountLove"
      */
      if (!mirror) {
        if (randomAmountLove < 20) {
          loveText = "**Descuida, hay muchos peces en el mar**";
          heard = "./assets/sad.png";
        } else if (randomAmountLove < 40) {
          loveText = "**No parecen tener mucha quimica pero... ¿Quien sabe?**";
          heard = "./assets/nope.png";
        } else if (randomAmountLove < 60) {
          loveText = "**Son muy compatibles creo que podrian tener algo. Deberian intentarlo**";
          heard = "./assets/kiss.png";
        } else if (randomAmountLove < 80) {
          loveText = "**Pensé que eran novios. Nose que estan esperando**";
          heard = "./assets/love.png";
        } else if (randomAmountLove < 101) {
          loveText = "**¿La boda para cuando?**";
          heard = "./assets/trueLove.png"
        }
      }

      //Read and resize the emoji
      let readEmoji = await Jimp.read(heard);
      readEmoji.resize(300, 300);

      //Create the canvas of the image. Compose the image and send it
      let canvas = new Jimp(900, 300, (err, image) => {
        if (err) return console.log(err);
    
        image.composite(readAvatar1, 0, 0);
        image.composite(readEmoji, 300, 0);
        image.composite(readAvatar2, 600, 0);
        image.getBuffer(Jimp.MIME_PNG, function(err, buffer) {
          if (err) return console.log(err);
          message.channel.send(`**${randomAmountLove}%** [${loveBar}]\n${loveText}`, { files: [{ attachment: buffer, name: "image.png"}] })
        })
      })
    }
}