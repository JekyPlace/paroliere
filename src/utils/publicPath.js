export default function publicPath(path) {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${baseUrl}${normalizedPath}`;
}
