interface RequestItem {

  endpoint: string;

  method: string;

  responseTime: number;

  statusCode: number;

  createdAt: string;
}

interface Props {

  requests: RequestItem[];
}

function RecentRequestsTable({
  requests,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">

        Recent Requests

      </h2>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="py-2">
                Endpoint
              </th>

              <th className="py-2">
                Method
              </th>

              <th className="py-2">
                Status
              </th>

              <th className="py-2">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map(
              (request, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-2">

                    {request.endpoint}

                  </td>

                  <td className="py-2">

                    {request.method}

                  </td>

                  <td className="py-2">

                    {request.statusCode}

                  </td>

                  <td className="py-2">

                    {request.responseTime} ms

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentRequestsTable;