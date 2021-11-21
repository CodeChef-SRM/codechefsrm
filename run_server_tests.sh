#!/bin/bash

error="\e[1;31m[ERROR]\e[0m"
execution="\e[0;36m[INFO]\e[0m"

echo -e "$execution [...]"


# START SERVER
if [ $1 = "run-server" ];
then
    . ./run.sh
    echo "$execution [SERVER-BOOT-COMPLETE]"
fi

# Find tests
sleep 5s
cd server

echo "$execution Starting Server Tests"


var=$(python3 test_runner.py | grep "Failing Tests" -c)


if [ $var = 0 ];
then
    echo "$execution All tests pass!"
else
    echo "$error Failing Tests!"
    cd ../
    exit -1
fi

if [ $2 = "shutdown" ];
then
    echo "$execution Killing port [...]"
    fuser -k 8000/tcp
fi

cd ../

echo "$execution Claning up!"