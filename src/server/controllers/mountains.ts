import type { Request, Response } from 'express';
//import type { MountainList, Mount } from './types'
import fs from 'fs/promises';

const dataPath = './data/mountains.json';

export const getMountains = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf-8',
    });

    res.status(200).send(JSON.parse(data));
  } catch (error) {
    res.status(500).send('Errororo coy');
  }
};

export default {
  getMountains,
};
