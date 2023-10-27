import { createElement } from "react";
import { Link } from "react-router-dom";
import { Album, Artist } from "../../types/album";
import moment from "moment";
import {
  ChatBubbleBottomCenterTextIcon,
  MusicalNoteIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const AlbumListItem = ({ album }: { album: Album }) => {
  const albumId = album.id;
  //   const numReviews = album && album.numReviews;
  //   const avgRating = album && album.avgRating;
  const releaseDateStr: string = moment(album.release_date).format(
    "MMMM Do, YYYY"
  );
  const numReviews: number = 0;
  const rng = Math.floor(Math.random() * 101);
  const albumRating: number | null = rng <= 30 ? null : rng;

  const createArtistsString = (artists: Artist[]) => {
    let artists_str = "";
    artists.forEach((artist, idx) => {
      artists_str += artist.name;
      if (idx !== artists.length - 1) artists_str += ", ";
    });
    return artists_str;
  };

  const albumNameSize = album.name.length >= 15 ? "text-xl" : "text-2xl";

  // TODO: Abstract components
  return (
    <li className="rounded w-full p-2 bg-[#404040]">
      <Link to={`/album/${albumId}`}>
        {/* Small screens */}
        <div className="sm:hidden">
          <div className="w-full relative">
            <div className="absolute right-0">
              {createElement(InformationCircleIcon, {
                className: "w-7 text-blue-500 cursor-pointer select-none",
                title: `Released: ${releaseDateStr}`,
              })}
            </div>
            <h1 className={`text-center font-bold ${albumNameSize}`}>
              {album.name}
            </h1>
            <div className="text-center">
              {createArtistsString(album.artists)}
            </div>
          </div>
          <img
            src={album.images[0].url}
            alt={`${album.name} album cover`}
            className="object-fit h-full rounded"
          />
          <div className="flex mt-1 gap-1">
            <div className="w-1/4 whitespace-pre bg-[#303030] p-1 rounded w-3/5 flex flex-col justify-around items-center">
              <div className="flex justify-center items-center">
                {createElement(MusicalNoteIcon, {
                  className: "w-6",
                })}
                <b> {album.total_tracks}</b>
              </div>
              <div className="flex justify-center items-center">
                <b>{numReviews} </b>
                {createElement(ChatBubbleBottomCenterTextIcon, {
                  className: "w-6",
                })}
              </div>
            </div>
            <div className="w-full text-gray-300 flex flex-col">
              <div className="rounded bg-[#303030] text-center">
                <div className="flex items-center gap-3 py-1 px-3">
                  <div className="w-1/3">Spotify</div>
                  <div className="w-2/3 bg-[#222222] rounded-full">
                    <div
                      className="bg-green-400 h-2.5 rounded-full"
                      style={{ width: `${album.popularity}%` }}
                    ></div>
                  </div>
                </div>
                <hr className="border-[#222222] text-center" />
                <div className="flex items-center gap-3 py-1 px-3">
                  <div className="w-1/3">ReviewSpot</div>
                  <div className="w-2/3">
                    {albumRating ? (
                      <div className="bg-[#222222] rounded-full">
                        <div
                          className="bg-yellow-400 h-2.5 rounded-full"
                          style={{ width: `${albumRating}%` }}
                        ></div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 font-bold">
                        No ratings
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Medium and up */}
        <div className="hidden sm:flex h-full">
          <img
            src={album.images[0].url}
            alt={`${album.name} album cover`}
            className="object-fit h-48 rounded"
          />
          <div className="w-full px-3 text-gray-300 flex flex-col justify-center gap-3">
            <div>
              <div>
                <h1 className={`text-center ${albumNameSize}`}>{album.name}</h1>
                <div className="text-center">
                  {createArtistsString(album.artists)}
                </div>
                <div className="text-center text-gray-400">
                  {releaseDateStr}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex whitespace-pre justify-around bg-[#303030] p-1 rounded">
                  <div className="flex">
                    <div>
                      {createElement(MusicalNoteIcon, {
                        className: "w-6",
                      })}
                    </div>
                    <b> {album.total_tracks}</b> Tracks
                  </div>
                  <div className="flex">
                    <b>{numReviews}</b> <span> Reviews </span>
                    <div>
                      {createElement(ChatBubbleBottomCenterTextIcon, {
                        className: "w-6",
                      })}
                    </div>
                  </div>
                </div>
                <div className="rounded bg-[#303030]">
                  <div className="text-center flex items-center gap-3 py-1 px-3">
                    <div className="w-1/3">Spotify</div>
                    <div className="w-2/3 bg-[#222222] rounded-full">
                      <div
                        className="bg-green-400 h-2.5 rounded-full"
                        style={{ width: `${album.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                  <hr className="border-[#222222]" />
                  <div className="text-center flex items-center gap-3 py-1 px-3">
                    <div className="w-1/3">ReviewSpot</div>
                    <div className="w-2/3">
                      {albumRating ? (
                        <div className="bg-[#222222] rounded-full">
                          <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${albumRating}%` }}
                          ></div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 font-bold">
                          No ratings
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default AlbumListItem;
