import { Message } from "discord.js";
import { AnataClient } from "../../Client";

export let messageCreate = {
    name: "messageCreate",
    type: 'discord',
    execute(am: any, client: AnataClient) {
        const message: Message = am[0];

        if (message.content.startsWith(client.prefix)) {
            if (message.author.bot) return;
            const args = message.content
                .slice(`${process.env["PREFIX"]}`.length)
                .trim()
                .split(' ')

            const commandName = args.shift()?.toLowerCase();
            const command = client.commands.get(commandName);
            const channel = message.guild?.channels.cache.get(`${message.channelId}`);
            if (!channel?.permissionsFor(`${client.user?.id}`)?.has('SEND_MESSAGES')) return;
            if (!command) return message.reply("That command doesn't exist!");

            if (command.args && !args.length) {
                let reply = "You must provide arguments for that command!";
                if (command.usage) reply += ` Usage: \`${client.prefix}${command.name} ${command.usage}\``;

                return message.reply({ content: `${reply}` });
            } 

            if (command.permissions) {
                const authorPerms = channel.permissionsFor(`${message.author.id}`);

                for (const permission of command.permissions) {
                    if (!authorPerms || !authorPerms.has(permission)) {
                        let reply = `You don't have permission to execute that command! `;
                        reply += `You need the following permissions to do this:\n`;
                        reply += `\`\`\`${command.permissions.join('`, `')}\`\`\``;

                        return message.reply({ content: `${reply}` });
                    }
                }
            }

            if (command.botPermissions) {
                const clientPerms = channel.permissionsFor(`${client.user?.id}`);

                for (const permission of command.botPermissions) {
                    if (!clientPerms || !clientPerms.has(permission)) {
                        let reply = `I'm missing required permissions for this command! `;
                        reply += `I need the following permissions to do this:\n`;
                        reply += `\`\`\`${command.botPermissions.join('`, `')}\`\`\``;

                        return message.reply({ content: `${reply}` });
                    }
                }
            }

            try {
                command.execute(message, args, client);
            } catch (e) {
                console.log(e);
                message.reply({ content: `Whoops, there was an error executing that command!` });
            }
        }
    }
}