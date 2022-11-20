const { SlashCommandBuilder } = require('discord.js');
const process = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.addStringOption(option =>
			option.setName('operation')
				.setDescription('The server operation')
				.setRequired(true)
				.addChoices(
					{ name: 'start', value: 'start' },
					{ name: 'stop', value: 'stop' },
					{ name: 'restart', value: 'restart' },
					{ name: 'status' , value: 'status' }
				)
		),
	async execute(interaction) {
		const operation = interaction.options.getString('operation');
		let status;

		switch (operation){
		 case 'start':
			process.exec('systemctl --user start altv-server', (err, stdout, stderr) => {
                                console.log(stdout);
                                console.log(stderr);
                                console.log(err);
                        }).on('exit', async code => {
				code ? status = "Server läuft bereits." : status = "Server wird gestartet.";
                                await interaction.reply("Server wird gestartet.")
                        });
			break;
		 case 'stop':
			 process.exec('systemctl --user stop altv-server', (err, stdout, stderr) => {
                                console.log(stdout);
                                console.log(stderr);
                                console.log(err);
                        }).on('exit', async code => {
				code ? status = "Server offline, es gibt nichts zu stoppen." : status = "Server wurde gestoppt.";
                                await interaction.reply("Server wurde gestoppt.")
                        });

			break;
		 case 'restart':
			 process.exec('systemctl --user restart altv-server', (err, stdout, stderr) => {
                                console.log(stdout);
                                console.log(stderr);
                                console.log(err);
                        }).on('exit', async code => {
                                await interaction.reply("Server startet neu. Nutze '/server status' um den status des Servers zu sehen.")
                        });
			break;
		 case 'status':
			process.exec('systemctl --user status altv-server', (err, stdout, stderr) => {
				console.log(stdout);
				console.log(stderr);
				console.log(err);
			}).on('exit', async code => {
				code ? status = "OFFLINE" : status = "ONLINE";
				await interaction.reply(status)
			});
		}
		// interaction.guild is the object representing the Guild in which the command was run
		//await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};
