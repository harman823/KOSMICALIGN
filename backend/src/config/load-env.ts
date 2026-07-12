import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

let loaded = false;

const getCandidateEnvPaths = () => {
  const cwd = process.cwd();
  const backendRoot = path.resolve(__dirname, '..', '..');
  const projectRoot = path.resolve(backendRoot, '..');

  return [
    path.resolve(cwd, '.env.local'),
    path.resolve(cwd, '.env'),
    path.resolve(projectRoot, '.env.local'),
    path.resolve(projectRoot, '.env'),
    path.resolve(backendRoot, '.env.local'),
    path.resolve(backendRoot, '.env'),
  ];
};

export const loadEnvironment = () => {
  if (loaded) {
    return;
  }

  for (const envPath of getCandidateEnvPaths()) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: false });
    }
  }

  loaded = true;
};
