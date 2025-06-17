import FileService from "../services/FileService.mjs"

function profilePictureUpload() {
  return FileService.upload('profile-pictures', ['.jpg', '.jpeg', '.png', '.webp'])
}

export default profilePictureUpload