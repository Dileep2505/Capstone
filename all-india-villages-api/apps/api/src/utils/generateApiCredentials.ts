import crypto from "crypto";

export const generateApiKey = () => {

  return (
    "ak_" +
    crypto.randomBytes(16).toString("hex")
  );
};

export const generateApiSecret = () => {

  return (
    "as_" +
    crypto.randomBytes(16).toString("hex")
  );
};