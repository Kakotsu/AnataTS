import {Routes} from 'discord-api-types/v9'
import {REST} from '@discordjs/rest'

require('dotenv').config();

const GuildID = process.env["GUILD_ID"];
const ClientID = process.env["CLIENT_ID"];
const argv = process.argv[2]

const rest = new REST().setToken(`${process.env['TOKEN']}`);
const guild = Routes.applicationGuildCommands
const global = Routes.applicationCommands


let commands: any = [];
import * as Commands from './commands/Commands';
for (const Category of Object.values(Commands)) {
    for (const Command of Category.commands) {
        if (Command.data) {
            let data: any = Command.data
            data = data.toJSON();
            commands.push(data);
        }
    }
}

(async () => {
    try {
        console.log(`Started refreshing application (/) commands ${argv === "guild" ? "in guild" : "globally"}.`);

        argv === "guild" ? await rest.put(guild(`${ClientID}`, `${GuildID}`), {body: commands})
            : await rest.put(global(`${ClientID}`), { body: commands });

        console.log(`Successfully refreshed application commands (/) ${argv === "guild" ? "in guild" : "globally"}.`);
    } catch (e) {
        console.error(e);
    }
})();