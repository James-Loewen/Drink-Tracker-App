FROM node:slim AS builder

WORKDIR /app

COPY ./frontend/package*.json .

RUN npm ci

COPY ./frontend .

RUN npm run build

FROM nginx:stable-alpine

# Copy nginx config file
COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certs. (At some point I'll implement Certbot)
COPY ./compose/production/nginx/certs/ /etc/nginx/ssl/

# Copy built application code
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]