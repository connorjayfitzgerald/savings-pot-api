# Build Stage
FROM node:10.15.3
WORKDIR /tmp/build
COPY *.json ./
# Install dependencies
RUN npm install && npm install -g typescript
COPY src src
RUN tsc

# Run Stage
FROM node:10.15.3 
WORKDIR /root
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY --from=0 /tmp/build/dist dist
CMD ["node", "./dist"]  