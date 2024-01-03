# Universe Test Task

## How to Set Up

1. Configure your application by creating a `.env` file based on the provided `.env.example`.

2. Optionally, modify the Prometheus configuration in the `prometheus.yml` file if needed.

3. Run the following command to start the Docker containers:

    ```bash
    docker-compose up -d
    ```

   This command will launch the containers in detached mode.

4. All service application API endpoints are designed based on the Swagger documentation provided. You can access the API as per the documentation.

5. The worker application (Prometheus) automatically scrapes metrics every 60 seconds from the service endpoint and stores them in an internal database. The WebUI in the Prometheus Docker container allows you to query the stored metrics using special queries.

6. Optional tasks have been implemented, including sending daily exchange rates and fetching exchange rates hourly to observe changes.
