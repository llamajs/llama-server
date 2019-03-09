import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

export class MongoDB {
    static db: Db;

    static connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true }, async (error, client) => {
                if (error) return reject(error);

                console.log(`[MongoDB] connected to port ${config.db.port}`);
                MongoDB.db = client.db(config.db.name);

                return resolve(MongoDB.db);
            });
        });
    }

    static insert(collection: string, doc: any) {
        return new Promise((resolve, reject) => {
            MongoDB.db.collection(collection).insertOne(doc, (error, results) => {
                if (error) return reject(error);

                return resolve(results);
            });
        });
    }

    static getMany(collection: string, filter: any, skip: number, limit: number) {
        let docs: any[] = [];

        return new Promise((resolve, reject) => {
            MongoDB.db.collection(collection).find(filter, { skip, limit })
                .on('data', (doc) => {
                    docs.push(doc);
                })
                .on('end', () => {
                    if (!docs) return reject();
                    
                    try {
                        resolve(docs);
                    } catch (error) {
                        return reject(error);
                    }
                });
        });
    }
}