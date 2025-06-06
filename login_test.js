import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // Mock login payload (JSONPlaceholder doesn't require auth, but simulates POST)
  const payload = JSON.stringify({
    username: 'test_user',
    email: 'test@example.com',
  });

  const headers = { 'Content-Type': 'application/json' };

  // Send POST to JSONPlaceholder (simulates a login-like response)
  const res = http.post(
    'https://jsonplaceholder.typicode.com/users',
    payload,
    { headers }
  );

  console.log('Status:', res.status, 'Response:', res.body);

  check(res, {
    'Status is 201 (Created)': (r) => r.status === 201, // 201 for successful POST
    'Response has ID': (r) => JSON.parse(r.body).id !== undefined, // Check for mock ID
  });

  sleep(1);
}