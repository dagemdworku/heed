import { FunctionComponent } from "react";
import { font } from "../../constants/font-constants";
import { classNames } from "../../utils/class-helper";
import { capitalize } from "../../utils/string-helper";

const sampleUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const sampleLower = "abcdefghijklmnopqrstuvwxyz";
const sampleNumber = "0123456789";

const FontPage: FunctionComponent<{}> = () => {
  return (
    <div className="w-full h-full p-8 overflow-y-auto text-fg-l dark:text-fg-d bg-bg-l dark:bg-bg-d">
      <p className="mb-4 header-4">{font.name}</p>
      <p className="body-regular max-w-[680px] mb-8">{font.description}</p>
      <p className="mb-4 header-4">Fonts</p>
      <div className="hidden w-full pb-4 mb-4 space-x-20 border-b sm:flex border-b-l dark:border-b-d">
        <p className="w-[162px] body-regular">Style Name</p>
        <p className="w-[70px] body-regular">Font Size</p>
        <p className="w-[80px] body-regular">Line Height</p>
        <p className="w-[72px] body-regular">Weight</p>
        <p className="flex-1 body-regular">Sample</p>
      </div>
      <div className="flex flex-col space-y-4">
        {font.fonts.map((font) => (
          <div
            key={font.name}
            className="flex flex-col w-full sm:space-x-20 sm:flex-row group"
          >
            <p className="sm:w-[162px] body-regular">
              <span className="pr-2 text-fg-l-s-i sm:hidden">Style Name:</span>
              {capitalize(font.name, "-")}
            </p>
            <p className="sm:w-[70px] body-regular">
              <span className="pr-2 text-fg-l-s-i sm:hidden">Font Size:</span>
              {font.size}
            </p>
            <p className="sm:w-[80px] body-regular">
              <span className="pr-2 text-fg-l-s-i sm:hidden">Line Height:</span>
              {font.height}
            </p>
            <p className="sm:w-[72px] body-regular">
              <span className="pr-2 text-fg-l-s-i sm:hidden">Weight:</span>
              {capitalize(font.weight)}
            </p>
            <div className="flex-1">
              <p className="pr-2 text-fg-l-s-i sm:hidden">Sample:</p>
              <p className={classNames(font.name, "break-all")}>
                {sampleUpper}
              </p>
              <p className={classNames(font.name, "break-all")}>
                {sampleLower}
              </p>
              <p className={classNames(font.name, "break-all")}>
                {sampleNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontPage;
