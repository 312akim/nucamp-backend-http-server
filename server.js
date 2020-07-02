const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer(
    //Request handler is called everytime server receives a request.    
    (req, res) => {
        console.log(`Request for ${req.url} by method ${req.method}`);

        if (req.method === 'GET') {
            let fileUrl = req.url; //Examine URL that was requested.
            if (fileUrl === '/') { //if request is just to host name, fileUrl will be /
                fileUrl = '/index.html'; //Send back index.html
            }
                            // .resolve converts relative path to absolute path.
            const filePath = path.resolve('./public' + fileUrl) //Get absolute path of file being requested
            
            //Check if file is an HTML file...
            const fileExt = path.extname(filePath); //Parse out extension from filePath
            if (fileExt === '.html') {
                fs.access(filePath, err => {   //Check if file exists/accessible
                    if (err) {
                        res.statusCode = 404;
                        res.setHeader('Context-Type', 'text/html');
                        res.end(`<html><body><h1>Error 404: ${fileUrl} is not found</h1></body></html>`)
                        return;
                    }
                    //If no errors...
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');

                    //To send HTML file
                    //Reads contents of file given in small chunks, doesn't load whole thing into memory, chunks at a time. Similar to lazy loading.
                    fs.createReadStream(filePath).pipe(res); // .pipe(res) sending it over to response object. Available from 1 node stream object to another. res can now access data
                                                                //(res object is a stream) (createReadStrean also creates a stream object)
                    //When createReadStream is finished reading from file, causes response object to end. No need for res.end
                    
                });
            } else {
                res.statusCode = 404;
                res.setHeader('Context-Type', 'text/html');
                res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`)
            }

        } else {
            res.statusCode = 404;
            res.setHeader('Context-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`)
        }

        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html'); //What to expect in response body. Anytime sending html, setup like this.
        // res.end('<html><body><h1>Hello World!</h1></body></html>'); //Short body can be sent as param in .end method.
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//video begins 9:40