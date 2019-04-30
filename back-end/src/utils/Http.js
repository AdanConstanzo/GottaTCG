import http from 'http';

// Main HTTP object that will fetch data
// add a call back here onResults returns response code and obj.
function HttpJsonRequest(options, onResult){
  const port = http;
  const req = port.request(options, (res) => {
    let output = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        output += chunk;
    });

    res.on('end', () => {
        const obj = JSON.parse(output);
        // Our callback.
        onResult(res.statusCode, obj);
    });
  });
  req.end();
}
export default HttpJsonRequest;