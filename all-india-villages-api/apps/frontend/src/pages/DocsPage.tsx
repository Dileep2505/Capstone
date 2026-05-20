import EndpointCard from "../components/EndpointCard";

function DocsPage() {

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold mb-2">

          API Documentation

        </h1>

        <p className="text-gray-500">

          Integrate All India Villages API into your applications.

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">

          Authentication

        </h2>

        <p className="mb-4 text-gray-600">

          Include your API credentials in request headers.

        </p>

        <div className="bg-black text-green-400 rounded-xl p-4">

          <pre>

{`X-API-Key: YOUR_API_KEY
X-API-Secret: YOUR_API_SECRET`}

          </pre>

        </div>

      </div>

      <EndpointCard

        method="GET"

        endpoint="/v1/states"

        description="Get all Indian states"

        example={`curl -X GET http://localhost:3000/v1/states \\
-H "X-API-Key: YOUR_API_KEY" \\
-H "X-API-Secret: YOUR_API_SECRET"`}
      />

      <EndpointCard

        method="GET"

        endpoint="/v1/search?q=pur"

        description="Search villages by name"

        example={`curl -X GET "http://localhost:3000/v1/search?q=pur" \\
-H "X-API-Key: YOUR_API_KEY" \\
-H "X-API-Secret: YOUR_API_SECRET"`}
      />

      <EndpointCard

        method="GET"

        endpoint="/v1/autocomplete?q=man"

        description="Autocomplete village names"

        example={`curl -X GET "http://localhost:3000/v1/autocomplete?q=man" \\
-H "X-API-Key: YOUR_API_KEY" \\
-H "X-API-Secret: YOUR_API_SECRET"`}
      />

    </div>
  );
}

export default DocsPage;