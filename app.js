const http = require("http");

const PORT = 3000;
    
const server = http.createServer(routes);

server.listen(PORT, ()=>console.log("Server started!"));