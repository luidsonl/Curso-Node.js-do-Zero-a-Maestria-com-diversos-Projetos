import path from 'path'
import fs from 'fs'
import Media from '../models/Media.mjs'

class MediaService {

  /**
  * Cria um upload de arquivo
  * @param {Object} file - Objeto do arquivo a ser enviado
  * @param {string} file.name - Nome do arquivo
  * @param {number} file.size - Tamanho do arquivo em bytes
  * @param {string} file.mimetype - Tipo MIME do arquivo
  * @param {Function} file.mv - Função para mover o arquivo
  * @param {Object} user - Objeto do usuário
  * @param {string} [subdir=''] - Subdiretório para salvar o arquivo (opcional)
  * @param {string[]} [allowedMimetypes=[]] - Array de tipos MIME permitidos (opcional)
  * @returns {Promise<void>}
  * @throws {Error} Quando não há arquivo, formato não aceito ou erro no upload
  */
  static async create(file, user, subdir = '', allowedMimetypes = []) {
    if (!file) {
      throw new Error('Sem arquivo');
    }

    
    const name = file.name;
    const size = file.size;
    const filePath = path.join('public/uploads', subdir, Date.now() + path.extname(file.name))
    const mimetype = file.mimetype;

    if(allowedMimetypes.length > 0 && !allowedMimetypes.includes(mimetype)){
      throw new Error('Formato de arquivo não aceito')
    }
    
    file.mv(filePath, function(err) {
      if (err){
        throw new Error('Erro no upload')
      }
    })


    const media = new Media({
      name: name,
      uploadedBy: user,
      mimetype: mimetype,
      filePath: filePath,
      size: size
    })

    const newMedia = media.save();

    return newMedia;
  }

  static async delete(media) {
    
  }
}

export default MediaService
