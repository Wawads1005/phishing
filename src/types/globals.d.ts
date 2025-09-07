import childProcess from "node:child_process";

declare global {
  var ngrokProcess: childProcess.ChildProcessWithoutNullStreams | undefined;
}
