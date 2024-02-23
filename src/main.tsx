import r2wc from "@r2wc/react-to-web-component";

import "./styles.css";

import RichEditor from "./components/RichEditor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = ({ height, width, initialContent }: { height: string; width: string; initialContent: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RichEditor height={height} width={width} initialContent={initialContent} />
    </QueryClientProvider>
  );
};

export const WebRichEditor = r2wc(App, { props: { height: "string", width: "string", initialContent: "string" } });

window.customElements.define("rich-text-editor", WebRichEditor);
