export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Access Control */}
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-3">Access & Roles</h3>
          <p className="text-sm text-white/60 mb-4">
            Manage role-based access and document permissions.
          </p>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Define Admin, Manager, Employee roles</li>
            <li>• Restrict document access by department</li>
            <li>• Read-only vs edit permissions</li>
          </ul>
        </div>

        {/* Ingestion Rules */}
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-3">Knowledge Ingestion</h3>
          <p className="text-sm text-white/60 mb-4">
            Control how documents are ingested and indexed.
          </p>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Allowed file types & size limits</li>
            <li>• Document versioning & replacement</li>
            <li>• Automatic re-indexing</li>
          </ul>
        </div>

        {/* RAG Behavior */}
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-3">AI & RAG Behavior</h3>
          <p className="text-sm text-white/60 mb-4">
            Tune retrieval and hallucination guardrails.
          </p>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Similarity confidence threshold</li>
            <li>• Top-K retrieval settings</li>
            <li>• Strict citation enforcement</li>
          </ul>
        </div>

        {/* Compliance */}
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-3">Compliance & Audit</h3>
          <p className="text-sm text-white/60 mb-4">
            Ensure traceability and regulatory compliance.
          </p>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Query logging & retention policy</li>
            <li>• Export audit logs</li>
            <li>• PII masking in queries</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
