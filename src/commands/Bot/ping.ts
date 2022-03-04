import { CommandInteraction, Message } from "discord.js";
import { AnataClient } from "../../client/Client";
import {SlashCommandBuilder} from "@discordjs/builders";

export let Ping = {
    name: "ping",
    description: "Ping and get back the latency!",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping and get back the latency!"),
    slashExecute(interaction: CommandInteraction, client: AnataClient) {
        interaction.reply("Pong!");
    },
    execute(message: Message, args: any, client: AnataClient) {
        message.reply("Pong!");
    }
}