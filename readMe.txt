# Scalable Notification System

This repository contains the code for a scalable notification system designed with a load balancer, Node.js services, and a RabbitMQ service. The system is designed to handle a large volume of notifications efficiently.

## Components

### 1. Load Balancer

- A load balancer is responsible for distributing incoming requests across multiple Node.js service instances. It helps distribute the load evenly to ensure efficient utilization of resources.

### 2. Node.js Services

- Node.js services are responsible for processing incoming requests, performing business logic, and forwarding relevant information to a RabbitMQ service for asynchronous processing.

### 3. RabbitMQ Service

- RabbitMQ acts as a message broker, facilitating communication between services.

## System Flow

1. **Client Sends Request:**
   - The client sends a request to the load balancer's endpoint (e.g., `http://localhost:3000/`).

2. **Load Balancer Distributes Request:**
   - The load balancer distributes the incoming request to one of the available Node.js service instances.

3. **Node.js Service Processes Request and Publishes to RabbitMQ:**:**
   - The Node.js service receives the request and processes it.
   - After processing the request, the Node.js service publishes a message to RabbitMQ.
   - Send query content the POST call with desired Queue data
   - Example : curl -H 'Content-Type: application/json' -d '{"msg":"ping pong"}' -X POST localhost:3000/send-notification

4. **RabbitMQ Queues Messages:**
   - RabbitMQ Queue ensures that queue exist and queues the message in a specific queue.

5. **Worker Consumes Messages:**
   - Node.js Consumer function consumes messages from the RabbitMQ queue with specific notification message.
   - This function performs the GET actions to fetch the content present in Queue
   - Example : curl -i localhost:3000/get-notification

## Setting Up and Running the System

### Prerequisites

- Docker Image with Node.js and RabbitMQ installed and running
- Node.js Installed on Local machine 

### Steps

1. **Load Balancer Setup:**
   - Execute Node.js script to Configure and start load balancer to distribute traffic to the Docker service hosting RabbitMQ and Main Node.js function .
   - Execution command
	* node lb.js 
   - Expected output 
	* Load Balancer is running on http://localhost:3000

2. **Build Docker Image hosting Node.js Service and RabbitMQ:**
   - Docker Image must contain 
	* Node.js service installed and running 
	* RabbitMQ service installed and running 
	* Expose Port 3001 for Node.js and 5672 for RabbitMQ service.
   - Execution command 
	* docker build -t <image-name> .

3. **Run Docker container
   - docker images ( to Get imageID)
   - docker run -d -p 3001:3001 <imageID>
	
Note: To run more instances of of node use the same image and change the mapped port. Example: docker run -d -p 3002:3001 <imageID>.
      Add the new url in the file lb.js in 'nodeServiceUrls' array.


