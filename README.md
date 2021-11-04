<div align="center">
<h1>E-Commerce Products Service</h1>
</div>

<div align="center">
  <img src="https://media4.giphy.com/media/GYe9NLMGJHzcitcxww/giphy.gif?cid=790b761146551a4fc4a95480f14ecae3c8fd5eefbd8e6341&rid=giphy.gif&ct=g" alt="Best Eats Logo" >
</div>


For this project, I worked with a team to refactor the monolithic API for an e-commerce clothing retailer into microservices. Each team member worked on separate microservices and my endpoints involved the product data.

### Results
* Seeded PostgreSQL database with over 10 million entries of product and product styles data.
* Tested multiple raw queries to the database. After finding the optimal combination of JOINS and JSON aggregate functions, along with the use of indices, was able to reduce local data retrieval times down to ~5ms.
* Deployed one server on an AWS EC2 instance and stressed tested with Loader.io. At 500 CPS the average response time was ~315 ms.
* Scaled microservice by deploying a second server and integrated NGINX as a load-balancer. Stress tested again with Loader.io and was able to increase CPS up to 1000, reduce average response time to ~23ms, and at a 0% error rate.

### How to use
To get dependencies
```
npm install 
```

Create a .env file, copy the contents of the .env.dist file into the .env file, and replace the placeholder
values with your environment variables.

To run server
```
npm start
```

To run the k6 stress test, download k6 from https://k6.io/open-source and use script 

```
npm run k6
```

### Tech-stack
* Node.js
* Express.js
* Knex.js
* PostgreSQL
* NGINX
* New Relic
* Loader.io
* k6

### Team
* <a href="https://github.com/jleiandy">Andy Lei</a>,
* <a href="https://github.com/cry-stal-lee">Crystal Lee</a>,
* <a href="https://github.com/nickwai1">Nick Wai</a>

