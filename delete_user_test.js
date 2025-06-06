import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1,
  duration: '5s',
};

export default function () {
    let res = http.del('https://httpbin.org/delete');
check(res, {
  'Returns 200 OK': (r) => r.status === 200,
  'Has JSON response': (r) => JSON.parse(r.body).url === 'https://httpbin.org/delete'
});
    
    console.log(`Status: ${res.status}, Body: ${res.body}`); // Debug output
}