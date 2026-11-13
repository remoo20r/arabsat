#!/bin/bash
# usage: streamtest.sh s user pass stream_id   (run on the server)
s=$1; u=$2; p=$3; id=$4
UA="AppleCoreMedia/1.0.0.21A329 (iPhone; U; CPU OS 17_0 like Mac OS X)"
for e in ts m3u8; do
  L=$(curl -s -o /dev/null -w "%{redirect_url}" "127.0.0.1:8090/play/$s/live/$u/$p/$id.$e")
  out=$(curl -s -m 12 -L -A "$UA" -H "Origin: http://arabsat.example" -D /tmp/h -r 0-200000 -o /tmp/b -w "%{http_code} %{time_starttransfer} %{size_download}" "$L")
  acao=$(grep -i "^access-control-allow-origin" /tmp/h | tail -1 | tr -d '\r')
  echo "srv$s $e => $out | ${acao:-NO-CORS}"
done
