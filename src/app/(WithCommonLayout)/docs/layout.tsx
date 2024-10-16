import Container from "@/components/Shared/Container";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
