import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'uploads/others';

    if (file.fieldname === 'profileImage') {
      if (req.baseUrl.includes('/user')) {
        folder = 'uploads/userImage';
      } else if (req.baseUrl.includes('/business')) {
        folder = 'uploads/profile';
      }
    } else if (file.fieldname === 'coverImage') {
      folder = 'uploads/coverImage';
    } else if (file.fieldname === 'certificateImages') { // ✅ fix field name
      folder = 'uploads/certificates';
    } else if (file.fieldname === 'galleryImages') {
      folder = 'uploads/gallery';
    }

    ensureDir(folder);
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + file.fieldname + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
