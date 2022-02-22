import { CommandInteraction, Message } from "discord.js";
import { AnataClient } from "../../client/Client";

export let Ping = {
    name: "ping",
    description: "Ping and get back the latency!",
    slashExecute(interaction: CommandInteraction, client: AnataClient) {
        interaction.reply("Pong!");
    },
    execute(message: Message, args: any, client: AnataClient) {
        message.reply("Pong!");
    }
}