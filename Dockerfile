# FROM golang:1.7.3 AS builder
# WORKDIR /go/src/github.com/alexellis/href-counter/
# RUN go get -d -v golang.org/x/net/html  
# COPY app.go    .
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# FROM alpine:latest  
# RUN apk --no-cache add ca-certificates
# WORKDIR /root/
# COPY --from=builder /go/src/github.com/alexellis/href-counter/app .
# CMD ["./app"]  

FROM node:10.15.3 AS builder

WORKDIR /tmp/build

COPY *.json ./

# Install dependencies
RUN npm install && npm install -g typescript

COPY src .

RUN tsc

CMD ["node", "dist"]