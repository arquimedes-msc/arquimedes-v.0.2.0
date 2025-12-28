const cookieSecret = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === "production";

// 🛡️ CRITICAL SECURITY CHECK
// The JWT_SECRET is used to sign authentication tokens.
// A weak or missing secret would allow anyone to forge valid tokens.
// This check ensures the server fails to start if the secret is insecure in production.
if (isProduction && (!cookieSecret || cookieSecret.length < 32)) {
  throw new Error(
    "FATAL: JWT_SECRET is not defined or is less than 32 characters long. " +
    "Please set a strong, unique secret in your environment variables for production.",
  );
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: cookieSecret ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction,
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
