"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface FileEntry {
  name: string;
  slug: string;
}

export default function AdminPage() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selected, setSelected] = useState<FileEntry | null>(null);
  const [content, setContent] = useState("");
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch file list
  useEffect(() => {
    setLoading(true);
    fetch("/api/github/pages")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load files");
        setLoading(false);
      });
  }, []);

  // Fetch file content
  const loadFile = (file: FileEntry) => {
    setSelected(file);
    setLoading(true);
    setError(null);
    setSuccess(false);
    fetch(`/api/github/pages/${file.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content || "");
        setSha(data.sha || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load file content");
        setLoading(false);
      });
  };

  // Save file content
  const saveFile = async () => {
    if (!selected) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    const res = await fetch(`/api/github/pages/${selected.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, sha }),
    });
    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin CMS</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Saved!</div>}
      <div className="flex gap-8">
        {/* File list */}
        <div className="w-1/4 border-r pr-4">
          <h2 className="font-semibold mb-2">Files</h2>
          <ul>
            {files.map((file) => (
              <li key={file.slug}>
                <button
                  className={`text-left w-full py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selected?.slug === file.slug
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => loadFile(file)}
                  disabled={loading}
                >
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Editor and preview */}
        <div className="flex-1">
          {selected ? (
            <>
              <div className="mb-2 flex justify-between items-center">
                <h2 className="font-semibold">Editing: {selected.name}</h2>
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
                  onClick={saveFile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  className="w-full h-80 p-2 border rounded font-mono"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading || saving}
                />
                <div className="w-full h-80 p-2 border rounded overflow-auto bg-white dark:bg-gray-900">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {/* Real markdown preview */}
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-500">Select a file to edit</div>
          )}
        </div>
      </div>
    </div>
  );
}
