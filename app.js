const http = require("http");
const routes = require('./routes');

// Setting a port
const PORT = 3000;


    //Displying basic details of Request

    // console.log(
    //     `
    //     url: ${req.url}
    //     headers: ${req.headers}
    //     method: ${req.method}
    //     `
    //     );

    //To hard exit -demo purposes only
    //process.exit();
    
const server = http.createServer(routes);

server.listen(PORT, ()=>console.log("Server started!"));