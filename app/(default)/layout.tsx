import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AosInit from "@/components/ui/aos-init";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AosInit />
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
