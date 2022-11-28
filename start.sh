kill -9 $(lsof -t -i:8000 -sTCP:LISTEN)
rm -rf node_modules/.cache/hard-source
yarn dev
