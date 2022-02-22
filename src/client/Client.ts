import { Client, Collection } from 'discord.js';
import * as Functions from './functions/Functions';
import * as Access from './access/Access';
import * as Models from './mongo/models';
import * as Events from './events/Events';
import mongoose from 'mongoose';

export class AnataClient extends Client {
    spotifyCredentials!: Object;
    commandCategories!: Collection<any, any>;
    commands!: Collection<any, any>;
    functions!: typeof Functions;
    events!: typeof Events;
    models!: typeof Models;
    access!: typeof Access;
    prefix!: string;
    db!: mongoose.Connection;
    constructor(options: any) {
        super(options);

        this.commandCategories = new Collection();
        this.commands = new Collection();
        this.functions = Functions;
        this.events = Events;
        this.models = Models;
        this.access = Access;
    }
}