const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const startPort = parseInt(process.env.PORT, 10) || 3000;
const maxPort = startPort + 50;
const scriptPath = path.resolve(__dirname, '..');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function findFreePort() {
  for (let port = startPort; port <= maxPort; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    if (await checkPort(port)) {
      return port;
    }
  }
  throw new Error(`No free port found between ${startPort} and ${maxPort}`);
}

async function run() {
  try {
    const port = await findFreePort();
    process.env.PORT = port;
    console.log(`Starting app on port ${port}...`);

    const child = spawn('npx', ['react-scripts', 'start'], {
      stdio: 'inherit',
      cwd: scriptPath,
      shell: true,
      env: { ...process.env, PORT: String(port) },
    });

    child.on('exit', (code) => {
      process.exit(code);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run();
