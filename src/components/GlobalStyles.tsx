import { ReactNode } from 'react';
import styled from 'styled-components';
import { EDITOR_PADDING_STR } from '../utils/constants';

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

  --editor-padding: ${(props) => props.$editorPadding};
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
`;
