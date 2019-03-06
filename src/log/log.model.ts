
import * as mongoose from 'mongoose';
import { ILog } from './log.interface';

const logSchema: mongoose.Schema = new mongoose.Schema(
    {
        severity: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        timestamp: { type: String, required: true },
        hostname: { type: String, required: true },
        service: { type: String, required: true },
    },
    {
        autoIndex: false,
        timestamps: { createdAt: true },
        id: true,
    });

export const LogModel = mongoose.model<ILog & mongoose.Document>('Log', logSchema);
