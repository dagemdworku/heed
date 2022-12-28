import { FunctionComponent } from "react";
import { ButtonSize } from "../../enum/button-enum";

interface PlayButtonProps {
  size: ButtonSize;
}

const largeButtonSize = 100;
const mediumButtonSize = 70;
const smallButtonSize = 50;

const PlayButton: FunctionComponent<PlayButtonProps> = (props) => {
  const { size } = props;

  switch (size) {
    case ButtonSize.Large:
      return (
        <img
          src="/play-button.svg"
          alt="play"
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
          src="/play-button.svg"
          alt="play"
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
          src="/play-button.svg"
          alt="play"
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

export default PlayButton;
