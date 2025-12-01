// Create file name from URL in DB
function getFileFromUrl(downloadURL) {
  // Slice off the base URL from downloadURL
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);
  let fileGlob = downloadURL.replace(baseURL, "");

  // Remove everything after the query string
  const indexOfEndPath = fileGlob.indexOf("?");
  fileGlob = fileGlob.substring(0, indexOfEndPath);

  // Return existing uploaded file glob
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
}

function getFileIdFromUrl(secureUrl){
  // Find the position of '/upload/' in the URL
  const uploadIndex = secureUrl.indexOf('/upload/');

  // Get everything after '/upload/' and split by '/' to get uuid + public_id (latter we want!)
  const afterUpload = secureUrl.substring(uploadIndex + 8); // 8 = length of '/upload/'
  const parts = afterUpload.split('/');

  // Join all parts after the version (index 1) to reconstruct the full public_id
  const publicIdWithExtension = parts.slice(1).join('/');
  console.log(`publicId with extension: ${publicIdWithExtension}`);

  // Remove file extension by finding the last dot
  const lastDotIndex = publicIdWithExtension.lastIndexOf('.');
  const publicId = publicIdWithExtension.substring(0, lastDotIndex)

  console.log(`publicId is: ${publicId}`);
  return publicId;
}


export {
  getFileFromUrl,
  getFileIdFromUrl
}
