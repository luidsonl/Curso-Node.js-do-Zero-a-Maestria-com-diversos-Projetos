const BASE_URL = process.env.REACT_APP_BASE_API_URL;


class MediaService{
    static getUrl(filePath) {
    if (!filePath) return null;

    let cleanPath = filePath.replace(/\\/g, "/");

    cleanPath = cleanPath.replace(/^public\//, "");

    return new URL(cleanPath, BASE_URL).toString();
  }
}


export default MediaService;