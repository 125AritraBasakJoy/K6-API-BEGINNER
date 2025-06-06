import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [

    { duration: '10s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'] // 95% of requests should complete in <500ms
  }
};

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/users/1'); // Fetch user with ID 1

    check(res, {
        'Status is 200': (r) => r.status === 200, // Check if the response status is 200 OK
        'Response has ID 1': (r) => JSON.parse(r.body).id === 1, // Check if the user ID in the response is 1
    });
}
