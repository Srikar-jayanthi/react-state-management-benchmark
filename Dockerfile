# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY redux-version/package*.json ./
RUN npm install
COPY redux-version/ ./
COPY shared-assets/ ./src/ # Ensure shared assets are available during build if needed
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
