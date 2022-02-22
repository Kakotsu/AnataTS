import { CommandInteraction, Message } from "discord.js";
import { AnataClient } from "../../client/Client";

export let ServerInfo = {
    name: "serverinfo",
    description: "Get info about the server.",
    slashExecute(interaction: CommandInteraction, client: AnataClient) {
        let ServerInfoEmbed = client.functions.randomEmbedMessage({
            title: ':desktop: Server Info',
            color: 2767506,
            thumbnail: {
                url: `${interaction.guild?.iconURL({ dynamic: true, size: 1024, format: 'png' })}`
            },
            fields: [
                {
                    name: `:question: Server Name`,
                    value: `${interaction.guild?.name}`
                },
                {
                    name: `:people_hugging: Total Members`,
                    value: `${interaction.guild?.memberCount}`
                },
                {
                    name: `:clock3: Server was created...`,
                    // @ts-ignore
                    value: `<t:${Math.floor(interaction.guild.createdAt / 1000)}>`
                },
                {
                    name: `:crown: Server Owner`,
                    value: `<@${interaction.guild?.ownerId}>`
                }
            ]
        });

        interaction.reply({ embeds: [ServerInfoEmbed] });
    },
    execute(message: Message, args: any, client: AnataClient) {
        let ServerInfoEmbed = client.functions.randomEmbedMessage({
            title: ':desktop: Server Info',
            color: 2767506,
            thumbnail: {
                url: `${message.guild?.iconURL({ dynamic: true, size: 1024, format: 'png' })}`
            },
            fields: [
                {
                    name: `:question: Server Name`,
                    value: `${message.guild?.name}`
                },
                {
                    name: `:people_hugging: Total Members`,
                    value: `${message.guild?.memberCount}`
                },
                {
                    name: `:clock3: Server was created...`,
                    // @ts-ignore
                    value: `<t:${Math.floor(message.guild.createdAt / 1000)}>`
                },
                {
                    name: `:crown: Server Owner`,
                    value: `<@${message.guild?.ownerId}>`
                }
            ]
        });

        message.reply({ embeds: [ServerInfoEmbed] });
    }
}