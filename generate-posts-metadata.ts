// generate-posts-metadata.ts
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
}

const postsDirectory = path.join(__dirname, 'public/posts');
const outputFile = path.join(__dirname, 'public/posts-metadata.json');

const posts: PostMetadata[] = [];

fs.readdirSync(postsDirectory).forEach((file: any) => {
  const filePath = path.join(postsDirectory, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { attributes } = frontMatter(fileContents);
  posts.push({
    slug: file.replace(/\.md$/, ''),
    ...attributes,
  } as PostMetadata);
});

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log('Posts metadata generated.');
