//Modules
const fs = require('fs')
const Discord = require('discord.js')
const config = require('../utils/config.json')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));

//Local resources
const util = require("../utils/util");

for (const file of commandFiles) {
	const command = require(`./../commands/${file}`)
	client.commands.set(command.name, command)
}

//Boot function
client.on("ready", async () => {
  //Boot message
  console.log(`\n${client.user.username} Is ready :D\n`);
  
  //Activity settings
  client.user.setPresence( {
   status: "online",
   game: {
       name: 'Bot stuff',
       type: "PLAYING"
   }
 })
})

//Message event function
client.on('message', async (message) => {
  if(message.author.bot) return
  //
  //  Add points to user
  //
  util.addExp(message)
  //
  //  Check the prefix
  //
  let str = message.content.toLowerCase()
  if (!str.startsWith(config.PREFIX)) return;

  //Take the arguments and the name of the command
  const args = message.content.slice(config.PREFIX.length).split(/ +/)
  const commandName = args.shift().toLowerCase();
  
  //Check the command or an alias
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if (!command) return util.errorMessage(message)

  //Check if the command needs arguments
  if (command.args && !args.length) {
    let reply = `${message.author}, este comando necesita argumentos`

    //Check the type of argument
		if (command.usage) {
			reply += `\nEl comando se usa así \`${config.PREFIX}${command.name} ${command.usage}\``
		}
    return message.channel.send(reply)
  }

  //Check if the command is only for servers
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('No puedo ejecutar comandos en MD! :c')
  }

  //Try to run the command
  try {
    command.execute(message, args)

  } catch (error) {
    console.error(error)
    message.reply('Hubo un problema al ejecutar el comando')
  }
});

//Load the bot token
client.login(config.TOKEN)