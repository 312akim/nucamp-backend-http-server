const http = require('http');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer(
    //Request handler is called everytime server receives a request.    
    (req, res) => {
        console.log(req.headers);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); //What to expect in response body. Anytime sending html setup like this.
        res.end('<html><body><h1>Hello World!</h1></body></html>'); //Short body can be sent as param in .end method.
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//video ends 6:45