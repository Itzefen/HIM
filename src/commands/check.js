import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Filters pasted text and lists numbers 2,600 or lower'),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const foundNumbers = text.match(/\b\d+(?:\.\d+)?\b/g);

        if (!foundNumbers) {
            return await interaction.reply({ content: 'No numbers were found in your text.', ephemeral: true });
        }

        const filtered = foundNumbers.filter(numStr => Number(numStr) <= 2600);

        if (filtered.length === 0) {
            return await interaction.reply({ content: 'Found numbers, but all of them are strictly above 2,600!', ephemeral: true });
        }

        const results = filtered.join(', ');
        await interaction.reply(`**Numbers 2,600 or lower:**\n${results}`);
    },
};
