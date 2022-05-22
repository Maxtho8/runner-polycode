import Docker from "dockerode";
import fs from "fs";
import { EventEmitter, Stream, PassThrough } from "stream";
import path from "path";


const pwd  = "/home/maxtho/polycode/backend"
const docker = new Docker();


export default function runPythonCode(code: string) {
  return new Promise((resolve, reject) => {
    // create file based on timestamp
    let time = new Date().getTime();
    console.log(pwd);
    fs.writeFile(pwd+"/python/" + time + ".py", code, err => {
      docker
        .createContainer({
          Image: "python",
          AttachStdin: true,
          AttachStdout: true,
          AttachStderr: true,
          Tty: false,
          Cmd: ["python", `/home/${time}.py`],
          HostConfig: {
            AutoRemove: false,
            Binds: [`${pwd}/python/:/home/`],
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
