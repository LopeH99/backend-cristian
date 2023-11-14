import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif']; // Add more extensions as needed

export class FileService {
  constructor(uploadPath, allowed, fieldName) {
    this.uploadPath = uploadPath || 'uploads/';
    this.allowedExtensions = allowed || ['pdf','.jpg', '.jpeg', '.png', '.gif'];
    this.fieldName = fieldName || 'files';
    this.uploadedFilePaths = [];
    this.initializeUpload();
  }

  initializeUpload() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalExtension = path.extname(file.originalname).toLowerCase();
        const isValidExtension = this.allowedExtensions.includes(originalExtension);

        if (isValidExtension) {
          cb(null, uniqueSuffix + '-' + file.originalname);
        } else {
          cb(new Error('Invalid file extension'));
        }
      },
    });

    this.upload = multer({ storage: storage });
  }

  uploadFiles(field, count) {
    return this.upload.array(field, count);
  }

  validateUpload() {
    return (req, res, next) => {
      this.uploadFiles('files', 5)(req, res, err => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Multer error: ' + err.code });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }

        // Store the uploaded file paths
        if(req.files?.length > 0){
          this.uploadedFilePaths = req.files.map(file => file.path);
        }
        next();
      });
    };
  }

  getUploadedFilePaths() {
    return this.uploadedFilePaths;
  }

  async downloadFile(res, filePath) {
    try {
      const fullPath = path.join(this.uploadPath, filePath);
      const stats = fs.statSync(fullPath);

      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stats.size,
        'Content-Disposition': 'attachment; filename=' + path.basename(fullPath),
      });

      const fileStream = fs.createReadStream(fullPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Error downloading file');
    }
  }

  deleteFile(filePath) {
    const fullPath = path.join(this.uploadPath, filePath);
    try {
      console.log("deleting ",filePath)
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
