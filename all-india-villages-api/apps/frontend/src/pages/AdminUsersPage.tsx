import { useQuery } from "@tanstack/react-query";

import {
  getUsers,
} from "../services/adminUsersApi";

function AdminUsersPage() {

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ["users"],

    queryFn: getUsers,
  });

  if (isLoading) {

    return (

      <div>

        Loading users...

      </div>
    );
  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold mb-2">

          Users

        </h1>

        <p className="text-gray-500">

          Manage platform users

        </p>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-4">

                Email

              </th>

              <th className="text-left px-6 py-4">

                Plan

              </th>

              <th className="text-left px-6 py-4">

                Usage

              </th>

              <th className="text-left px-6 py-4">

                Status

              </th>

              <th className="text-left px-6 py-4">

                Created

              </th>

            </tr>

          </thead>

          <tbody>

            {data?.data.map(
              (user: any) => (

                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    {user.email}

                  </td>

                  <td className="px-6 py-4">

                    <span className="bg-black text-white px-3 py-1 rounded-xl text-sm">

                      {user.plan}

                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {user.monthlyUsage}
                    {" / "}
                    {user.monthlyQuota}

                  </td>

                  <td className="px-6 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm">

                      {user.status}

                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">

                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}

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

export default AdminUsersPage;