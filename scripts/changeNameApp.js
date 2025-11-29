/* eslint-disable quotes */
const fs = require('fs');
const path = require('path');

const updateAppName = (appName, displayName) => {
  // Android: app/src/main/res/values/strings.xml
  const androidStrings = path.resolve(
    __dirname,
    '../android/app/src/main/res/values/strings.xml',
  );
  let xml = fs.readFileSync(androidStrings, 'utf8');
  xml = xml.replace(
    /<string name="app_name">.*<\/string>/,
    `<string name="app_name">${displayName}</string>`,
  );
  fs.writeFileSync(androidStrings, xml, 'utf8');

  // iOS: Info.plist
  const iosPlist = path.resolve(__dirname, `../ios/staffwise/Info.plist`);

  if (fs.existsSync(iosPlist)) {
    let plist = fs.readFileSync(iosPlist, 'utf8');

    const displayNamePattern =
      /(<key>CFBundleDisplayName<\/key>\s*<string>)(.*?)(<\/string>)/;
    const developmentRegionPattern =
      /(<key>CFBundleDevelopmentRegion<\/key>\s*<string>[^<]*<\/string>)/;

    if (displayNamePattern.test(plist)) {
      plist = plist.replace(displayNamePattern, `$1${displayName}$3`);
    } else if (developmentRegionPattern.test(plist)) {
      plist = plist.replace(
        developmentRegionPattern,
        `$1\n\t<key>CFBundleDisplayName</key>\n\t<string>${displayName}</string>`,
      );
    } else {
      plist = plist.replace(
        /<dict>/,
        `<dict>\n\t<key>CFBundleDisplayName</key>\n\t<string>${displayName}</string>`,
      );
    }

    fs.writeFileSync(iosPlist, plist, 'utf8');
  }
};

const applyAssets = (appKey, config, platform) => {
  // 1. Update app name
  updateAppName(appKey, config.name);
};

const main = () => {
  const appKey = process.argv[2];
  if (!appKey) {
    console.error(
      '❌ Missing app key. Example: node scripts/changeNameApp.js staff',
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
