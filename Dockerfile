# Dockerfile
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both dependencies and dev dependencies (important for ts-node-dev)
RUN npm install

# Copy the rest of the application files
COPY . .

# Install ts-node-dev globally to ensure it's available
RUN npm install -g ts-node-dev

# Expose the app's port
EXPOSE 3000

# Command to run your app with ts-node-dev for hot-reloading
CMD ["npm", "run", "dev"]
