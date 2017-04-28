## RackHD APIs

* API 2.0
* Redfish
* API 1.1 \(Deprecated\)

## RESTful Design Pattern

* Key Points:
  * **R**epresentation **S**tate **T**ransfer
  * Resource oriented
  * Uniform interface
  * Resource linkage with single root API
  * Stateless communication
* URI
  * Universal Resource Identifier
  * Each resource should be allocated an URI
  * One URI should only map to only one resource \(unique\)
  * Different URI may map to the same resource \(latest version and v2.0\)
* HTTP Verb

* | Verb | CRUD | Description |
  | :--- | :--- | :--- |
  | HEAD |  | Can be issued against any resource to get just the HTTP header info \(Metadata\) |
  | GET | Read | Used for retrieving resources |
  | POST | Create | Used for creating resources |
  | PATCH | Update | Used for updateing resources with partial data. PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept POST request. |
  | PUT | Update\(Replace\) | Used for replacing resources or collections |
  | DELETE | Delete | Used for deleting resources |
  | OPTIONS |  | Get which methods are allowed for specified resource. |

* Safe & Idempotent
  * Safe: The request will not change server's state whenever or how many you send the request.
  * Idempotent\(幂等性\): The result is always same no matter how many time you send the request.
  * GET/HEAD is safe
  * GET/HEAD/PUT/PATCH/DELETE is idempotent
  * POST is neither safe nor idempotent
  * Why safe & idempotent is important? Image you request is timeout, you are trying...

## API Framework

* Swagger on Express

## Swagger Settings

* Initialize swagger: [https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js\#L170](https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js#L170)
* Swagger common config: [https://github.com/RackHD/on-http/blob/master/swagger\_config/default.yaml](https://github.com/RackHD/on-http/blob/master/swagger_config/default.yaml)
* API 2.0 Swagger config: [https://github.com/RackHD/on-http/blob/master/static/monorail-2.0.yaml](https://github.com/RackHD/on-http/blob/master/static/monorail-2.0.yaml)
* Redfish Swagger config: [https://github.com/RackHD/on-http/blob/master/static/redfish.yaml](https://github.com/RackHD/on-http/blob/master/static/redfish.yaml)

## RackHD Swagger Middleware

* RackHD Swagger middleware source: [https://github.com/RackHD/on-http/tree/master/lib/fittings](https://github.com/RackHD/on-http/tree/master/lib/fittings)
* List of middlewares
  * error\_handler
  * rackhd\_validator
  * swagger\_authn
  * swagger\_authz
  * swagger\_locals
  * swagger\_render
  * swagger\_serdes

## API Pipeline

![](/assets/api-pipeline.png)

## Steps for Creating New API

* Create router function \(create API service func if needed\)
* Create a schema file to validate API request body
* Create a view to render API output
* Insert API config into swagger config file

## HTTP Proxy

## Special Design

* HTTP event middleware: [https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js\#L346](https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js#L346)

  * Log every request

  * Distinguish different nodes

  * `uuid` for HTTP request: Distinguish the same http request from different nodes, see [https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js\#L350](https://github.com/RackHD/on-http/blob/master/lib/services/http-service.js#L350)

  * Skupack scope

* API proxy

## Tools

* SwaggerUI
* curl
* httpie
* postman
* jq

---

Introduce the RackHD API design structure.

**Goals:**

\(1\)Understand the API design structure \(Swagger architecture\).

\(2\)Quickly locate the source code of each API.

**Practice:**

\(1\)Create following APIs

-GET /api/2.0/config/logcolor : Return whether the log color is enabled or not

-POST /api/2.0/config/logcolor { enable: true/false }: To enable or disable the log color.

Check items:

-Make sure the swagger UI shows the new APIs.

Make sure your API works as expected.

**Extend:**

\(1\) Thinking about why the logcolor only works for on-http process, other processes not.

