import SectionPage from "@/components/SectionPage";

export default function DynamicSectionPage({ params }: { params: { section: string } }) {
  return <SectionPage section={params.section} />;
}
