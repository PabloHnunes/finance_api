import { readFileSync } from 'fs';
import * as path from 'path';

export const getPrivateKey = () => {
  return readFileSync(
    path.resolve(__dirname, process.env.PRIVATE_KEY_PATH),
    'utf8',
  )
    .trim()
    .replaceAll('\n', '');
};

export const getPrivateRefreshKey = () => {
  return readFileSync(
    path.resolve(__dirname, process.env.PRIVATE_REFRESH_KEY_PATH),
    'utf8',
  )
    .trim()
    .replaceAll('\n', '');
};
