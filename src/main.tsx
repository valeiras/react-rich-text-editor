import r2wc from "@r2wc/react-to-web-component";

import "./styles.css";

import RichEditor from "./components/RichEditor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = ({ height, width }: { height: string; width: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RichEditor height={height} width={width} />
    </QueryClientProvider>
  );
};

export const WebRichEditor = r2wc(App, { props: { height: "string", width: "string" } });

window.customElements.define("rich-text-editor", WebRichEditor);
