import { CommandInteraction } from "discord.js";
import { AnataClient } from "../../Client";

export let interactionCreate = {
    name: "interactionCreate",
    type: 'discord',
    execute(am: any, client: AnataClient) {
        const interaction: CommandInteraction = am[0];

        if (interaction.isCommand()) {
            const commandName = interaction.commandName;
            const command = client.commands.get(commandName);
            const channel = interaction.guild?.channels.cache.get(`${interaction.channelId}`);
            if (!command) return;

            if (command.permissions) {
                const authorPerms = channel?.permissionsFor(`${interaction.user.id}`);

                for (const permission of command.permissions) {
                    if (!authorPerms || !authorPerms.has(permission)) {
                        let reply = `You don't have permission to execute that command! `;
                        reply += `You need the following permissions to do this:\n`;
                        reply += `\`\`\`${command.permissions.join('`, `')}\`\`\``;

                        return interaction.reply({ content: `${reply}`, ephemeral: true });
                    }
                }
            }

            if (command.botPermissions) {
                const clientPerms = channel?.permissionsFor(`${client.user?.id}`);

                for (const permission of command.botPermissions) {
                    if (!clientPerms || !clientPerms.has(permission)) {
                        let reply = `I'm missing required permissions for this command! `;
                        reply += `I need the following permissions to do this:\n`;
                        reply += `\`\`\`${command.botPermissions.join('`, `')}\`\`\``;

                        return interaction.reply({ content: `${reply}`, ephemeral: true });
                    }
                }
            }

            try {
                command.slashExecute(interaction, client);
            } catch (e) {
                console.log(e);
                interaction.reply({ content: `Whoops, there was an error executing that command!`, ephemeral: true })
            }
        }
    }
}