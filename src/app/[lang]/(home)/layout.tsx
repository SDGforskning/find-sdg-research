import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Footer } from "@/components/footer";
import { baseOptions } from "@/lib/layout.shared";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <HomeLayout {...baseOptions(lang)}>
      {children}
      <Footer lang={lang} />
    </HomeLayout>
  );
}
