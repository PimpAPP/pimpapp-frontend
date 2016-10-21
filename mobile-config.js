App.info({
  id: 'com.usereco',
  name: 'Reco',
  description: 'Reciclagem colaborativa e compartilhada, que conecta os catadores a você!',
  version: "0.0.2",
  author: 'Pimp My Carroça',
  website: 'https://usereco.com'
})

// Icons and launch screens for mobile app
App.icons({
  'android_mdpi':     'private/images/icons/android/mipmap-mdpi/ic_launcher.png', // (48x48)
  'android_hdpi':     'private/images/icons/android/mipmap-hdpi/ic_launcher.png', // (72x72)
  'android_xhdpi':    'private/images/icons/android/mipmap-xhdpi/ic_launcher.png', // (96x96)
  'android_xxhdpi':   'private/images/icons/android/mipmap-xxhdpi/ic_launcher.png', // (144x144)
  'android_xxxhdpi':  'private/images/icons/android/mipmap-xxxhdpi/ic_launcher.png' // (192x192)
})

App.launchScreens({
  "android_mdpi_portrait":    "private/images/launchers/android/android_mdpi_portrait.png", // 320x480
  "android_mdpi_landscape":   "private/images/launchers/android/android_mdpi_landscape.png", // 480x320
  "android_hdpi_portrait":    "private/images/launchers/android/android_hdpi_portrait.png", // 480x800
  "android_hdpi_landscape":   "private/images/launchers/android/android_hdpi_landscape.png", // 800x480
  "android_xhdpi_portrait":   "private/images/launchers/android/android_xhdpi_portrait.png", // 720x1280
  "android_xhdpi_landscape":  "private/images/launchers/android/android_xhdpi_landscape.png", // 1280x720
  "android_xxhdpi_portrait":  "private/images/launchers/android/android_xxhdpi_portrait.png", // 1080x1440
  "android_xxhdpi_landscape": "private/images/launchers/android/android_xxhdpi_landscape.png" // 1440x1080
})

// PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0x009900');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.accessRule("*");
