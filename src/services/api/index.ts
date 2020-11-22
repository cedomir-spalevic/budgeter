export interface Config {
   budgeterApiUrl: string;
}

interface Environments {
   local: Config;
   dev: Config;
   test: Config;
   stage: Config;
   prod: Config;
}

const environments: Environments = {
   local: {
      budgeterApiUrl: "http://192.168.1.108:3000/api/"
   },
   dev: {
      budgeterApiUrl: "https://4hdyvf9voi.execute-api.us-east-1.amazonaws.com/prod/"
   },
   test: {
      budgeterApiUrl: "",
   },
   stage: {
      budgeterApiUrl: ""
   },
   prod: {
      budgeterApiUrl: ""
   }
}

const getEnvironmentConfig = (env: string = ""): Config => {
   if (env === null || env === undefined || env === "")
      return environments.local;
   if (env.indexOf("dev") !== -1)
      return environments.dev;
   if (env.indexOf("test") !== -1)
      return environments.test;
   if (env.indexOf("stage") !== -1)
      return environments.stage;
   if (env.indexOf("prod") !== -1)
      return environments.prod;
   return environments.local;
}

export default getEnvironmentConfig("dev");