FROM gitpod/workspace-full:latest

# Install MongoDB
RUN sudo apt-get update && \
    sudo apt-get install -y mongodb && \
    sudo apt-get clean && \
    mkdir -p /workspace/data/db /workspace/data/log

#https://www.gitpod.io/guides/gitpodify