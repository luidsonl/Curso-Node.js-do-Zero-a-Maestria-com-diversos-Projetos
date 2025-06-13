import fileUpload from "./fileUpload.mjs"

function profilePictureUpload() {
  return fileUpload('profile-pictures', ['.jpg', '.jpeg', '.png'])
}

export default profilePictureUpload