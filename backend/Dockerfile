# Stage 1: Python 
FROM python:3.10.12 AS python_stage
WORKDIR /usr/youtube-playlist-downloader
COPY ./python_app/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: nodejs
FROM node:20-alpine AS node_stage
WORKDIR /usr/youtube-playlist-downloader
COPY ./package.json ./
RUN npm install
COPY ./ ./

RUN npm install -g pm2
CMD ["pm2-runtime", "server.js", "--watch", "--json", "--silent"]
