import { FunctionComponent } from "react";
import { ButtonSize } from "../../enum/button-enum";

interface PauseButtonProps {
  size: ButtonSize;
}

const largeButtonSize = 100;
const mediumButtonSize = 70;
const smallButtonSize = 50;

const PauseButton: FunctionComponent<PauseButtonProps> = (props) => {
  const { size } = props;

  switch (size) {
    case ButtonSize.Large:
      return (
        <img
          src="/pause-button.svg"
          alt="pause"
          style={{
            width: largeButtonSize,
            height: largeButtonSize,
            minWidth: largeButtonSize,
            maxHeight: largeButtonSize,
          }}
        />
      );

    case ButtonSize.Medium:
      return (
        <img
          src="/pause-button.svg"
          alt="pause"
          style={{
            width: mediumButtonSize,
            height: mediumButtonSize,
            minWidth: mediumButtonSize,
            maxHeight: mediumButtonSize,
          }}
        />
      );
    case ButtonSize.Small:
      return (
        <img
          src="/pause-button.svg"
          alt="pause"
          style={{
            width: smallButtonSize,
            height: smallButtonSize,
            minWidth: smallButtonSize,
            maxHeight: smallButtonSize,
          }}
        />
      );
  }
};

export default PauseButton;
