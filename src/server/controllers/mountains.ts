import type { Request, Response } from 'express';
import type { Mount } from './types';
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

export const getMountain = async (req: Request, res: Response) => {
  try {
    let mountain: Mount | undefined;
    const mountainName = req.params.name.toLowerCase();
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0) {
      const allMountains: Mount[] = JSON.parse(data);
      mountain = allMountains.find(
        (mountain) => mountain.name.toLowerCase() === mountainName,
      );
    }

    if (mountain) {
      res.status(200).send(mountain);
    } else {
      const msg = {
        message: 'Mountains not found',
      };
      res.status(404).send(JSON.stringify(msg));
    }
  } catch (error) {
    res
      .status(500)
      .send(
        'An error occurred when fetching mountain with name ' + req.params.name,
      );
  }
};

export default {
  getMountains,
  getMountain,
};
