# NodeJS Cluster Example

<table>
  <tr>
    <td>Create By:</td>
    <td>Richard Jackson</td>
  </tr>
  <tr>
    <td>Date:</td>
    <td>10 April 2021</td>
  </tr>
</table>

<h3>Project Summary</h3>
<p>
The Cluster module is important for performance. We will refactor a previous example named the "Hello World" API and run all of the cores of our machine (via the NodeJS Cluster Module). <br/>
Incoming request will in a normal manner. This refactor will help to make the application more responsive for multiple request.
</p>

<!-- -->
``` sh
# View the number of CPUs
curl --silent --location --request GET 'localhost:3000/info'
```
<em>Returns:</em>
<pre>
<span>{
    "cpu_count": 4
}</span>
</pre>

<!-- -->
``` sh
# View the hello world information
curl --silent --location --request GET 'localhost:3000/hello'
```
<em>Returns:</em>
<pre>
<span>{
  "hello": "My name is computer"
}</span>
</pre>

<!-- -->
``` sh
# View the ping information
curl --silent --location --request GET 'localhost:3000/ping'
```
<em>Returns:</em>
<pre>
<span>{
  "status": "ok"
}</span>
</pre>
