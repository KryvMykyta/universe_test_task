# Universe test task

## How to set up

### To start the application firstly you should configure your .env file regarding to .env.example. Optionally you can also change prometheus config in prometheus.yml file. After that you can freely run 'docker compose up -d' command to run docker container. All service application API endpoints were done regarding to sended swagger documentation. Worker application(prometheus) by default scraping metrics every 60s from service endpoint and storing it to internal database, which can be accessed by WebUI in prometheus docker container with special queries. Also were done optional tasks that should send exchange rates daily and fetch exchange rate hourly to observe changes.

