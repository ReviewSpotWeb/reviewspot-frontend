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

  // TODO: Handle it being your own profile pic -- should just be /user
  return <img src={avatar} alt={`${userId} Avatar`} />;
};
export default ProfilePicture;
