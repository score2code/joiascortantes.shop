// optimize.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const inDir = "../images/";   // pasta onde estão 001..041
const outDir = "../output"; // pasta de saída

// garante saída
fs.mkdirSync(outDir, { recursive: true });

const folders = Array.from({ length: 41 }, (_, i) =>
  String(i + 1).padStart(3, "0")
);

for (const folder of folders) {
  const srcFolder = path.join(inDir, folder);
  const dstFolder = path.join(outDir, folder);

  if (!fs.existsSync(srcFolder)) {
    console.log(`⚠️ pasta ${srcFolder} não existe, pulando`);
    continue;
  }
  fs.mkdirSync(dstFolder, { recursive: true });

  const files = fs
    .readdirSync(srcFolder)
    .filter(f => /\.(jpe?g|png|webp|heic)$/i.test(f));

  if (files.length < 4) {
    console.log(`⚠️ menos de 4 imagens em ${srcFolder}`);
  }

  for (const file of files) {
    const src = path.join(srcFolder, file);
    const base = path.parse(file).name;
    const dst = path.join(dstFolder, `${base}.webp`);

    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dst);

    console.log(`✓ ${src} → ${dst}`);
  }
}
