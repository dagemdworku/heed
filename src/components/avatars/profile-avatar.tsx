import { FunctionComponent } from "react";
import { classNames } from "../../utils/class-helper";

interface ProfileAvatarProps {
  isHeader?: boolean;
}

const ProfileAvatar: FunctionComponent<ProfileAvatarProps> = (props) => {
  const { isHeader = false } = props;

  return (
    <img
      className={classNames(
        isHeader
          ? "w-8 h-8 bg-bg-l-s dark:bg-bg-d-s"
          : "flex-shrink-0 w-10 h-10 bg-bg-l-s-i dark:bg-bg-d-s-i",
        "rounded-full"
      )}
      src="https://media-exp1.licdn.com/dms/image/C4E03AQFmUlt_yh3ESw/profile-displayphoto-shrink_200_200/0/1660209127340?e=1675900800&v=beta&t=ppkQ_mC9J4TGKOIO9XhKQE80M36YH2MTVKy9hpMAz04"
      alt="Profile Image"
    />
  );
};

export default ProfileAvatar;
