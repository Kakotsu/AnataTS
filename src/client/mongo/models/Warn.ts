import { model, Schema } from 'mongoose';

const WarnSchema = new Schema({
    warnId: String,
    userId: String,
    moderatorId: String,
    serverId: String,
    date: Date,
    reason: {
        type: String,
        required: false,
    }
});

export let Warn = model('Warn', WarnSchema);