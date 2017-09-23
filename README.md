# ts-http-react
A no-express static view templating with typescript react views on a node http server

## Performance

Faster than dotnet core.  rps to be shown.

All tests on low-end cloud server: on a 1 GB 1 core gcloud compute instance.

+ react-http node: 7.4k rps (ms: 13-25-69)
+ Plain http node: 8.5k rps (11-19-31)
+ dotnet core Kestrel: 4.8k rps (ms: 20-29-67)
+ spirit: 9.6k rps (ms: 10-14-26)
+ micro: 8k rps (ms: 12-19-29)
+ express: 5.3k rps (ms: 18-31-45)
+ php: 8.1k (ms: 12-14-22)
+ react-http-render: 3.6k (25-55-94)
