/*
*   Command: help
*   Respond with the list of available commands
*   If it is used with the name of a command as an argument, it shows the information of this
*/
const prefix = require('../utils/config.json').PREFIX //Take the prefix from the configuration file
module.exports = {
    name: 'help',                                                       //Command name
    cooldown: 0,                                                        //Command cooldown
    aliases: ['commands'],                                              //Command alias
	description: 'Lista de todos los comandos y comandos especificos',  //Command description
	args: false,                                                        //If the command needs arguments
	usage: '(command name)',                                            //How to use the command. (Example)
    guildOnly: false,                                                   //If the command is only from the server (Generally yes)
    execute(message, args) {//Command execution function
        //Array containing the information to be sent in a message                
		const data = [];
        const { commands } = message.client;

        //If no argument was received
        if (!args.length) {
            //Generate a list of commands
            data.push('Aqui tienes la lista de mis comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`Puedes escribir ${prefix}help [command name] para obtener informacion sobre un comando especifico`);

            //Send by MD the command list
            return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Te envié un MD con todos mis comandos. 😄');
            })
            .catch(error => {
                message.reply('Veo que no puedo enviarte un MD... ¿Tienes deshabilitados los mensajes?');
            });
        }

        //Take the first argument and check if it is a command
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        //If it is not a valid command, inform it and the function ends
        if (!command) {
            return message.reply('Ese no es un comando valido 😅');
        }

        //Show the command and its data
        data.push(`**Nombre:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripcion:** ${command.description}`);
        if (command.usage) data.push(`**Ejemplo:** ${prefix}${command.name} ${command.usage}`);

        //Send the information
        message.channel.send(data, { split: true });
	}
}