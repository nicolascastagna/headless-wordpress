// Page individuelle blog id
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// data
import { getAllPostsWithSlug, getPost } from "../../lib/api";

export default function Post({ postData }) {
  const router = useRouter();

  if (!router.isFallback && !postData?.slug) {
    return <p>Il semble avoir une erreur...</p>;
  }

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };

  return (
    <div className="container-slug-blog">
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        {router.isFallback ? (
          <h2>Chargement...</h2>
        ) : (
          <article className="article-blog">
            <div className="postmeta">
              <h1 className="title">{postData.title}</h1>
              <p>{formatDate(postData.date)}</p>
            </div>
            <div
              className="post-content content"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </article>
        )}
        <p>
          <Link href="/blog">
            <a>Retour aux articles</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);

  return {
    props: {
      postData: data.post,
    },
  };
}
