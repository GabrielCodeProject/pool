"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { API_BASE } from "@/config/apiBase";

type Frontmatter = {
  title?: string;
  description?: string;
};

interface FileEntry {
  name: string;
  slug: string;
}

export default function AdminPage() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selected, setSelected] = useState<FileEntry | null>(null);
  const [body, setBody] = useState("");
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({});
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [showSecretPrompt, setShowSecretPrompt] = useState(false);

  // Fetch file list
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/github-pages-list`)
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
    fetch(`${API_BASE}/github-pages-read?slug=${file.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.content) throw new Error("No content");
        const parsed = matter(data.content);
        setBody(parsed.content || "");
        setFrontmatter(parsed.data as Frontmatter);
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
    if (!adminSecret) {
      setShowSecretPrompt(true);
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(false);
    // Compose markdown with YAML frontmatter
    let markdown = `---\n`;
    if (frontmatter.title)
      markdown += `title: "${frontmatter.title.replace(/"/g, '"')}"\n`;
    if (frontmatter.description)
      markdown += `description: "${frontmatter.description.replace(
        /"/g,
        '"'
      )}"\n`;
    markdown += `---\n\n${body}`;
    const res = await fetch(
      `${API_BASE}/github-pages-update?slug=${selected.slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ content: markdown, sha }),
      }
    );
    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
      if (data.error === "Unauthorized") {
        setShowSecretPrompt(true);
      }
    }
    setSaving(false);
  };

  // Handle admin secret prompt
  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSecretPrompt(false);
    setError(null);
    setSuccess(false);
    // Try saving again after setting secret
    saveFile();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin CMS</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Saved!</div>}
      {showSecretPrompt && (
        <form
          className="mb-4 p-4 border rounded bg-gray-50 dark:bg-gray-800"
          onSubmit={handleSecretSubmit}
        >
          <label className="block mb-2 font-semibold">
            Enter Admin Secret:
            <input
              type="password"
              className="block w-full mt-1 p-2 border rounded"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              autoFocus
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
          >
            Submit
          </button>
        </form>
      )}
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
              <div className="mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="font-semibold mr-2">
                    Title:
                    <input
                      type="text"
                      className="ml-2 p-1 border rounded"
                      value={frontmatter.title || ""}
                      onChange={(e) =>
                        setFrontmatter((fm) => ({
                          ...fm,
                          title: e.target.value,
                        }))
                      }
                      disabled={loading || saving}
                    />
                  </label>
                  <label className="font-semibold md:ml-4">
                    Description:
                    <input
                      type="text"
                      className="ml-2 p-1 border rounded w-64"
                      value={frontmatter.description || ""}
                      onChange={(e) =>
                        setFrontmatter((fm) => ({
                          ...fm,
                          description: e.target.value,
                        }))
                      }
                      disabled={loading || saving}
                    />
                  </label>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50 mt-2 md:mt-0"
                  onClick={saveFile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <textarea
                  className="w-full h-80 p-2 border rounded font-mono"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={loading || saving}
                />
                <div className="w-full h-80 p-2 border rounded overflow-auto bg-white dark:bg-gray-900">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{body}</ReactMarkdown>
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
