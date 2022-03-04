import { CommandInteraction, Message } from "discord.js";
import { AnataClient } from "../../client/Client";
import {SlashCommandBuilder} from "@discordjs/builders";

export let Echo = {
    name: "echo",
    description: "Echos back what you say.",
    args: true,
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Echos back what you say.")
        .addStringOption(option =>
            option.setName("content")
                .setDescription("What I'll be echoing back.")
                .setRequired(true)),
    slashExecute(interaction: CommandInteraction, client: AnataClient) {
        const content = interaction.options.getString('content');
        interaction.reply({ content: content });
    },
    execute(message: Message, args: any, client: AnataClient) {
        const content = args.join(' ');
        message.reply({ content: content });
    }
}