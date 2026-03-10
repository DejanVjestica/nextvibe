import { getArticles } from "@/service/articles";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getArticles(locale);
  console.log("articles: ", articles.data);

  return (
    <div>
      <h1>Locale main: {locale}</h1>
      <ul>
        {articles.data.map((article) => {
          console.log(article);
          return <li key={article.id}>{article.title}</li>;
        })}
        <li></li>
      </ul>
    </div>
  );
}
