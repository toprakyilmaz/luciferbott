const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {
const balance = await db.fetch(`ktbalance_${message.author.id}_d0ru`)
    const embed = new Discord.RichEmbed()
        .setColor('0x36393E')
        .setAuthor(`${message.author.username} puanın karşında!`, message.author.avatarURL)
        .setDescription(`•               \` ${balance  || 0}\` \n`)
        .setFooter(`${client.user.username} ` + 'Kelime tahmini sistemi', client.user.avatarURL )
    return message.channel.sendEmbed(embed);

};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
     kategori: "Eğlence"

};

exports.help = {
  name: 'kpuan',
  description: 'd0ru ya aittir aksini iddia edene hakkım haramdır.',
  usage: 'kpuan'
};
   