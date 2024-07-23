// generate-posts-metadata.ts
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const RSS = require('rss');
const marked = require('marked');

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
}

const postsDirectory = path.join(__dirname, 'public/posts');
const outputFile = path.join(__dirname, 'public/posts-metadata.json');
const rssFile = path.join(__dirname, 'public/rss.xml');

const posts: PostMetadata[] = [];
const rssPosts: any[] = [];

fs.readdirSync(postsDirectory).forEach((file: any) => {
  const filePath = path.join(postsDirectory, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { attributes, body } = frontMatter(fileContents);
  const content = marked.parse(body); // Convert markdown to HTML
  const postMetadata: PostMetadata = {
    slug: file.replace(/\.md$/, ''),
    ...attributes,
  };
  posts.push(postMetadata);

  rssPosts.push({
    ...postMetadata,
    content,
  });
});

// Sort posts by date in descending order
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
rssPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log('Posts metadata generated.');

// Generate RSS feed
const feed = new RSS({
  title: 'Logical Disconnect',
  description: 'Personal Blog of Kevin McAllister',
  feed_url: 'https://logicaldisconnect.org/assets/rss.xml',
  site_url: 'https://logicaldisconnect.org',
  language: 'en',
  pubDate: new Date().toISOString(),
  ttl: '60',
});

rssPosts.slice(0, 30).forEach((post) => {
  feed.item({
    title: post.title,
    description: post.content,
    url: `https://logicaldisconnect.org/post/${post.slug}`, // URL to the post
    author: "Kevin McAllister",
    date: post.date,
    categories: post.tags,
    // Include the content in the 'content' field
    content: post.content,
  });
});

// Write RSS feed to XML file
fs.writeFileSync(rssFile, feed.xml({ indent: true }));
console.log('RSS feed generated.');
