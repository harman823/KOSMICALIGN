import path from 'path';
import dotenv from 'dotenv';

let loaded = false;

export const loadEnvironment = () => {
  if (loaded) {
    return;
  }

  const envPath = path.resolve(__dirname, '..', '..', '.env');
  dotenv.config({ path: envPath, override: false });

  loaded = true;
};
