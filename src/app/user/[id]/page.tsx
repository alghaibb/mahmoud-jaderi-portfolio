import UserProfilePage, {
  generateMetadata,
  generateStaticParams,
  PageProps,
} from "@/components/UserProfilePage";

export { generateMetadata, generateStaticParams };

export default function Page(props: PageProps) {
  return <UserProfilePage {...props} />;
}
