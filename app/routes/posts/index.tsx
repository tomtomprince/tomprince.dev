import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPosts } from "~/modules/posts";

export const loader: LoaderFunction = async () => {
  const posts = getPosts();
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
                <h2 style={{ marginTop: 0 }}>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
