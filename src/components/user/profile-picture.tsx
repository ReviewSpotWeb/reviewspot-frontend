import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

const ProfilePicture = ({ userId }: { userId: string }) => {
  const id = userId.toLowerCase();
  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 128,
      seed: id,
    }).toDataUriSync();
  }, [id]);

  return (
    <img
      src={avatar}
      alt={`${userId} Avatar`}
      className="h-full w-full object-fill"
    />
  );
};
export default ProfilePicture;
