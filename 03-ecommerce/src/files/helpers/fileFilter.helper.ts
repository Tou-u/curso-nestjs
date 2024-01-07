import { UnsupportedMediaTypeException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (req, file) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new UnsupportedMediaTypeException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
