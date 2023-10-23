/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styled from 'styled-components';
import { $getNodeByKey, type LexicalEditor } from 'lexical';

import { useRef, useEffect, useState } from 'react';
import { EDITOR_PADDING_NUM } from '../utils/constants';
import { $isImageNode } from '../nodes/ImageNode';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

export default function ImageResizer({
  imageRef,
  editor,
  nodeKey,
}: {
  editor: LexicalEditor;
  buttonRef: { current: null | HTMLButtonElement };
  imageRef: { current: null | HTMLElement };
  nodeKey: string;
  setShowCaption: (show: boolean) => void;
  showCaption: boolean;
  captionsEnabled: boolean;
}): JSX.Element {
  const controlWrapperRef = useRef<HTMLDivElement>(null);
  const userSelect = useRef({
    priority: '',
    value: 'default',
  });
  const positioningRef = useRef<{
    currentHeight: number;
    currentWidth: number;
    direction: number;
    ratio: number;
    startHeight: number;
    startWidth: number;
    startX: number;
    startY: number;
  }>({
    currentHeight: 100,
    currentWidth: 100,
    direction: 0,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });
  const [percentualWidth, setPercentualWidth] = useState(0);
  const editorRootElement = editor.getRootElement();

  // Find width of the container
  const containerWidth =
    editorRootElement !== null
      ? editorRootElement.getBoundingClientRect().width - 2 * EDITOR_PADDING_NUM
      : 100;
  const containerHeight =
    editorRootElement !== null
      ? editorRootElement.getBoundingClientRect().height
      : 100;

  const minWidth = 100;
  const minHeight = 100;

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
    }
    if (document.body !== null) {
      document.body.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
      userSelect.current.value = document.body.style.getPropertyValue(
        '-webkit-user-select'
      );
      userSelect.current.priority = document.body.style.getPropertyPriority(
        '-webkit-user-select'
      );
      document.body.style.setProperty(
        '-webkit-user-select',
        `none`,
        'important'
      );
    }
  };

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'text');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty(
        '-webkit-user-select',
        userSelect.current.value,
        userSelect.current.priority
      );
    }
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: number
  ) => {
    if (!editor.isEditable()) {
      return;
    }

    const image = imageRef.current?.parentElement?.parentElement;
    const imageContainer = image?.parentElement?.parentElement;
    console.log(imageContainer);

    const controlWrapper = controlWrapperRef.current;

    if (
      image !== null &&
      image !== undefined &&
      controlWrapper !== null &&
      imageContainer !== undefined &&
      imageContainer !== null
    ) {
      event.preventDefault();
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.direction = direction;

      setStartCursor(direction);
      // onResizeStart();

      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          console.log(node.__height);
        }
      });

      controlWrapper.classList.add('image-control-wrapper--resizing');
      // image.style.height = `${height}px`;
      imageContainer.style.width = `${(100 * width) / containerWidth}%`;

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current;
    const imageContainer = imageRef.current?.parentElement?.parentElement;
    const positioning = positioningRef.current;

    const isHorizontal =
      positioning.direction & (Direction.east | Direction.west);
    const isVertical =
      positioning.direction & (Direction.south | Direction.north);

    if (
      image !== null &&
      imageContainer !== undefined &&
      imageContainer !== null
    ) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          containerWidth
        );

        const height = width / positioning.ratio;
        imageContainer.style.width = `${(100 * width) / containerWidth}%`;
        setPercentualWidth((100.0 * width) / containerWidth);
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;

        const height = clamp(
          positioning.startHeight + diff,
          minHeight,
          containerHeight
        );

        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          containerWidth
        );

        image.style.width = `${(100 * width) / containerWidth}%`;
        positioning.currentWidth = width;
      }
    }
  };

  const handlePointerUp = () => {
    const image = imageRef.current?.parentElement?.parentElement;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null) {
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;

      controlWrapper.classList.remove('image-control-wrapper--resizing');

      setEndCursor();

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };

  useEffect(() => {
    const positioning = positioningRef.current;
    const image = imageRef.current;
    if (image != null) {
      const { width } = image.getBoundingClientRect();
      positioning.currentWidth = width;
      setPercentualWidth((100.0 * width) / containerWidth);
    }
  }, [containerWidth, imageRef]);

  return (
    <Wrapper
      ref={controlWrapperRef}
      className="ImageResizer"
      style={{
        width: `${percentualWidth}%`,
      }}
    >
      {/* {!showCaption && captionsEnabled && (
        <button
          className="image-caption-button"
          ref={buttonRef}
          onClick={() => {
            setShowCaption(!showCaption);
          }}
        >
          Añadir pie de foto
        </button>
      )} */}
      <div
        className="image-resizer image-resizer-n"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north);
        }}
      />
      <div
        className="image-resizer image-resizer-ne"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-e"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-se"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-s"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south);
        }}
      />
      <div
        className="image-resizer image-resizer-sw"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-w"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-nw"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  cursor: default;
  .image-resizer {
    display: block;
    width: 7px;
    height: 7px;
    position: absolute;
    background-color: rgb(60, 132, 244);
    border: 1px solid #fff;
  }

  .image-resizer.image-resizer-n {
    top: -6px;
    left: 48%;
    cursor: n-resize;
  }

  .image-resizer.image-resizer-ne {
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  }

  .image-resizer.image-resizer-e {
    bottom: 48%;
    right: -6px;
    cursor: e-resize;
  }

  .image-resizer.image-resizer-se {
    bottom: -2px;
    right: -6px;
    cursor: nwse-resize;
  }

  .image-resizer.image-resizer-s {
    bottom: -2px;
    left: 48%;
    cursor: s-resize;
  }

  .image-resizer.image-resizer-sw {
    bottom: -2px;
    left: -6px;
    cursor: sw-resize;
  }

  .image-resizer.image-resizer-w {
    bottom: 48%;
    left: -6px;
    cursor: w-resize;
  }

  .image-resizer.image-resizer-nw {
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  }
`;
