/* eslint-disable curly */
/* eslint-disable quotes */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const run = cmd => {
  console.log('👉 Run:', cmd);
  execSync(cmd, { stdio: 'inherit' });
};

const findFile = (dir, filename) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = findFile(fullPath, filename);
      if (result) return result;
    } else if (entry.isFile() && entry.name === filename) {
      return fullPath;
    }
  }
  return null;
};

const applyAssets = (appKey, config, platform) => {
  //  Set app icon
  const iconPath = path.join(__dirname, `../bu/${appKey}/icon.png`);
  const resourcesDir = path.join(__dirname, '../resources');
  const targetIcon = path.join(resourcesDir, 'icon.png');

  if (fs.existsSync(iconPath)) {
    // đảm bảo có thư mục resources
    if (!fs.existsSync(resourcesDir)) {
      fs.mkdirSync(resourcesDir);
    }

    // copy icon sang resources/icon.png
    fs.copyFileSync(iconPath, targetIcon);
    console.log(`✅ Copied ${iconPath} → ${targetIcon}`);

    if (platform === 'android') {
      run(
        `npx cordova-res android --skip-config --copy --icon ${targetIcon} --type icon`,
      );
    } else if (platform === 'ios') {
      // Sửa đường dẫn để khớp với tên thư mục thực tế
      const iosIconset = path.join(
        __dirname,
        '../ios/staffwise/Images.xcassets/Application.appiconset',
      );
      const generatedDir = path.join(__dirname, '../ios/AppIcon.appiconset');

      // Generate iOS icons
      run(`npx app-icon generate -i ${targetIcon}`);
      console.log('✅ iOS icons generated');

      // Kiểm tra thư mục generate
      if (fs.existsSync(generatedDir)) {
        console.log(`📁 Đã tìm thấy thư mục generated: ${generatedDir}`);

        // Xóa toàn bộ thư mục cũ và tạo lại (thay vì chỉ xóa nội dung)
        if (fs.existsSync(iosIconset)) {
          console.log(`🗑️ Đang xóa thư mục cũ: ${iosIconset}`);
          fs.rmSync(iosIconset, { recursive: true, force: true });
        }

        // Tạo lại thư mục
        fs.mkdirSync(iosIconset, { recursive: true });

        // Copy nội dung từ generatedDir vào iosIconset
        console.log(`📂 Đang copy từ ${generatedDir} đến ${iosIconset}`);

        // Đọc tất cả file trong generatedDir
        const files = fs.readdirSync(generatedDir);
        console.log(`📄 Files trong generated dir: ${files.join(', ')}`);

        files.forEach(file => {
          const sourcePath = path.join(generatedDir, file);
          const destPath = path.join(iosIconset, file);

          if (fs.lstatSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, destPath, { recursive: true });
          } else {
            fs.copyFileSync(sourcePath, destPath);
          }
        });

        // Xóa thư mục generated sau khi copy
        fs.rmSync(generatedDir, { recursive: true, force: true });

        console.log(`✅ Đã thay thế toàn bộ iOS AppIcon → ${iosIconset}`);

        // Kiểm tra kết quả
        const finalFiles = fs.readdirSync(iosIconset);
        console.log(`📄 Files cuối cùng: ${finalFiles.join(', ')}`);
      } else {
        console.log('⚠️ Không tìm thấy AppIcon.appiconset sau khi generate');

        // Kiểm tra xem thư mục có tên khác không
        const parentDir = path.dirname(generatedDir);
        const allDirs = fs.readdirSync(parentDir);
        console.log(`📁 Các thư mục trong ${parentDir}: ${allDirs.join(', ')}`);
      }
    } else {
      console.log(`⚠️ Platform ${platform} không hỗ trợ set-icon`);
    }
  }
};

const main = () => {
  const appKey = process.argv[2];
  if (!appKey) {
    console.error(
      '❌ Missing app key. Example: node scripts/build-app.js mic-app',
    );
    process.exit(1);
  }

  const appDir = path.resolve(__dirname, `../bu/${appKey}`);
  const configPath = path.join(appDir, 'config.json');

  if (!fs.existsSync(configPath)) {
    console.error('❌ Config not found:', configPath);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log(`🚀 Applying config for ${config.name} (${appKey}) ...`);

  // chạy cho cả android & ios
  ['android', 'ios'].forEach(platform => {
    applyAssets(appKey, config, platform);
  });

  console.log('✅ Done! Assets and names updated for Android & iOS');
};

main();
