rm nohup*
export MONGO_URL='mongodb://localhost:27017/usereco'
export ROOT_URL='http://usereco.com'
export PORT=3000
nohup nodejs /home/usereco/bundle/main.js &
nginx -s reload 
