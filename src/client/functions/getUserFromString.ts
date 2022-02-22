import { Message } from "discord.js";

/**
 * Obtains a user from a string
 * @param string - The string of the user's ID
 * @param message - Message. Also useful if the user isn't found.
 * @returns The user, or null if not found
 */
export let getUserFromString = async (string: string, message: Message) => {
    const client = message.client;
    let user

    let expression = string.match(/<@!?(\d+)>/);
    if (expression) {
        user = client.users.cache.get(expression[1]);
        if (user) return user;
    }

    expression = string.match(/(\d+)/);
    if (expression) {
        user = client.users.cache.get(expression[1]);
        if (user) return user;
    }

    try {
        user = await message.guild?.members.fetch(string)
    } catch (e) { return null }

    if (user) return user;
}