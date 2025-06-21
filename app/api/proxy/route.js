// pages/api/proxy.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'No image URL provided' });

  const response = await fetch(url);
  const contentType = response.headers.get("content-type");
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.send(Buffer.from(buffer));
}
