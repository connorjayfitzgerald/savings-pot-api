# Build Stage
FROM node:10.15.3 As builder
WORKDIR /tmp/build
COPY *.json ./
# Install dependencies
RUN npm install
COPY jest.config.js .
COPY src src
COPY tests tests
# Definition is invalid
RUN rm node_modules/express-rate-limit/index.d.ts && npm run build

# Run Stage
FROM node:10.15.3 As runner
WORKDIR /root
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY --from=builder /tmp/build/dist dist
CMD ["node", "./dist"]  