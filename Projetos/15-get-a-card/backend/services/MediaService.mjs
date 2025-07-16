import path from 'path'
import fs from 'fs'
import Media from '../models/Media.mjs'

class MediaService {

  static async create(file, user, subdir = '', allowedMimetypes = []) {
    if (!file) {
      throw new Error('Sem arquivo');
    }

    
    const name = file.name;
    const size = file.size;
    const uploadDir = path.join('public/uploads', subdir)
    const filePath = path.join(uploadDir, Date.now() + path.extname(file.name))
    const mimetype = file.mimetype;

    if(allowedMimetypes.length > 0 && !allowedMimetypes.includes(mimetype)){
      throw new Error('Formato de arquivo não aceito')
    }

    try {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.log(err);
      throw new Error('Erro ao criar diretório de upload');
    }
    
    file.mv(filePath, function(err) {
      if (err){
        throw new Error(`Erro no upload: ${err}`)
      }
    })


    const media = new Media({
      name: name,
      uploadedBy: user._id,
      mimetype: mimetype,
      filePath: filePath,
      size: size
    })

    const newMedia = await media.save();

    return newMedia;
  }

  static async deleteById(id){
    const media = await Media.findByIdAndDelete(id);
    await fs.promises.unlink(media.filePath);

    return media;
  }

  static async delete(media) {
    if (!media || !media.filePath) {
      throw new Error('Mídia inválida ou caminho do arquivo não informado');
    }

    try {
      await fs.promises.unlink(media.filePath);
    } catch (err) {

      if (err.code !== 'ENOENT') {
        throw new Error('Erro ao excluir o arquivo físico');
      }
    }

    try {
      await Media.deleteOne({ _id: media._id });
    } catch (err) {
      throw new Error('Erro ao excluir o registro da mídia no banco de dados');
    }
  }

}

export default MediaService
