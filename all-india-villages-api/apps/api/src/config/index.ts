// Configuration entrypoints (env parsing, feature flags)
export const loadConfig = () => ({
  env: process.env.NODE_ENV ?? "development"
});

export default loadConfig;