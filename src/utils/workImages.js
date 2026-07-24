const imageModules = import.meta.glob(
  '../assets/works/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF,avif,AVIF}',
  {
    eager: true,
    import: 'default',
  },
);

export function getWorkImages(workId) {
  const folderPrefix = `../assets/works/${workId}/`;

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(folderPrefix))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
    .map(([, imageUrl]) => imageUrl);
}

export function getWorkCover(workId) {
  return getWorkImages(workId)[0];
}
