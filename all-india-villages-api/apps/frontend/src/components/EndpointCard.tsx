interface Props {

  method: string;

  endpoint: string;

  description: string;

  example: string;
}

function EndpointCard({

  method,

  endpoint,

  description,

  example,

}: Props) {

  const copyExample = () => {

    navigator.clipboard.writeText(
      example
    );

    alert("Copied");
  };

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex items-center gap-3 mb-4">

        <span
          className={`
            px-3 py-1 rounded text-white text-sm font-bold
            ${
              method === "GET"
                ? "bg-green-500"
                : "bg-blue-500"
            }
          `}
        >

          {method}

        </span>

        <code className="text-lg">

          {endpoint}

        </code>

      </div>

      <p className="text-gray-600 mb-6">

        {description}

      </p>

      <div className="bg-black text-green-400 rounded-xl p-4 overflow-auto text-sm">

        <pre>

          {example}

        </pre>

      </div>

      <button
        onClick={copyExample}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Copy Example
      </button>

    </div>
  );
}

export default EndpointCard;
