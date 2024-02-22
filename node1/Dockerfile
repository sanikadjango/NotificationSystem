# Use an official Node.js image
FROM node:14

# Install RabbitMQ
RUN apt-get update && apt-get install -y rabbitmq-server

# Set the working directory
WORKDIR /app

# Copy your Node.js application code into the container
COPY . /app

# Install application dependencies
RUN npm install

# Expose ports for Node.js and RabbitMQ
EXPOSE 3001 5672

# Start both Node.js and RabbitMQ services
CMD ["rabbitmq-server", "start"]
CMD ["npm", "start"]  # Assuming your Node.js app uses npm start for starting locations
