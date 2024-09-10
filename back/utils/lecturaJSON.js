import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); //Tiene la direccion del archivo actual

export const readJSON = (path) => require(path)