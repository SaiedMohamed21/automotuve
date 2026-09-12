import { spawn, execSync, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_DIR = path.resolve(__dirname, '..');

const BACKEND_PORT = 5000;
const FRONTEND_PORT = 8443;
const BACKEND_URL = `http://127.0.0.1:${BACKEND_PORT}`;
const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;

let backendProcess = null;
let frontendProcess = null;
let isShuttingDown = false;

// ── 1. Helper Utilities ──

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizePath(p) {
  return (p || '').toLowerCase().replace(/\\/g, '/');
}

// ── 2. Port & Process Detection ──

function getListeningPids(port) {
  try {
    const stdout = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
    const lines = stdout.split(/\r?\n/);
    const pids = new Set();

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5 && parts[0].toUpperCase() === 'TCP') {
        const localAddress = parts[1];
        const state = parts[3].toUpperCase();
        const pid = parseInt(parts[4], 10);

        if (state === 'LISTENING' && localAddress.endsWith(`:${port}`) && !isNaN(pid) && pid > 0) {
          pids.add(pid);
        }
      }
    }
    return Array.from(pids);
  } catch {
    return [];
  }
}

function getProcessNameFast(pid) {
  try {
    const stdout = execSync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`, { encoding: 'utf8' });
    const match = stdout.match(/"([^"]+)"/);
    if (match) return match[1];
  } catch {}
  return '';
}

function getProcessInfo(pid) {
  try {
    const output = execFileSync('powershell.exe', [
      '-NoProfile',
      '-Command',
      `Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}" | Select-Object ProcessId, Name, ExecutablePath, CommandLine, ParentProcessId | ConvertTo-Json -Compress`
    ], { encoding: 'utf8', timeout: 5000 }).trim();

    if (!output) return null;
    return JSON.parse(output);
  } catch {
    return null;
  }
}

function isProjectProcess(procInfo) {
  if (!procInfo) return false;
  const targetDir = normalizePath(PROJECT_DIR);
  const cmd = normalizePath(procInfo.CommandLine);
  const exe = normalizePath(procInfo.ExecutablePath);
  const name = (procInfo.Name || '').toLowerCase();

  // 1. Direct path check against project folder
  if (cmd.includes(targetDir) || exe.includes(targetDir)) {
    return true;
  }

  // 2. Project executable name or assembly
  if (cmd.includes('engineer job order') || exe.includes('engineer job order') || name.includes('engineer job order')) {
    return true;
  }

  // 3. Parent process check (e.g. npm or node spawned from project directory)
  if (procInfo.ParentProcessId && procInfo.ParentProcessId !== procInfo.ProcessId) {
    const parentInfo = getProcessInfo(procInfo.ParentProcessId);
    if (parentInfo) {
      const parentCmd = normalizePath(parentInfo.CommandLine);
      const parentExe = normalizePath(parentInfo.ExecutablePath);
      if (parentCmd.includes(targetDir) || parentCmd.includes('engineer job order') || parentExe.includes(targetDir)) {
        return true;
      }
    }
  }

  return false;
}

function checkHttpSignature(port) {
  return new Promise((resolve) => {
    const url = port === BACKEND_PORT
      ? `http://127.0.0.1:${port}/swagger/v1/swagger.json`
      : `http://localhost:${port}/`;

    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
        if (data.length > 50000) req.destroy();
      });
      res.on('end', () => {
        if (port === BACKEND_PORT) {
          resolve(data.includes('Star Auto Center') || data.includes('api/job-orders'));
        } else {
          resolve(data.includes('SOS Motor Works') || data.includes('src/main.tsx') || data.includes('/@vite/client'));
        }
      });
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function terminateProcessTree(pid) {
  if (!pid) return false;
  try {
    execFileSync('taskkill.exe', ['/F', '/T', '/PID', String(pid)], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function preparePort(port, serviceName) {
  const pids = getListeningPids(port);
  if (pids.length === 0) return;

  for (const pid of pids) {
    const procName = getProcessNameFast(pid);

    // 1. If process is already gone or dying, ensure tree is killed and continue
    if (!procName) {
      terminateProcessTree(pid);
      continue;
    }

    // 2. HTTP signature check (active server responding as Star Auto Center or Vite)
    const hasSignature = await checkHttpSignature(port);
    if (hasSignature) {
      console.log(`[Startup] Detected running ${serviceName} on port ${port}. Terminating cleanly...`);
      terminateProcessTree(pid);
      continue;
    }

    // 3. Process metadata inspection
    const info = getProcessInfo(pid);
    if (info && isProjectProcess(info)) {
      console.log(`[Startup] Detected previous ${serviceName} process (PID ${pid}) on port ${port}. Terminating cleanly...`);
      terminateProcessTree(pid);
      continue;
    }

    // 4. Known project dev runtime signatures on the specific ports
    const isProjectRuntime =
      (port === FRONTEND_PORT && procName.toLowerCase().includes('node')) ||
      (port === BACKEND_PORT && (procName.toLowerCase().includes('dotnet') || procName.toLowerCase().includes('engineer')));

    if (isProjectRuntime) {
      console.log(`[Startup] Detected previous ${serviceName} process (${procName}, PID ${pid}) on port ${port}. Terminating cleanly...`);
      terminateProcessTree(pid);
      continue;
    }

    // 5. Truly unrelated external application — protect it from being killed
    console.error(`\n=============================================================`);
    console.error(`[ERROR] Port ${port} is occupied by an UNRELATED external process!`);
    console.error(`  Process ID : ${pid}`);
    console.error(`  Name       : ${procName}`);
    console.error(`  Path       : ${info?.ExecutablePath || 'Unknown'}`);
    console.error(`  Command    : ${info?.CommandLine || 'Unknown'}`);
    console.error(`To protect external applications, this process will NOT be killed.`);
    console.error(`Please stop that application or free port ${port} before running.`);
    console.error(`=============================================================\n`);
    process.exit(1);
  }

  // Wait for OS to release socket
  let retries = 15;
  while (retries-- > 0) {
    if (getListeningPids(port).length === 0) break;
    await sleep(300);
  }
}

// ── 3. HTTP Health Checks ──

function checkHttp(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForHttp(url, name, timeoutMs = 35000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ready = await checkHttp(url);
    if (ready) return true;
    await sleep(400);
  }
  throw new Error(`Timeout waiting for ${name} at ${url} (${timeoutMs}ms)`);
}

function openBrowser(url) {
  try {
    execSync(`start "" "${url}"`, { shell: 'cmd.exe', stdio: 'ignore' });
  } catch {
    // Ignore browser launch errors
  }
}

// ── 4. Graceful Shutdown Handler ──

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('\n[Shutdown] Stopping Star Auto Center full system...');

  if (backendProcess?.pid) {
    terminateProcessTree(backendProcess.pid);
  }
  if (frontendProcess?.pid) {
    terminateProcessTree(frontendProcess.pid);
  }

  // Sweep any residual project processes on ports 5000 and 8443
  for (const port of [BACKEND_PORT, FRONTEND_PORT]) {
    const pids = getListeningPids(port);
    for (const pid of pids) {
      const procName = getProcessNameFast(pid);
      if (
        (port === FRONTEND_PORT && procName.toLowerCase().includes('node')) ||
        (port === BACKEND_PORT && (procName.toLowerCase().includes('dotnet') || procName.toLowerCase().includes('engineer')))
      ) {
        terminateProcessTree(pid);
      }
    }
  }

  console.log('[Shutdown] All services stopped cleanly. Goodbye!\n');
  process.exit(0);
}

if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);

// ── 5. Main Startup Orchestration ──

async function main() {
  console.log('\n=====================================');
  console.log('STAR AUTO CENTER - STARTING SYSTEM');
  console.log('=====================================\n');

  // Step 1: Check and clean ports safely
  console.log('[1/4] Checking ports 5000 and 8443...');
  await preparePort(BACKEND_PORT, 'Backend');
  await preparePort(FRONTEND_PORT, 'Frontend');

  // Step 2: Build & Start ASP.NET Core Backend
  console.log('[2/4] Starting ASP.NET Core backend (.NET 8) on port 5000...');
  const dllPath = path.join(PROJECT_DIR, 'bin', 'Debug', 'net8.0', 'Engineer Job Order.dll');
  if (!fs.existsSync(dllPath)) {
    execFileSync('dotnet', ['build', '--no-restore'], { cwd: PROJECT_DIR, stdio: 'ignore' });
  }

  backendProcess = spawn('dotnet', [dllPath, '--urls', 'http://localhost:5000'], {
    cwd: PROJECT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      ASPNETCORE_ENVIRONMENT: 'Development',
    },
  });

  backendProcess.stdout.on('data', () => {});
  backendProcess.stderr.on('data', (chunk) => {
    const text = chunk.toString();
    if (!text.includes('Microsoft.EntityFrameworkCore.Model.Validation')) {
      if (text.includes('fail:') || text.includes('crit:') || text.includes('Exception:')) {
        console.error(`[Backend] ${text.trim()}`);
      }
    }
  });

  backendProcess.on('exit', (code, signal) => {
    if (!isShuttingDown && code !== null && code !== 0) {
      console.error(`\n[Backend] Process exited unexpectedly with code ${code}`);
      shutdown();
    }
  });

  // Wait for backend to be fully online and responsive
  try {
    await waitForHttp(`${BACKEND_URL}/api/job-orders/next-number`, 'Backend API', 35000);
    console.log('      Backend is READY at ' + BACKEND_URL);
  } catch (err) {
    console.error(`\n[ERROR] Backend failed to start: ${err.message}`);
    shutdown();
    return;
  }

  // Step 3: Start Vite Frontend
  console.log('[3/4] Starting Vite frontend (React 19) on port 8443...');
  frontendProcess = spawn('npm run dev -- --port 8443 --strictPort', {
    cwd: PROJECT_DIR,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      PORT: String(FRONTEND_PORT),
    },
  });

  frontendProcess.stdout.on('data', () => {});
  frontendProcess.stderr.on('data', (chunk) => {
    const text = chunk.toString();
    if (text.includes('error') || text.includes('Error')) {
      console.error(`[Frontend] ${text.trim()}`);
    }
  });

  frontendProcess.on('exit', (code) => {
    if (!isShuttingDown && code !== null && code !== 0) {
      console.error(`\n[Frontend] Process exited unexpectedly with code ${code}`);
      shutdown();
    }
  });

  // Wait for frontend to be fully online and responsive
  try {
    await waitForHttp(FRONTEND_URL, 'Frontend', 35000);
    console.log('      Frontend is READY at ' + FRONTEND_URL);
  } catch (err) {
    console.error(`\n[ERROR] Frontend failed to start: ${err.message}`);
    shutdown();
    return;
  }

  // Step 4: Display Exact Required Status Banner
  console.log('\n=====================================');
  console.log('STAR AUTO CENTER - FULL SYSTEM');
  console.log('=====================================\n');
  console.log('Backend:');
  console.log(BACKEND_URL + '\n');
  console.log('Frontend:');
  console.log(FRONTEND_URL + '\n');
  console.log('Database:');
  console.log('Connected through backend\n');
  console.log('Status:');
  console.log('Backend READY');
  console.log('Frontend READY\n');
  console.log('Press Ctrl+C to stop all servers gracefully.\n');

  // Step 5: Automatically open default browser after frontend is ready
  console.log('[4/4] Opening frontend in default browser...');
  openBrowser(FRONTEND_URL);

  // Keep event loop alive
  setInterval(() => {}, 60000);
}

main().catch((err) => {
  console.error('[Fatal Error]', err);
  shutdown();
});
