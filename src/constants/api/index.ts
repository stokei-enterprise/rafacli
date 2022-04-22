import { resolve } from 'path';

export const API_BASE_URL = 'https://api.rbernardes.com.br';
export const AUTHORIZATION_HEADER_NAME = 'authorization';

export const CURRENT_USER_DATA_JSON_PATH = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'current-user.json'
);

export const SENDGRID_DATA_JSON_PATH = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'sendgrid.json'
);
