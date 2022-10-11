// Page blog
import Head from "next/head";
import Link from "next/link";

// data
import { getAllPosts } from "../../lib/api";

const Blog = ({ allPosts: { edges } }) => (
  <div className="container-blog">
    <Head>
      <title>Blog articles page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="main">
      <h1 className="title">Latest blog articles</h1>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <div className="list-item" key={node.id}>
            <div className="list-item__thumbnail">
              <figure>
                <img
                  src={node.extraInfo.thumbimage.mediaItemUrl}
                  alt={node.title}
                />
              </figure>
            </div>
            <div className="list-item__content">
              <h2>{node.title}</h2>
              <p>{node.extraInfo.extraitDeLauteur}</p>
              <Link href={`/blog/${node.slug}`}>
                <a>Read more </a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  </div>
);

// don't forget to export it as the default export!
export default Blog;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
