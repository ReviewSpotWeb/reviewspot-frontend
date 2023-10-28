import { useParams } from "react-router-dom";
import albumsJson from "../../data/albums.json";
import { Album } from "../../types/album";
import AlbumListItemMobile from "./album-item-mobile";
import AlbumListItemBrowser from "./album-item-browser";
import { Review } from "../../types/review";
import { Role, User } from "../../types/user";

const AlbumPage = () => {
  const { id } = useParams();

  const albums: Album[] = albumsJson as never[];
  const album: Album = albums.filter((album) => album.id === id)[0];

  // TODO: For testing
  const USER: User = {
    username: "eli",
    password: "password",
    role: Role.GENERAL,
    banned: false,
  };

  const USER_REVIEW: Review = {
    id: "0",
    authorInfo: {
      authorName: "eli",
      authorRole: Role.GENERAL,
    },
    albumId: id ?? "",
    content: "this is my review",
    numComments: 2,
    likedBy: [USER],
    rating: {
      rater: USER,
      albumId: id ?? "",
      rating: Math.floor(Math.random() * 101),
    },
  };
  // TODO: Render more album info when on album page?
  // TODO: smaller image size here?
  return (
    <div className="">
      <div className="rounded w-full p-2 bg-[#404040] text-gray-300 relative">
        <div className="flex flex-col gap-2">
          <div>
            <AlbumListItemMobile album={album} />
            <AlbumListItemBrowser album={album} />
          </div>
          {USER_REVIEW && (
            <div className="border">
              review list item component rendered here w/ user review
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AlbumPage;
