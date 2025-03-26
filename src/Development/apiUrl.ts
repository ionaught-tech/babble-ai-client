const serviceList = {
  production: {
    api: "api.babble-ai.com",
    dashBoard: "babble-ai.com",
    ssl: true,
  },
  staging: {
    api: "api-uat.babble-ai.com",
    dashBoard: "uat.babble-ai.com",
    ssl: true,
  },
  development: {
    api: "localhost:8000",
    dashBoard: "localhost:3000",
    ssl: false,
  },
};
const env = import.meta.env.VITE_ENVIRONMENT as keyof typeof serviceList;

const getConfig = () => {
  const currentEnv = serviceList[env] || serviceList.production;
  const getUrl = (ssl: boolean, url: string) =>
    `http${ssl ? "s" : ""}://${url}`;
  const getSocketUrl = (ssl: boolean, url: string) =>
    `ws${ssl ? "s" : ""}://${url}`;
  return {
    apiUrl: `${getUrl(currentEnv.ssl, currentEnv.api)}/api/v1`,
    socketUrl: `${getSocketUrl(currentEnv.ssl, currentEnv.api)}`,
    dashboardUrl: getUrl(currentEnv.ssl, currentEnv.dashBoard),
  };
};

const config = getConfig();
export const socketUrl = config.socketUrl;
export const dashboardUrl = config.dashboardUrl;
export const assetsUrl = "https://assets.babble-ai.com";
export default config.apiUrl;
