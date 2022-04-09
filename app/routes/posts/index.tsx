import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

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
    <div className="prose mx-auto">
      <ul>
        {posts.map((post: any) => {
          const path = `/posts/${post.slug}`;
          return (
            <li key={post.slug}>
              <Link to={path}>
                <h2 style={{marginTop: 0}}>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
