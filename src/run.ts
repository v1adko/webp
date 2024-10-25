import { spawn } from "bun";

const shellEscape = (arg: string): string => {
  if (/[^A-Za-z0-9_\/:=-]/.test(arg))
    return arg.replace(/([$!'"();`*?{}[\]<>&%#~@\\ ])/g, "\\$1");
  return arg;
};

export async function runCommand(command: string, { log = false } = {}) {
  try {
    console.info(command);

    const { exitCode, stdin, stderr, stdout } = await spawn(
      command.split(" "),
      {}
    );

    const output = await new Response(stdout).text();
    const errorOutput = stderr && (await new Response(stderr).text());

    if (log) {
      console.log("Ran", { stdin, output, errorOutput, exitCode });
    }
  } catch (error) {
    console.error(error);
  }
}
