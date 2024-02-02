FROM node:20-alpine
WORKDIR /usr/youtube-playlist-downloader-ui
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]