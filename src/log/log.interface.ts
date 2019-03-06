export interface ILog {
    severity: string;
    name: string;
    description: string;
    timestamp: Date;
    hostname: string;
    service: string;
}
