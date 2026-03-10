import { Locale } from "@/i18n-config";
import { getArticles } from "@/service/articles";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const articles = await getArticles(locale);

  return (
    <div className="max-w-container mx-auto ">
      <h1>Locale main: {locale}</h1>
      <ul>
        {articles.data.map((article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
        <li></li>
      </ul>
    </div>
  );
}
