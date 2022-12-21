import { FunctionComponent, useRef } from "react";
import { useSlider } from "react-use";

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const VolumeSlider: FunctionComponent<VolumeSliderProps> = (props) => {
  const { value, onChange } = props;
  const volumeRef = useRef<HTMLDivElement>(null);

  useSlider(volumeRef, {
    onScrub: onChange,
  });

  return (
    <div
      ref={volumeRef}
      className="flex items-center w-20 cursor-pointer group"
    >
      <div className="relative flex w-full h-1.5">
        <div className="absolute block w-full h-full rounded-md bg-bg-l-s-i dark:bg-bg-d-s-i">
          <div
            className="absolute block h-full rounded-md bg-p opacity-70 group-hover:opacity-100"
            style={{
              width: `${value * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
