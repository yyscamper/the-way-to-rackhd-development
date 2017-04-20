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

