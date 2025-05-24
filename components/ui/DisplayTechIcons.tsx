import React from 'react';

type TechIconProps = {
  techStack: string[];
};

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {techStack.map((tech, index) => (
        <span
          key={index}
          className="text-sm bg-gray-800 text-white px-2 py-1 rounded"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
