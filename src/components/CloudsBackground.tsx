import * as React from 'react';

type Props = { opacity?: number };

const CloudsBackground: React.FC<Props> = ({ opacity = 0.35 }) => {
  return (
    <div className="clouds" style={{ opacity }} aria-hidden="true">
      <div className="clouds-1" />
      <div className="clouds-2" />
      <div className="clouds-3" />
    </div>
  );
};

export default CloudsBackground;

