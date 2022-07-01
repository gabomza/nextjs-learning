import { useRouter } from "next/router";

const NewsDetailPage = () => {
  const router = useRouter();
  const newsId = router.query.id;
  return <h1>Detail Page: {newsId}</h1>;
};

export default NewsDetailPage;
