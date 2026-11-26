import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Footer } from "@/components/footer";
import { HomeContainer } from "@/components/home-container";
import { baseOptions } from "@/lib/layout.shared";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <HomeLayout {...baseOptions(lang)} slots={{ container: HomeContainer }}>
      <div id="innhold" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <Footer lang={lang} />
    </HomeLayout>
  );
}
