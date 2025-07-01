import multer from 'multer'
import path from 'path'
import fs from 'fs'

class FileService {
  static upload(subdir = '', allowedExtensions = []) {
    const fullPath = path.join('public/uploads', subdir)
    fs.mkdirSync(fullPath, { recursive: true })

    const storage = multer.diskStorage({
      destination: (_req, _file, callback) => {
        callback(null, fullPath)
      },
      filename: (_req, file, callback) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        callback(null, uniqueName)
      }
    })

    const fileFilter = (_req, file, callback) => {
      const ext = path.extname(file.originalname).toLowerCase()
      if (allowedExtensions.length && !allowedExtensions.includes(ext)) {
        return callback(new Error(`Extensão não permitida: ${ext}`), false)
      }
      callback(null, true)
    }

    return multer({ storage, fileFilter })
  }

  static removeFile(subdir = '', filename = '') {
    const filePath = path.join('public/uploads', subdir, filename)

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        return true
      }
    } catch (err) {
      console.error('Erro ao remover arquivo:', err)
    }

    return false
  }
}

export default FileService
