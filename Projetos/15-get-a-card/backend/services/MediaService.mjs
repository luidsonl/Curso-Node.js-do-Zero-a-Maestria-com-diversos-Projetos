import path from 'path'
import fs from 'fs'
import Media from '../models/Media.mjs'

class MediaService {
  static async create(media, user, subdir = '', allowedMimetypes = []) {
    if (!media) {
      throw new Error('Sem arquivo');
    }

    const name = media.name;
    const size = media.size;
    const extension = media.extension;
    const filePath = path.join('public/uploads', subdir, Date.now() + path.extname(media.name))
    const mimetype = media.mimetype;

    if(allowedMimetypes.length > 0 && !allowedMimetypes.includes(mimetype)){
      throw new Error('Formato de arquivo não aceito')
    }
    
    media.mv(filePath, function(err) {
      if (err){
        throw new Error('Erro no upload')
      }
    })
  }

  static async delete(media) {
    
  }
}

export default MediaService
