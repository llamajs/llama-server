"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
    severity: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    hostname: { type: String, required: true },
    service: { type: String, required: true },
}, {
    autoIndex: false,
    timestamps: { createdAt: true },
    id: true,
});
exports.LogModel = mongoose.model('Log', logSchema);
//# sourceMappingURL=log.model.js.map