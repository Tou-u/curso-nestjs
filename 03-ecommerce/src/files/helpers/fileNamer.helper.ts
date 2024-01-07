import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (req, file) => void,
) => {
  const fileExtName = extname(file.originalname);
  const fileName = `${uuid()}${fileExtName}`;

  callback(null, fileName);
};
