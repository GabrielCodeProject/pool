import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export function getAllPages() {
  return fs.readdirSync(pagesDirectory).map((filename) => {
    const filePath = path.join(pagesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return { slug: filename.replace(/\.md$/, ""), ...data, content };
  });
}
