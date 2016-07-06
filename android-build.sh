rm -rf ../pimp-build

export REVISION=$(git rev-list HEAD --count)

echo "cdvVersionCode = '$REVISION'" > ./cordova-build-override/platforms/android/build-extras.gradle

meteor build ../pimp-build --server="https://usereco.com"

cd ../pimp-build/android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk reco-pimp

zipalign 4 release-unsigned.apk reco-pimp.apk

cd ../../pimpapp-frontend