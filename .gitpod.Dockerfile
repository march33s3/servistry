FROM gitpod/workspace-full:latest

# Install MongoDB
RUN apt-get update && \
    apt-get install -y gnupg wget && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" > /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    apt-get clean && \
    mkdir -p /workspace/data/db /workspace/data/log

#https://www.gitpod.io/guides/gitpodify