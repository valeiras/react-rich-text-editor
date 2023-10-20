/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styled from 'styled-components';

import { ReactNode } from 'react';

import joinClasses from '../utils/joinClasses';

export default function Button({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title,
}: {
  'data-test-id'?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  small?: boolean;
  title?: string;
}): JSX.Element {
  return (
    <StyledButton
      disabled={disabled}
      className={joinClasses(
        disabled && 'button-disabled',
        small && 'button-small',
        className
      )}
      onClick={onClick}
      title={title}
      aria-label={title}
      {...(dataTestId && { 'data-test-id': dataTestId })}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 1rem 0.5rem;
  border: none;
  background-color: #eee;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ddd;
  }

  .button-small {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
  }

  &.button-disabled {
    cursor: not-allowed;
  }

  &.button-disabled:hover {
    background-color: #eee;
  }
`;
