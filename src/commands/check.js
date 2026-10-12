import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Filters lists for numbers 2,600 or lower and shows the associated names')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Paste your list of names and numbers here')
                .setRequired(true)),

    async execute(interaction) {
        const text = interaction.options.getString('text');
        const lines = text.split('\n');
        const results = [];

        for (const line of lines) {
            const match = line.match(/\b\d+(?:\.\d+)?\b/g);
            if (match) {
                const numStr = match[match.length - 1];
                const num = Number(numStr);

                if (num <= 2600) {
                    results.push(line.trim());
                }
            }
        }

        if (results.length === 0) {
            return await interaction.reply({ content: 'No entries with a number 2,600 or lower were found.', ephemeral: true });
        }

        await interaction.reply(`**Entries with numbers 2,600 or lower:**\n\`\`\`\n${results.join('\n')}\n\`\`\``);
    },
};
