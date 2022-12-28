import { FunctionComponent } from "react";
import { ButtonSize } from "../../enum/button-enum";

interface ForwardButtonProps {
  size: ButtonSize;
}

const largeButtonSize = 100;
const mediumButtonSize = 60;
const smallButtonSize = 50;

const ForwardButton: FunctionComponent<ForwardButtonProps> = (props) => {
  const { size } = props;

  switch (size) {
    case ButtonSize.Large:
      return (
        <img
          src="/forward-button.svg"
          alt="forward"
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
          src="/forward-button.svg"
          alt="forward"
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
          src="/forward-button.svg"
          alt="forward"
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

export default ForwardButton;
