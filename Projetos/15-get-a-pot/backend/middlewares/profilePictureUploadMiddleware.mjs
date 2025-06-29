import profilePictureUpload from '../helpers/profilePictureUpload.mjs';

function profilePictureUploadMiddleware (req, res, next) {
  profilePictureUpload().single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        error: 'Erro no upload',
        details: err.message,
        expectedField: 'image'
      });
    }
    next();
  });
};


export default profilePictureUploadMiddleware;