FROM python:3.10.12 AS base
WORKDIR /usr/youtube-playlist-downloader
COPY ./python_app/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

FROM base AS nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
WORKDIR /usr/youtube-playlist-downloader
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm install -g pm2
CMD ["pm2-runtime", "server.js", "--watch", "--json", "--silent"]
