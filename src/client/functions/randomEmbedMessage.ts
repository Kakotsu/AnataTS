import { MessageEmbed } from 'discord.js';
import * as _ from 'lodash';

const randomMessages = [
    'Edit randomEmbedMessage.ts in src/client/functions to add more footers',
]

/**
 * Obtains a user from a string
 * @param embed - Embed information to be used in the embed
 * @returns Embed with a random footer
 */
export let randomEmbedMessage = (embed: any|MessageEmbed) => {
    const message = _.sample(randomMessages);
    embed.footer = { text: message };
    return embed;
}