#!/bin/bash
# no verbose
set +x
# config
envFilename='.env.production'
nextFolder='./.next'
appFolder='./'
function apply_path {
  # read all config file
  while read line; do
    # no comment or not empty
    if [ "${line:0:1}" == "#" ] || [ "${line}" == "" ]; then
      continue
    fi

    # split
    configName="$(cut -d'=' -f1 <<<"$line")"
    configValue="$(cut -d'=' -f2 <<<"$line")"
    # get system env
    envValue=$(env | grep "^$configName=" | grep -oe '[^=]*$');

    # if config found
    if [ -n "$configValue" ] && [ -n "$envValue" ]; then
      # replace all
      # echo "Replace: ${configValue} with: ${envValue}"
      # find $nextFolder \( -type d -name .git -prune \) -o -type f -print0
      # echo ""
      # echo ""
      # echo ""
      # echo ""
      find $appFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
      # find $nextFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
      # sed -i "s#$configValue#$envValue#g" ".env.production"
      # find "./" -name ".env.production" | xargs -0 sed -i "s#$configValue#$envValue#g"
      # find "./" -name ".env.production" | xargs -0 sed -i "s#APP_NEXT_API_URL#envValue#g"
      # echo ".env.production" | xargs -0 sed -i "s#APP_NEXT_API_URL#envValue#g"
      # sed -i .env.production "s#APP_NEXT_API_URL#envValue#g"

      # find $appFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
    fi
  done < $envFilename
}
apply_path
echo "Starting Nextjs"
exec "$@"
