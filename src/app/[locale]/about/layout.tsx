import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "de" ? "NextVibe - Über uns" : "NextVibe - About",
    description: `${locale === "de" ? "Über NextVibe: Erfahren Sie mehr über unsere Mission und unser Team." : "About page for NextVibe, learn more about our mission and team."}`,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        de: "/de/about",
        en: "/en/about",
        "x-default": "/de/about",
      },
    },
  };
}

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
