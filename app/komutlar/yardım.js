const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
	if (!args[0]) {
		const help = {}
		client.commands.forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`\`${command.help.name}\``);
		})
		var str = ''
		for (const kategori in help) {
			str += `**${kategori.charAt(0).toUpperCase() + kategori.slice(1)}** ${help[kategori].join(" - ")}\n\n`
		}

		const embed = new Discord.RichEmbed()
			.setAuthor(`${client.user.username} Komutları`)
			.setDescription(`》Komut Listesi《\nKomutlar hakkında bilgi için: ${ayarlar.prefix}yardım <komut adı>\n\n${str}\n**DBL Vote:** [[Tıkla!]](https://discordbots.org/bot/619970522754580482/vote)`)
			.setTimestamp()
			.setColor("BLACK")
             .setFooter(client.user.username, client.user.avatarURL)
		message.channel.send({embed})
		return
	}
	let command = args[0]
	if (client.commands.has(command)) {
		command = client.commands.get(command)
		var yetki = command.conf.permLevel.toString()
			.replace("0", `Yetki gerekmiyor.`)
			.replace("1", `Üyeleri At yetkisi gerekiyor.`)
			.replace("2", `Üyeleri Engelle yetkisi gerekiyor.`)
			.replace("3", `Yönetici yetkisi gerekiyor.`)
			.replace("4", `Bot sahibi yetkisi gerekiyor.`)
		const embed = new Discord.RichEmbed()
			.addField('Komut', command.help.name, false)
			.addField('Açıklama', command.help.description, false)
			.addField('Kullanabilmek için Gerekli Yetki', `\`${yetki}\``)  
			.addField('Doğru Kullanım', `\`${ayarlar.prefix}${command.help.usage}\``)
			.addField('Kullanım şekilleri', command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Bulunmuyor')
			.setTimestamp()
			.setColor("BLACK")
             .setFooter(client.user.username, client.user.avatarURL)
		message.channel.send({embed})
    message.react('✅')
	} else {
		const embed = new Discord.RichEmbed()
			.setDescription(`${args[0]} diye bir komut bulunamadı. Lütfen geçerli bir komut girin. Eğer komutları bilmiyorsanız ${ayarlar.prefix}yardım yazabilirsiniz.`)
			.setTimestamp()
			.setColor("BLACK")
		message.channel.send({embed})
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['y'],
	permLevel: 0,
	kategori: 'bot'
}

exports.help = {
	name: 'yardım',
	description: 'Tüm komutları gösterir.',
	usage: 'yardım'
}