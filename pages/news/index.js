import Link from "next/link";

const NewsPage = () => {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="news/news-1">News 1</Link>
        </li>
        <li>
          <Link href="news/news-2">Another News</Link>
        </li>
      </ul>
    </>
  );
};

export default NewsPage;
