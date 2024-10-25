import { runCommand } from "./run";

const LIBWEBP_VERSION = "libwebp-1.4.0-mac-arm64";
const LIBWEBP_VERSION_TAR = `${LIBWEBP_VERSION}.tar.gz`;

const BASE_URL = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/${LIBWEBP_VERSION_TAR}`;

await runCommand(`curl ${BASE_URL} -O ${LIBWEBP_VERSION_TAR}`);
await runCommand(`tar -xzf ./${LIBWEBP_VERSION_TAR}`);
await runCommand(`rm ${LIBWEBP_VERSION_TAR}`);
await runCommand(`mv ${LIBWEBP_VERSION}/bin libwebp`);
await runCommand(`rm -rf ${LIBWEBP_VERSION}`);
