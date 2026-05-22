import { useQuery } from "@tanstack/react-query";

import {
  createApiKey,
  getApiKeys,
  revokeApiKey,
} from "../services/apiKeyApi";

import ApiKeyCard
  from "../components/ApiKeyCard";

function ApiKeysPage() {

  const {
    data,
    refetch,
    isLoading,
  } = useQuery({

    queryKey: ["apiKeys"],

    queryFn: getApiKeys,
  });

  const handleCreate =
    async () => {

      const response =
        await createApiKey();

      alert(
        `API Secret (save now): ${response.data.secret}`
      );

      refetch();
    };

  const handleRevoke =
    async (id: string) => {

      await revokeApiKey(id);

      refetch();
    };

  if (isLoading) {

    return (
      <div className="p-10">

        Loading API keys...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">

          API Keys

        </h1>

        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate API Key
        </button>

      </div>

      <div className="max-h-[700px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

        {data.data.map(
          (apiKey: any) => (

            <ApiKeyCard
              key={apiKey.id}
              apiKey={apiKey}
              onRevoke={
                handleRevoke
              }
            />
          )
        )}

      </div>

    </div>
  );
}

export default ApiKeysPage;