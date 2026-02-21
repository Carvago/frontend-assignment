'use no memo'; // useVirtualizer returns non-memoizable refs; opt-out so compiler does not memoize this component
import {useCallback, useRef} from 'react';
import {Box} from '@chakra-ui/react';
import {useVirtualizer, type VirtualItem} from '@tanstack/react-virtual';
import {TaskRow} from './TaskRow';
import type {Task} from '../types/task';
import {spacingScale} from '../design-system/spacing';

export interface VirtualTaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  /** Height of the scrollable viewport (default 400px). */
  height?: number | string;
  /** Gap between rows in Chakra spacing units (default 3). */
  gap?: number;
}

/** Slightly above typical row height so dynamic measurement doesn't cause jumpiness. */
const ROW_HEIGHT_ESTIMATE = 80;

export function VirtualTaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  height = 400,
  gap = spacingScale[3],
}: VirtualTaskListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const gapPx = typeof gap === 'number' ? gap * 4 : 12; // Chakra scale 1 = 4px

  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT_ESTIMATE + gapPx,
    getItemKey: (index) => tasks[index]?.id ?? String(index),
    overscan: 12,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const measureElement = virtualizer.measureElement;

  return (
    <Box ref={parentRef} height={height} overflowY="auto" overflowX="hidden" borderRadius="8px">
      <Box height={virtualizer.getTotalSize()} width="100%" position="relative">
        {virtualItems.map((virtualRow) => {
          const task = tasks[virtualRow.index];
          return (
            <VirtualRow
              key={virtualRow.key}
              virtualRow={virtualRow}
              task={task}
              gap={gap}
              measureElement={measureElement}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </Box>
    </Box>
  );
}

interface VirtualRowProps {
  virtualRow: VirtualItem;
  task: Task;
  gap: number;
  measureElement: (node: Element | null) => void;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

function VirtualRow({
  virtualRow,
  task,
  gap,
  measureElement,
  onToggle,
  onDelete,
  onEdit,
}: VirtualRowProps) {
  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) measureElement(node);
    },
    [measureElement]
  );
  return (
    <Box
      ref={refCallback}
      position="absolute"
      top={0}
      left={0}
      width="100%"
      transform={`translateY(${virtualRow.start}px)`}
      paddingBottom={gap}
      data-index={virtualRow.index}
      style={{willChange: 'transform'}}
    >
      <TaskRow
        task={task}
        onToggle={() => onToggle(task)}
        onDelete={() => onDelete(task)}
        onEdit={() => onEdit(task)}
      />
    </Box>
  );
}
