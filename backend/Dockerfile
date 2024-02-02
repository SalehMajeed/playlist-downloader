# Stage 1: nodejs
FROM node:20-alpine AS node_stage
WORKDIR /usr/youtube-playlist-downloader
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Stage 2: Python 
FROM python:3.10.12 AS python_stage
WORKDIR /usr/youtube-playlist-downloader
COPY ./python_app/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Final Stage
FROM node:20-alpine
WORKDIR /usr/youtube-playlist-downloader
COPY --from=python_stage /usr/local/bin/python /usr/local/bin/
COPY --from=node_stage /usr/youtube-playlist-downloader .

RUN npm install -g pm2
CMD ["pm2-runtime", "app.js", "--watch", "--json", "--silent"]
