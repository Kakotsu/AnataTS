import {CommandInteraction, Message} from "discord.js";
import {AnataClient} from "../../client/Client";
import {SlashCommandBuilder} from "@discordjs/builders";

export let Ban = {
    name: "ban",
    description: "Bans a user from the server.",
    args: true,
    botPermissions: ['BAN_MEMBERS'],
    permissions: ['BAN_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a user from the server")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Mention a user to ban")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Provide a reason for the ban.")),
    async slashExecute(interaction: CommandInteraction, client: AnataClient) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild?.members.fetch(`${user?.id}`);
        const author = await interaction.guild?.members.fetch(`${interaction.user.id}`);
        const bot = await interaction.guild?.members.fetch(`${client.user?.id}`);

        let reason: string = interaction.options.getString('reason') || "No reason provided.";


        if (!member) return interaction.reply({content: "I can't find that user.", ephemeral: true});
        if (!member.bannable) return interaction.reply({content: "I can't ban that user.", ephemeral: true});
        if (member.id === interaction.guild?.ownerId) return interaction.reply({
            content: "I can't ban the owner.",
            ephemeral: true
        });
        if (member.id === interaction.user.id) return interaction.reply({
            content: "You can't ban yourself.",
            ephemeral: true
        });

        const ClientPos = bot?.roles.highest.position;
        const AuthorPos = author?.roles.highest.position;
        const MemberPos = member.roles.highest.position;

        // @ts-ignore
        if (MemberPos >= AuthorPos.roles.highest.position) return interaction.reply({
            content: "You can't ban that user.",
            ephemeral: true
        });
        // @ts-ignore
        if (MemberPos >= ClientPos.roles.highest.position) return interaction.reply({
            content: "I can't ban that user.",
            ephemeral: true
        });

        await member.ban({reason: reason});

        let Embed = client.functions.randomEmbedMessage({
            title: `🦿 You were banned from ${interaction.guild?.name}`,
            description: `Banned ${reason ? `for '${reason}'` : 'without a reason given.'}`,
            color: 2767506,
        });

        user?.send({embeds: [Embed]}).catch(() => {
            interaction.reply({content: `I wasn't able to DM the user, but they still got banned.`, ephemeral: true});
        }).then(() => {
            Embed = client.functions.randomEmbedMessage({
                title: '🦿 Banned member',
                description: `banned user ${user.tag}${reason ? ` for '${reason}'` : ''}`,
                color: 2767506,
            });

            member.ban({reason: reason})
                .then(() => interaction.reply({embeds: [Embed]}))
                .catch(() => interaction.reply({
                    content: `Unable to ban ${user.tag} for an unknown reason.`,
                    ephemeral: true
                }));
        });
    },
    async execute(message: Message, args: any, client: AnataClient) {
        const user: any = await client.functions.getUserFromString(args[0].replace(/[<@!>]/g, ''), message);
        const member = await message.guild?.members.fetch(`${user?.id}`);
        const author = await message.guild?.members.fetch(`${message.author.id}`);
        const bot = await message.guild?.members.fetch(`${client.user?.id}`);

        let reason = "No reason provided.";
        if (args[1]) reason = args.shift().join(' ');

        if (!member) return message.reply({content: "I can't find that user."});
        if (!member.bannable) return message.reply({content: "I can't ban that user."});
        if (member.id === message.guild?.ownerId) return message.reply({content: "I can't ban the owner."});
        if (member.id === message.author.id) return message.reply({content: "You can't ban yourself."});

        const ClientPos = bot?.roles.highest.position;
        const AuthorPos = author?.roles.highest.position;
        const MemberPos = member.roles.highest.position;

        // @ts-ignore
        if (MemberPos >= AuthorPos.roles.highest.position) return message.reply({content: "You can't ban that user."});
        // @ts-ignore
        if (MemberPos >= ClientPos.roles.highest.position) return message.reply({content: "I can't ban that user."});

        await member.ban({reason: reason});
        message.reply({content: `${member.user.tag} has been banned.`});

        let Embed = client.functions.randomEmbedMessage({
            title: `🦿 You were banned from ${message.guild?.name}`,
            description: `Banned ${reason ? `for '${reason}'` : 'without a reason given.'}`,
            color: 2767506,
        });

        user?.send({embeds: [Embed]}).catch(() => {
            message.reply({content: `I wasn't able to DM the user, but they still got banned.`});
        }).then(() => {
            Embed = client.functions.randomEmbedMessage({
                title: '🦿 Banned member',
                description: `banned user ${user.tag}${reason ? ` for '${reason}'` : ''}`,
                color: 2767506,
            });

            member.ban({reason: reason})
                .then(() => message.reply({embeds: [Embed]}))
                .catch(() => message.reply({content: `Unable to ban ${user.tag} for an unknown reason.`}));
        });
    }
}