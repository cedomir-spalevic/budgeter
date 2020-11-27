import { config } from "../../../../package.json";

export enum Environment {
    Local,
    Dev,
    Prod
}

class EnvironmentService {
    static instance: EnvironmentService;
    public environment: Environment;

    constructor() {
        this.environment = this.getEnvironment();
    }

    static getInstance(): EnvironmentService {
        if(!EnvironmentService.instance)
            EnvironmentService.instance = new EnvironmentService();
        return EnvironmentService.instance;
    }

    private getEnvironment(): Environment {
        const env = config.environment.toLowerCase().trim();
        switch(env) {
            case "local":
                return Environment.Local;
            case "dev":
                return Environment.Dev;
            case "prod":
                return Environment.Prod;
            default:
                return Environment.Dev;
        }
    }
}

export default {
    getInstance: () => EnvironmentService.getInstance()
}