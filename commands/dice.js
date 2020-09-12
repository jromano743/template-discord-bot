/*
*   Command: dice
*   Simulate a roll of the dice using the parameters received
*   Possible parameters
*       <n dice> <n faces>
*       <n dice> <n faces> <y>
*       <n dice> <n faces> <increment value>
*/
const util = require('../utils/util.js')//Requirement of the "Util" module
module.exports = {
    name: 'dice',                                                       //Command name
    cooldown: 10,                                                       //Command cooldown
    aliases: ['dado'],                                                  //Command alias
    description: 'Tira un dado de la cantidad de caras que quieras.',   //Command description
    args: true,                                                         //If the command needs arguments
    usage: '<n dices> <n faces>',                                       //How to use the command. (Example)
    guildOnly: true,                                                    //If the command is only from the server (Generally yes)
	execute(message, args) {//Command execution function
        let dices = args.shift()    //Number of dice
        let faces = args.shift()    //Number of faces
        let rol = args.shift()      //Parameter to show extra data
        let isRol = false           //Extra data variable
        let increase = undefined    //Variable with the increase

        //Control if extra data needs to be displayed (If the third parameter is "y")
        if(rol == 'y' || rol == 'Y'){
            isRol = true
        }else if(!isNaN(rol)){
            increase = rol
        }

        //Check that both variables are numbers
        if(isNaN(dices) || isNaN(faces)) return util.errorMessage(message)

        //Check that the number of dice is within the available margin
        if(dices > 10 || dices < 1) return util.errorMessage(message)

        //Check that the number of faces is within what is allowed
        if(faces > 120 || faces < 2) return util.errorMessage(message)

        
        let textEmbed           //Variable with the message to be sent
        let dice = 0            //Variable that contains the value of the die
        let evenNumbers = 0     //Variable of even numbers
        let oddNumbers = 0      //Variable of odd numbers
        let evenNumberSum = 0   //Variable sum of even numbers
        let oddNumerSum = 0     //Variable sum of odd numbers
        let totalAmount = 0     //Total sum variable
          
        textEmbed =`**${message.author.username}** arrojó **${dices}** dados de **${faces}** caras 🎲`
        
        //Throwing the dice
        for(let i=0;i<dices;i++){
            dice = Math.floor(Math.random() * faces) + 1;
            if(isRol){//If extra data is required
                if(util.isEven(dice)){
                    evenNumbers++
                    evenNumberSum += dice
                }else{
                    oddNumbers++
                    oddNumerSum += dice
                }
            }
            totalAmount += dice

            //If an increment is required, a different message is placed
            if(!increase){
                textEmbed +=`\nLe salio **${dice}**! 🎲`
            }else{
                let aux = Number.parseInt(dice) + Number.parseInt(increase)
                textEmbed +=`\nLe salio **${dice}** +${increase} = **${aux}**! 🎲`
            }
        }

        //A final message is added
        if(isRol){
            textEmbed += `\n\nCantidad de pares: **${evenNumbers}**\nCantdidad de impares: **${oddNumbers}**\nSuma de numeros pares: **${evenNumberSum}**\nSuma de numeros impares: **${oddNumerSum}**\n\n🎲 Suma de todos los dados: **${totalAmount}** 🎲`
        }else{
            textEmbed += `\n\n🎲 Suma de todos los dados: **${totalAmount}** 🎲`
        }
        
        //Message is sent
        util.sendEmbed(message, `${message.author.username} lanzó unos dados`, textEmbed, 'RANDOM')
	}
}