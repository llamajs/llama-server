export interface ILog {
    name: string;
    description: string;
    severity: string;
    service: string;
    hostname: string;
    timestamp: Date;
    transactionId?: string;
    user?: string;
    [ key: string ]: any; 
}
