import { useParams } from "react-router-dom";
import albumsJson from "../../data/albums.json";
import { Album } from "../../types/album";

const AlbumPage = () => {
  const { id } = useParams();

  //   TODO: Get album info from state using id
  const albums: Album[] = albumsJson as never[];
  console.log(albums);
  console.log(id);

  return <div className="">{id}</div>;
};
export default AlbumPage;
