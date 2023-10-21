import { ReactNode } from 'react';
import styled from 'styled-components';
const GlobalStyles = ({ children }: { children: ReactNode }) => {
  return <Wrapper className="GlobalStyles">{children}</Wrapper>;
};
export default GlobalStyles;

const Wrapper = styled.div`
  line-height: 1.5;
  font-weight: 400;

  --toolbar-height: 2.2rem;

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
`;
