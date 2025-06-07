import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export let options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

//Load and clean CSV file
const users = new SharedArray('users', function () {
  return open('./users.csv')
    .split('\n')
    .slice(1)
    .filter(line => line.trim() !== '') //Skip empty lines
    .map(line => {
      const [name, job] = line.split(',');
      return { name: name.trim(), job: job.trim() };
    });
});

export default function () {
  for (let user of users) {
    const payload = JSON.stringify({
      name: user.name,
      job: user.job,
    });

    const headers = { 'Content-Type': 'application/json' };

    const res = http.post('https://jsonplaceholder.typicode.com/users', payload, { headers });
    check(res, {
      'Status is 201 (Created)': (r) => r.status === 201,
      'Response has ID': (r) => JSON.parse(r.body).id !== undefined,
    });

    sleep(1);
  }
}
