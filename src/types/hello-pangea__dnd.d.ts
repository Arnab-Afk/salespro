declare module '@hello-pangea/dnd' {
  import * as React from 'react';

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: {
      draggableProps: any;
      dragHandleProps: any;
      innerRef: (element: HTMLElement | null) => void;
    }) => React.ReactNode;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: {
      droppableProps: any;
      innerRef: (element: HTMLElement | null) => void;
      placeholder: React.ReactNode;
    }) => React.ReactNode;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }

  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    };
  }

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
}
