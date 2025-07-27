import { usePageStore } from "../../store/store";

export default function Content() {
  const { selectedPage } = usePageStore();

  return <main>Content</main>;
}
