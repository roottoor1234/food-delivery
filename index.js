// Import the 'ws' (WebSocket) module
const WebSocket = require('ws');

// Create a new WebSocket server instance, listening on port 8080
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

// Initialize an array to store coordinates
const coordinates = [];

// Event listener for when a client connects to the server
wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  // Event listener for when a message is received from a client
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    // Parse the incoming message (assuming it's JSON)
    try {
      const data = JSON.parse(message);
      // Push the coordinates to the array
      coordinates.push(data);
      
      // Broadcast the message to all connected clients
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // Send the message to all clients except the sender
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Event listener for when the connection is closed
  ws.on('close', function close() {
    console.log('Client disconnected');
  });

  console.log('WebSocket server listening on port 8080');
});
