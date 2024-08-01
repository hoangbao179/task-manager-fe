# Dockerfile
# Build stage
FROM node:20 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.next .next
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
