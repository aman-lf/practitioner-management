import path from 'path';
import Boom from '@hapi/boom';
import multer from 'multer';

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(Boom.badRequest('Only "jpeg|jpg|png|gif" allowed'));
  }
}

const multerMilddleware = multer({
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

export default multerMilddleware;
