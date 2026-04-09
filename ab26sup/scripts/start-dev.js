/**
 * Auto-detect IP rồi start Expo
 * Chạy: npm run dev          → expo start
 * Chạy: npm run dev:android  → expo run:android
 */
const { spawn } = require("child_process");
const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  // Bỏ qua các card mạng ảo của VMware, VirtualBox, WSL, Docker...
  const ignorePatterns = ['vmware', 'virtual', 'vbox', 'wsl', 'vethernet', 'hyper-v'];

  for (const name in interfaces) {
    // Kiểm tra tên Adapter có chứa từ khóa ảo không
    const isVirtual = ignorePatterns.some(pattern => name.toLowerCase().includes(pattern));
    if (isVirtual) continue;

    for (const iface of interfaces[name]) {
      if (
        iface.family === "IPv4" &&
        !iface.internal &&
        !iface.address.startsWith("169.")
      ) {
        return iface.address;
      }
    }
  }
  
  // Fallback nếu không timg ra
  return "192.168.1.30";
}

const ip = getLocalIP();

// Lấy arguments truyền vào (ví dụ: "run:android", "start", ...)
const args = process.argv.slice(2);
const expoCommand = args.length > 0 ? args : ["start"];

console.log(`\n🌐 Detected IP: ${ip}`);
console.log(`📡 API sẽ kết nối tới: http://${ip}:5000/api`);
console.log(`🚀 Running: npx expo ${expoCommand.join(" ")}\n`);

const env = { ...process.env, EXPO_PUBLIC_API_HOST: ip };

const child = spawn("npx", ["expo", ...expoCommand], {
  env,
  stdio: "inherit",
  shell: true,
  cwd: process.cwd(),
});

child.on("exit", (code) => process.exit(code));
