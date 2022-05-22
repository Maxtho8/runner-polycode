import Docker from "dockerode";
import fs from "fs";
import { EventEmitter, Stream, PassThrough } from "stream";
import path from "path";

const __dirname = path.resolve();
const pwd =  path.resolve(".");

const docker = new Docker();


export default function runJavaCode(code: string) {
  return new Promise((resolve, reject) => {
    // create file based on timestamp
    let time = new Date().getTime();
    fs.writeFile(pwd+"/java/" + time + ".java", code, err => {
      docker
        .createContainer({
          Image: "openjdk",
          AttachStdin: true,
          AttachStdout: true,
          AttachStderr: true,
          Tty: false,
          Cmd: ["java", `/home/${time}.java`],
          HostConfig: {
            AutoRemove: true,
            Binds: [`${pwd}/java/:/home/`],
          },
          OpenStdin: false,
          StdinOnce: false,
        })
        .then(async function (container) {
          await container.start();
          container.attach({ stream: true, stdout: true, stderr: true }, async function (err, stream) {
            //dockerode may demultiplex attach streams for you :)
            let stream_stderr = new PassThrough();
            let stream_stdout = new PassThrough();

            let buffer_stderr: String = "";
            let buffer_stdout: String = "";

            container.modem.demuxStream(stream, stream_stdout, stream_stderr);
            stream_stdout.on("data", function (chunk) {
              buffer_stdout += chunk.toString();
            });

            stream_stderr.on("data", function (chunk) {
              buffer_stderr += chunk.toString();
            });

            const status = await container.wait();
            resolve({ stdout: buffer_stdout, stderr: buffer_stderr, status });
          });
        })
        .catch(function (err) {
          reject(err);
        });
    });
  });
}
