import { useState } from 'react';

interface Props {
  handleOnDropTask: () => void;
}

const TaskDropArea = ({ handleOnDropTask }: Props) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        handleOnDropTask();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`border-[3px] border-dashed border-white  w-full max-w-[274px]  flex justify-center items-center  transition-all ease-in-out  ${showDrop ? 'opacity-100 h-[160px]' : 'opacity-0 h-[38px]'} hover:h-[opacity-100]`}
    >
      <h4 className="text-gray-500">Suelta Aquí</h4>
    </div>
  );
};

export default TaskDropArea;
