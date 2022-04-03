import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import md from "markdown-it";

async function getPost(fileName) {
  const postsDir = path.normalize(__dirname.replace("build", "app") + "/posts");
  const readFile = fs.readFileSync(`${postsDir}/${fileName}.md`, "utf-8");
  const { data: frontmatter, content } = matter(readFile);
  return { frontmatter, content };
}

export const loader: LoaderFunction = async ({ params }) => {
  const post = await getPost(params.postId);
  return json({ post });
};
export default function Index() {
  const { post } = useLoaderData();
  return (
    <main className="relative min-h-screen bg-white">
      <div className="prose mx-auto">
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(post.content) }} />
      </div>
    </main>
  );
}
