import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const loader: LoaderFunction = async () => {
  const postsDir = path.normalize(__dirname.replace("build", "app") + "/posts");
  const files = fs.readdirSync(postsDir);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`${postsDir}/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Sort newest post first (date descending)
  posts.sort((a, b) => {
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });

  return json({
    posts,
  });
};
export default function Index() {
  const { posts } = useLoaderData();
  return (
    <main className="relative min-h-screen bg-white">
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}
