import { readdir } from "node:fs/promises";
import { mkdir } from "bun:fs/promises";
import { runCommand } from "./run";

const directoryPath = process.argv.slice(2).join(" ");

if (!directoryPath) {
  throw new Error("Specify directory containing images");
}

const QUALITY = 75; // Out of 100

const convert = async (imagePathWithExtension: string, outDir = "") => {
  const imageNameWithExtension = imagePathWithExtension.split("/").pop() ?? "";
  const imageName = imageNameWithExtension.split(".")[0];
  await runCommand(
    `./libwebp/cwebp -q ${QUALITY} ${imagePathWithExtension} -o ${outDir}${imageName}.webp`
  );
};

await mkdir(`${directoryPath}/webp-${QUALITY}`);

// read all the files in the current directory
const files = await readdir(directoryPath);

for (const file of files) {
  if (!file.startsWith(".") && file.includes(".")) {
    await convert(
      `${directoryPath}/${file}`,
      `${directoryPath}/webp-${QUALITY}/`
    );
  }
}
