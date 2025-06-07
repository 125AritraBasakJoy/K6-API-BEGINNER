import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '30s',
    };  

export default function () {
    for (let i = 0; i <= 5; i++) {
    let payload = JSON.stringify({
        name: 'John Doe',
        job: 'Software Engineer',
    });
    
    let headers = { 'Content-Type': 'application/json' };   
    let res = http.post('https://jsonplaceholder.typicode.com/users', payload, { headers });
    check(res, {
        'Status is 201 (Created)': (r) => r.status === 201, // Check if the response status is 201 Created
        'Response has ID': (r) => JSON.parse(r.body).id !== undefined, // Check if the response contains an ID
    });
    sleep(1); // Sleep for 1 second to simulate user wait time
}
}
