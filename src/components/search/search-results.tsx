import { useSearchParams } from "react-router-dom";
import albumsJson from "../../data/albums.json";
import AlbumList from "../album/album-list";
import { Album } from "../../types/album";

const SearchResults = () => {
  const searchParams = useSearchParams()[0];
  const search: string | null = searchParams.get("q");
  console.log(search);
  const albums: Album[] = albumsJson as never[];

  return (
    <div className="w-full h-max">
      <AlbumList albums={albums} />
    </div>
  );
};
export default SearchResults;
