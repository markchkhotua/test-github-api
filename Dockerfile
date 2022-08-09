FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
ADD . .
RUN pnpm build
EXPOSE 3000
CMD ["node", "./lib/index.js"]