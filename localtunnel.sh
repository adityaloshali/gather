
#!/bin/bash
# make sure you have execute permissions:
# cd /path/to/project
# chmod +x ./localtunnel.sh
# to run, type ./localtunnel.sh in the terminal

function localtunnel {
lt -s gatherappwebhooklt --port 5000
}

until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done