export const getEnvString = (key: string) => {
  return import.meta.env[key] ?? "";
};

export const getEnvNumber = (key: string) => {
  return Number(import.meta.env[key]);
};