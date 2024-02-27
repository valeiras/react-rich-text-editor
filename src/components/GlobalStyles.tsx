import { ReactNode } from "react";
import styled from "styled-components";
import { EDITOR_PADDING_STR } from "../utils/constants";

const GlobalStyles = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper className="GlobalStyles" $editorPadding={EDITOR_PADDING_STR}>
      {children}
    </Wrapper>
  );
};
export default GlobalStyles;

const Wrapper = styled.div<{ $editorPadding: string }>`
  line-height: 1.5;
  font-weight: 400;

  --editor-padding: ${(props: { $editorPadding: string }) => props.$editorPadding};
  --toolbar-height: 2.2rem;
  --default-padding: 0.3rem;

  --transition: 0.2s ease-in-out all;
  --loading-size: 1rem;

  color-scheme: light dark;
  background-color: #fff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  border-radius: var(--border-radius);
  width: fit-content;

  iframe {
    width: 360px;
    height: 202px;
    pointer-events: none;
  }

  @media screen and (min-width: 992px) {
    iframe {
      width: 560px;
      height: 315px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  * {
    color: black;
    font-family: Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }

  .invisible-btn {
    border: none;
    background: transparent;
  }

  .content-editable {
    height: 100%;
    width: 100%;
    outline: none;
    border-radius: var(--border-radius);
    padding: var(--default-padding) var(--editor-padding);
    background-color: white;
    font-family: Arial;
  }

  .toolbar-btn-strip {
    display: flex;
    flex-direction: row;
    gap: 0.1rem;
  }

  .btn {
    padding: 1rem 0.5rem;
    border: none;
    background-color: #eee;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    transition: var(--transition);
  }

  .btn:hover {
    background-color: #ddd;
  }

  .toolbar-btn {
    border-radius: var(--border-radius);
    cursor: pointer;
    background-color: transparent;
    font-weight: 400;
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
  }
  .active-btn,
  .toolbar-btn:hover {
    background-color: var(--dark-grey);
    transition: var(--transition);
  }

  .rich-editor-select {
    border-radius: var(--border-radius);
    border: none;
    font-family: Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    background-color: transparent;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .rich-editor-select.narrow-select {
    max-width: 5rem;
  }

  .rich-editor-banner {
    background-color: red;
    color: blue;
    margin: 0.5rem;
    display: flex;
    width: fit-content;
    padding: 1rem;
    border-radius: var(--border-radius);
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-indicator {
    width: var(--loading-size);
    height: var(--loading-size);
    transition: var(--transition);

    border-radius: 50%;
    border: 2px solid var(--border-color);
    border-top-color: var(--disabled-color);
    animation: spinner 0.6s linear infinite, delayedfadein 1.5s ease-in-out;
  }
`;
