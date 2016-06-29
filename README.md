# pimpapp-web
Versão web do aplicativo pimp.

Na instalação do meteor em debian 8 (jessie) configurado para português do Brasil encontrei o seguinte problema após mudar para o diretório da aplicação e chamar o comando : meteor
Unexpected mongo exit code 1. Restarting.
Unexpected mongo exit code 1. Restarting.
Unexpected mongo exit code 1. Restarting.
Can't start Mongo server.

A solução que encontrei foi adicionar esta linha no arquivo $HOME/.bashrc:
export LC_ALL=en_US.UTF-8

Para mais detalhes veja: https://github.com/meteor/meteor/issues/4019

Se o locale para o inglês dos EUA não estiver disponível, é necessário adicioná-lo, através do seguinte procedimento:
- executar comando: locale - para ver o valor para o usuário corrente
- executar comando: locale-gen "en_US.UTF-8" (pode requerer permissões de super usuário) - vai gerar dados para en_US.UTF-8
- alternativamente pode-se editar o arquivo /etc/locales.gen e tirar o comentário do locale desejado.

Para mais detalhes veja: http://askubuntu.com/questions/162391/how-do-i-fix-my-locale-issue.

## Criar o APP
https://recopimp.herokuapp.com/

## Rodando no Andriod:
```
export BIND_IP=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
meteor run android --verbose
adb devices
```

## Rodando no Deploy:
```
# diretorio build/ nao pode estar dentro do app
meteor build --server-only ../build/
```
## Build e distribuição do apk android
```

# definir numero de revisão
REVISION=$(git rev-list HEAD --count)

echo "cdvVersionCode = '$REVISION'" > ./cordova-build-override/platforms/android/build-extras.gradle

# criar o apk sem assinatura
meteor build ../caminho-do-build --server="https://usereco.com"

# gerar chave (depois de criada e associada à Play Store, deve ser usada a mesma)
keytool -genkey -alias reco-pimp -keyalg RSA -keysize 2048 -validity 10000

# aplicar chave ao apk
cd ../caminho-do-build/android/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk reco-pimp
# (onde 'reco-pimp' é o mesmo nome utilizado para definir a key)

# reduzir tamanho do apk removendo arquivos de debug
zipalign 4 release-unsigned.apk reco-pimp.apk
```