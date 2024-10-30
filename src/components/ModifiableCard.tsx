 
import { useDroppable } from '@dnd-kit/core';

export interface IModifiableCardProps {
  id: string;
  children: JSX.Element;
}

export const ModifiableCard = ({ id, children }: IModifiableCardProps) => {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} >
      {children}
    </div>
  );
};
