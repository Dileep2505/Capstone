import {
  useState,
} from "react";

import {
  runApiRequest,
} from "../services/playgroundApi";

function PlaygroundPage() {

  const [endpoint, setEndpoint] =
    useState("/v1/states");

  const [apiKey, setApiKey] =
    useState("");

  const [apiSecret, setApiSecret] =
    useState("");

  const [response, setResponse] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const runRequest =
    async () => {

      try {

        setLoading(true);

        const data =
          await runApiRequest(

            endpoint,

            apiKey,

            apiSecret
          );

        setResponse(data);

      } catch (error: any) {

        setResponse({

          error:
            error.response?.data
            || error.message,
        });

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold mb-2">

          API Playground

        </h1>

        <p className="text-gray-500">

          Test endpoints in real time

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        <div>

          <label className="block mb-2 font-semibold">

            Endpoint

          </label>

          <input
            value={endpoint}
            onChange={(e) =>
              setEndpoint(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            API Key

          </label>

          <input
            value={apiKey}
            onChange={(e) =>
              setApiKey(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            API Secret

          </label>

          <input
            value={apiSecret}
            onChange={(e) =>
              setApiSecret(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <button
          onClick={runRequest}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >

          {loading
            ? "Running..."
            : "Send Request"}

        </button>

      </div>

      <div className="bg-black text-green-400 rounded-2xl p-6 overflow-auto">

        <pre>

          {JSON.stringify(
            response,
            null,
            2
          )}

        </pre>

      </div>

    </div>
  );
}

export default PlaygroundPage;