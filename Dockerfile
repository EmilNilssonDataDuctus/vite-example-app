# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Build the React application using Vite
RUN npm run build

# Step 6: Use an official NGINX image to serve the built application
FROM nginx:stable-alpine

# Step 7: Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 8: Expose port 80
EXPOSE 80

# Step 9: Start NGINX
CMD ["nginx", "-g", "daemon off;"]
