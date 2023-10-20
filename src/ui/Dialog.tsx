/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styled from 'styled-components';

import { ReactNode } from 'react';

type Props = Readonly<{
  'data-test-id'?: string;
  children: ReactNode;
}>;

export function DialogButtonsList({ children }: Props): JSX.Element {
  return (
    <StyledDialogButtonsList className="DialogButtonsList">
      {children}
    </StyledDialogButtonsList>
  );
}

export function DialogActions({
  'data-test-id': dataTestId,
  children,
}: Props): JSX.Element {
  return (
    <StyledDialogActions className="DialogActions" data-test-id={dataTestId}>
      {children}
    </StyledDialogActions>
  );
}

const StyledDialogButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin-top: 20px;

  button {
    margin-bottom: 20px;
  }
`;

const StyledDialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: 20px;
`;
