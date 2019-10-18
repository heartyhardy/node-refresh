const fs = require('fs');

const requestHandler = (req, res) => {
    
    let url = req.url;
    let method = req.method;

    if(url === '/'){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write("<h1> Node Server </h1>");
        res.write("<form action='/msg' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form>");
        res.write("</body>")
        res.write("<html>");
        return res.end();
    }
    if(req.url === '/msg' && method === 'POST'){

        const body = [];

        //Register DATA chunk recieve
        req.on('data', chunk => {
            body.push(chunk);
        });

        //Register DATA end
        return req.on('end', ()=>{
            const parsed = Buffer.concat(body).toString();
            const message = parsed.split('=')[1];
            fs.writeFile('Messages.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();                 
            });
   
        });

    }
    res.write("<html>");
    res.write("<body>");
    res.write("<h1> Hello from Node Server </h1>");
    res.write(`<h3> running on port ${req.message} </h3>`);
    res.write("</body>")
    res.write("<html>");
    res.end();       
}

module.exports = requestHandler;

// OR you could do multiple exports
// module.exports = {
//     handler: requestHandler,
//     somethingelse : somethingelse
// }

// OR you could do this...
//exports.hander = requestHandler;
//exports.something = something;