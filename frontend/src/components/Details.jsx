import React from "react";
import useAuth from "../hooks/useAuth";
import useDocuments, { formatDate } from "../admin/hooks/useDocument";

const Details = () => {
  const { user, loading: authLoading } = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL;
  // only fetch docs if we're an admin
  const { docs, loading: docsLoading } = useDocuments(user?.role === "admin");

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }

  // render admin or regular user view
  return (
    <div className="min-h-screen p-6 bg-[#05070f] text-white">
      {user.role === "admin" ? (
        <section>
          <h1 className="text-3xl font-bold mb-4">Uploaded Documents</h1>
          {docsLoading ? (
            <p>Loading documents...</p>
          ) : docs?.length ? (
            <ul className="space-y-3">
              {docs.map((doc) => (
                <li
                  key={doc._id}
                  className="p-4 bg-white/5 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium truncate">{doc.originalname}</p>
                    <p className="text-xs text-white/40">
                      {formatDate(doc.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      window.open(`${url}/uploads/${doc.filename}`, "_blank")
                    }
                    className="text-indigo-300 hover:underline text-sm"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents uploaded yet.</p>
          )}
        </section>
      ) : (
        <section>
          <h1 className="text-3xl font-bold mb-4">User Details</h1>
          <div className="space-y-2 text-white/90">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.name && (
              <p>
                <strong>Full Name:</strong> {user.name}
              </p>
            )}
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Details;
