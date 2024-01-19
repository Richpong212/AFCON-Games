import dotenv from "dotenv";

dotenv.config();

export const devapp = {
  dev: {
    port: process.env.SERVERPORT,
    db: {
      uri: process.env.DB_URI,
    },
  },
};
