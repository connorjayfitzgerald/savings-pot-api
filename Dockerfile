# Build Stage
FROM node:10.15.3
WORKDIR /tmp/build
COPY *.json ./
# Install dependencies
RUN npm install
COPY src src
# Definition is invalid
RUN rm node_modules/express-rate-limit/index.d.ts && npm run build

# Run Stage
FROM node:10.15.3 
WORKDIR /root
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY --from=0 /tmp/build/dist dist
CMD ["node", "./dist"]  