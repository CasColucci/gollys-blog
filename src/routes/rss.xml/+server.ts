import type { Post } from "$lib/types.js";

export async function GET({ fetch }) {
  const response = await fetch("/api/posts");
  const posts: Post[] = await response.json();

  const website = "http://zegollygosh.com";
  const feedTitle = "Golly Gosh - Golly's Garden";
  const feedDescription =
    "Various fun projects, musings, and updates from Golly's Garden.";
  const feedLink = "http://zegollygosh.com";

  const headers = { "Content-Type": "application/xml" };

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${feedTitle}</title>
				<description>${feedDescription}</description>
				<link>${website}</link>
				<atom:link href="${feedLink}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
          .map(
            (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.excerpt}</description>
							<link>${feedLink}/posts/${post.slug}</link>
							<guid isPermaLink="true">${feedLink}/posts/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`,
          )
          .join("")}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, { headers });
}
