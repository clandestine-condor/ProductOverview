import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 500 },
    { duration: '15s', target: 1000 },
    { duration: '5s', target: 500 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};

const sleep_duration = 1;

export default function () {
  group('initial app load', () => {

  const product_max = 1000011;
  const product_min = 1;
  const question_max = 3518968;
  const question_min = 1;

  const product_id = Math.round((Math.random() * (product_max - product_min)) + product_min);

  let getProducts = http.get(`http://localhost:3000/products`);
  check(getProducts, {
    'is status 200': (response) => response.status === 200,
    'is duration < 2000ms': (response) => response.timings.duration < 2000,
  })

  sleep(sleep_duration);

  let getProductsByProductId = http.get(`http://localhost:3000/products/${product_id}`);
  check(getProductsByProductId, {
    'is status 200': (response) => response.status === 200,
    'is duration < 2000ms': (response) => response.timings.duration < 2000,
  })

  sleep(sleep_duration);

  let getStylesByProductId = http.get(`http://localhost:3000/products/${product_id}/styles`);
  check(getStylesByProductId, {
    'is status 200': (response) => response.status === 200,
    'is duration < 2000ms': (response) => response.timings.duration < 2000,
  })

  sleep(sleep_duration);

  let getRelatedProductsByProductId = http.get(`http://localhost:3000/products/${product_id}/related`);
  check(getStylesByProductId, {
    'is status 200': (response) => response.status === 200,
    'is duration < 2000ms': (response) => response.timings.duration < 2000,
  })

  sleep(sleep_duration);
  })
}