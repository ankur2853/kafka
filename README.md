# Kafka Node.js Producer & Consumer

This project demonstrates a simple Apache Kafka producer and consumer setup using Node.js (`kafkajs`) and MySQL.

The **Producer** generates JSON messages containing user information at regular intervals and sends them to a Kafka topic.
The **Consumer** listens to that topic, parses the JSON messages, and inserts the user records into a MySQL database.

## Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Java Development Kit (JDK) 8+](https://www.oracle.com/java/technologies/downloads/) (Required for running Kafka)
- [Apache Kafka](https://kafka.apache.org/downloads)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## Setup Instructions

### 1. Install Java & Set Environment Variables (Windows)
Kafka requires Java to run properly.
1. Download and install Java from the [Oracle website](https://www.oracle.com/java/technologies/downloads/).
2. Set the `JAVA_HOME` environment variable:
   - Right-click on "This PC" > Properties > Advanced system settings > Environment Variables.
   - Click **New** under System variables.
   - Set **Variable name** to `JAVA_HOME`.
   - Set **Variable value** to your JDK path (e.g., `C:\Program Files\Java\jdk-23`).
   - Edit the **Path** variable and add `%JAVA_HOME%\bin` to the end.

### 2. Download and Start Kafka (Windows)
1. Download the latest binary `.tgz` file from the [Apache Kafka Downloads](https://kafka.apache.org/downloads) page and extract it.
2. Open a terminal in the extracted Kafka folder and start the Zookeeper server:
   ```bash
   .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
   ```
3. Open a new terminal in the same folder and start the Kafka broker:
   ```bash
   .\bin\windows\kafka-server-start.bat .\config\server.properties
   ```

### 3. Database Setup
1. Ensure your MySQL server is running on `localhost` without a password for the `root` user (as configured in `database.js`, or update `database.js` with your credentials).
2. Create a database named `lxm`.
3. Create a `users` table with the following structure:
   ```sql
   CREATE DATABASE IF NOT EXISTS lxm;
   USE lxm;

   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password VARCHAR(255) NOT NULL,
       eStatus CHAR(1) DEFAULT 'y'
   );
   ```

### 4. Install Project Dependencies
In the root directory of this project (`f:\kafkaPro`), install the required Node.js packages:
```bash
npm install
```

## Running the Application

### The Producer
The producer sends dummy user data to the `test-topic` every 1 second.
To start generating messages, run:
```bash
node producer.js
```

### The Consumer
The consumer listens to `test-topic`, reads the incoming user data, and inserts it into the MySQL database.
To start processing messages, run (in a separate terminal):
```bash
node consumer.js
```

### Basic Example
There is also a `kafka_example.js` file which acts as a simple all-in-one example script showing how a producer and consumer work in the same file.
```bash
node kafka_example.js
```
