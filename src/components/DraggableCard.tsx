 
import { useDraggable } from "@dnd-kit/core";

export interface IDraggableCardProps {
  id: string;
  children: JSX.Element;
}

export const DraggableCard = ({ id, children }: IDraggableCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
