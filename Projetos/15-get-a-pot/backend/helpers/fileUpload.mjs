import multer from 'multer'
import path from 'path'
import fs from 'fs'

function fileUpload(subdir = '', allowedExtensions = []) {
  const fullPath = path.join('public/uploads', subdir)
  fs.mkdirSync(fullPath, { recursive: true })

  const storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
      callback(null, fullPath)
    },
    filename: function (_req, file, callback) {
      const uniqueName = Date.now() + path.extname(file.originalname)
      callback(null, uniqueName)
    }
  })

  const fileFilter = function (_req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.length && !allowedExtensions.includes(ext)) {
      return callback(new Error(`Extensão não permitida: ${ext}`), false)
    }

    callback(null, true)
  }

  return multer({
    storage,
    fileFilter
  })
}

export default fileUpload
