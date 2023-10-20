/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import styled from 'styled-components';

import { FaTimes } from 'react-icons/fa';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  title: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <Wrapper className="modal-container" role="dialog">
      <div className="modal" tabIndex={-1} ref={modalRef}>
        <h2 className="modal-title">{title}</h2>
        <button
          className="modal-close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </Wrapper>
  );
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  title: string;
}): JSX.Element {
  return createPortal(
    <PortalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}
    >
      {children}
    </PortalImpl>,
    document.body
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  flex-direction: column;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(40, 40, 40, 0.6);
  flex-grow: 0px;
  flex-shrink: 1px;
  z-index: 100;
  font-family: inherit;

  .modal {
    padding: 20px;
    min-height: 100px;
    min-width: 300px;
    display: flex;
    flex-grow: 0px;
    background-color: #fff;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 20px 0 #444;
    border-radius: var(--border-radius);
  }

  .modal-title {
    color: #444;
    margin: 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .modal-close-button {
    border: 0px;
    position: absolute;
    right: 20px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #eee;
  }

  .modal-close-button:hover {
    background-color: #ddd;
  }

  .modal-content {
    padding-top: 20px;
    outline: 0;
  }
`;
