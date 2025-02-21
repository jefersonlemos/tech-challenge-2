# Use the official Node.js image from the Docker Hub
FROM node:22

# Create and change to the app directory
WORKDIR /techChallenge/grupo6

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]