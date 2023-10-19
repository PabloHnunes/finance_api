import { readFileSync } from 'fs';
import * as path from 'path';

const getPrivateKey = () => {
  return readFileSync(
    path.resolve(__dirname, process.env.PRIVATE_KEY_PATH),
    'utf8',
  )
    .trim()
    .replaceAll('\n', '');
};

export default getPrivateKey;
