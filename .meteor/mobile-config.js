// mobile-config.js

// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.example.matt.uber',
  name: 'Reco',
  description: 'Encontre carroceiros perto de você',
  author: 'Pimp My Carroça',
  email: 'pimpmycarroca@gmail.com',
  website: 'http://usereco.com'
});

// Set up resources such as icons and launch screens.
App.launchScreens({
  'android_mdpi': 'public/img/splashes/drawable-mdpi/background.9.png',
  'android_hdpi': 'public/img/splashes/drawable-hdpi/background.9.png',
  'android_xhdpi': 'public/img/splashes/drawable-xhdpi/background.9.png',
  'android_xxhdpi': 'public/img/splashes/drawable-xxhdpi/background.9.png',
  'android_xxxhdpi': 'public/img/splashes/drawable-xxxhdpi/background.9.png'
});

App.icons({
	'android_mdpi': 'public/img/icons/mipmap-mdpi/ic_launcher.png',
	'android_hdpi': 'public/img/icons/mipmap-hdpi/ic_launcher.png',
	'android_xhdpi': 'public/img/icons/mipmap-xhdpi/ic_launcher.png',
	'android_xxhdpi': 'public/img/icons/mipmap-xxdpi/ic_launcher.png',
	'android_xxhdpi': 'public/img/icons/mipmap-xxxdpi/ic_launcher.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');