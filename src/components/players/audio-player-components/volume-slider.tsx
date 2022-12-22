import { FunctionComponent, useRef } from "react";
import { useSlider } from "react-use";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";
import { classNames } from "../../../utils/class-helper";

interface VolumeSliderProps {
  state: HTMLMediaState;
  value: number;
  onChange: (value: number) => void;
}

const VolumeSlider: FunctionComponent<VolumeSliderProps> = (props) => {
  const { state, value, onChange } = props;

  const hasAudio = !!state?.duration;

  const volumeRef = useRef<HTMLDivElement>(null);

  useSlider(volumeRef, {
    onScrub: hasAudio ? onChange : undefined,
  });

  return (
    <div
      ref={volumeRef}
      className={classNames(
        hasAudio ? "cursor-pointer" : "",
        "flex items-center w-20 group"
      )}
    >
      <div className="relative flex w-full h-1.5">
        <div className="absolute block w-full h-full rounded-md bg-bg-l-s-i dark:bg-bg-d-s-i">
          {hasAudio && (
            <div
              className="absolute block h-full rounded-md bg-p opacity-70 group-hover:opacity-100"
              style={{
                width: `${value * 100}%`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
