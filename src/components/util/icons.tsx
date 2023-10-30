import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompactDisc,
  faCircleInfo,
  faArrowRightLong,
  faArrowLeftLong,
  faMusic,
  // faCirclePlay,
  // faCirclePause,
  faComment,
  faComments,
  faHeart as faHeartSolid,
  faSquarePen,
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export const WriteOrEditReviewIcon = () => {
  return <FontAwesomeIcon icon={faSquarePen} className="w-5 h-5" />;
};

export const SearchIcon = () => {
  return <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />;
};

export const ClearSearchIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleXmark}
      className="w-5 h-5 fill-current text-gray-300 cursor-pointer hover:text-gray-100"
      onClick={() => onClick()}
    />
  );
};

export const HeartIconSolid = () => {
  return (
    <FontAwesomeIcon
      icon={faHeartSolid}
      className="w-5 h-5 fill-current text-red-500"
    />
  );
};

export const HeartIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faHeart}
      className="w-5 h-5 fill-current text-red-500"
    />
  );
};
export const SpotifyIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faSpotify}
      className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-green-500"
    />
  );
};
export const SpotifyIconSmall = () => {
  return (
    <FontAwesomeIcon
      icon={faSpotify}
      className="w-6 h-6 fill-current text-green-500"
    />
  );
};
export const AlbumIcon = () => {
  return <FontAwesomeIcon icon={faCompactDisc} className="border w-10 h-10" />;
};

export const InfoIcon = ({ title }: { title: string }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleInfo}
      title={title}
      className="w-6 h-6 text-blue-400 hover:text-blue-500 cursor-pointer select-none"
    />
  );
};

export const MusicNoteIcon = () => {
  return <FontAwesomeIcon icon={faMusic} className="w-5 h-5 text-blue-500" />;
};

export const ReviewIcon = () => {
  return <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-blue-500" />;
};

export const CommentIcon = () => {
  return (
    <FontAwesomeIcon icon={faComments} className="w-5 h-5 text-blue-500" />
  );
};

export const ArrowRightIcon = () => {
  return <FontAwesomeIcon icon={faArrowRightLong} className="" />;
};

export const ArrowLeftIcon = () => {
  return <FontAwesomeIcon icon={faArrowLeftLong} className="" />;
};
