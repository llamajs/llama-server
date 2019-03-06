"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_manager_1 = require("./log.manager");
const querystring_1 = require("querystring");
const url = require("url");
function getHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'GET') {
            if (req.url) {
                const parsedUrl = url.parse(req.url);
                if (parsedUrl.query) {
                    const query = querystring_1.parse(parsedUrl.query);
                    const filter = {
                        severity: query.severity,
                        name: query.name,
                        description: query.description,
                        hostname: query.hostname,
                        service: query.service,
                    };
                    const logs = yield log_manager_1.LogManager.getLogs(filter, Number(query.startIndex || 0), Number(query.endIndex || 0));
                    if (logs) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(logs));
                    }
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Could not get logs' }));
            }
        }
    });
}
exports.getHandler = getHandler;
//# sourceMappingURL=log.controller.js.map