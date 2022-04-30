import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Post = {
  slug: string;
  frontmatter: any;
};

function sortPostsNewestFirst(posts: Post[] = []): Post[] {
  return posts.sort((a, b) => {
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });
}

function buildPostFromPath(postsDir: string, fileName: string): Post {
  const slug = fileName.replace(".md", "");
  const readFile = fs.readFileSync(`${postsDir}/${fileName}`, "utf-8");
  const { data: frontmatter } = matter(readFile);

  return {
    slug,
    frontmatter,
  };
}

function resolvePostsDirectory(): string {
  return path.normalize(__dirname.replace("build", "app") + "/posts");
}

function readPostsFromFileSystem(): Post[] {
  const postsDir = resolvePostsDirectory();
  const files = fs.readdirSync(postsDir);
  return files.map((fileName) => buildPostFromPath(postsDir, fileName));
}

export function getPosts(): Post[] {
  const posts = readPostsFromFileSystem();
  return sortPostsNewestFirst(posts);
}
