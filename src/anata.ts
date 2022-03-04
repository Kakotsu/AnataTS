// Anata bot

import { AnataClient } from './client/Client';
import { Intents } from 'discord.js';
/* import mongoose from 'mongoose'; */
require('dotenv').config();

const client = new AnataClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { parse: ['users'] }
});

client.prefix = `${process.env['PREFIX']}`
/* mongoose.connect(`${process.env['MONGO_URL']}`), client.db = new mongoose.Connection */
client.spotifyCredentials = { id: process.env['SPOTIFY_ID'], secret: process.env['SPOTIFY_SECRET'] };

import * as Commands from './commands/Commands';
for (const Category of Object.values(Commands)) {
    const commandPer = Category.commands;
    
    let commands = [];

    for (const command of Object.values(commandPer)) {
        client.commands.set(command.name, { execute: command.execute, slashExecute: command.slashExecute });
        commands.push(command);
    }

    client.commandCategories.set(Category.name, [Category.name, Category.description, commands]);
}

for (const Event of Object.values(client.events)) {
    if (Event.type === 'discord') {
        // @ts-ignore
        client.on(Event.name, (...args: any) => Event.execute([...args], client));
    }
    // } else if (Event.type === 'mongo') {
    //     // @ts-ignore
    //     client.db.on(Event.name, (...args: any) => Event.execute([...args], client));
    // }
}

client.login(`${process.env['TOKEN']}`);