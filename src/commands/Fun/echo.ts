import { CommandInteraction, Message } from "discord.js";
import { AnataClient } from "../../client/Client";

export let Echo = {
    name: "echo",
    description: "Echos back what you say.",
    args: true,
    slashExecute(interaction: CommandInteraction, client: AnataClient) {
        const content = interaction.options.getString('content');
        interaction.reply({ content: content });
    },
    execute(message: Message, args: any, client: AnataClient) {
        const content = args.join(' ');
        message.reply({ content: content });
    }
}