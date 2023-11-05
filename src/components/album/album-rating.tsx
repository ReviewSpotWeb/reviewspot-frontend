export type RatingInfo = {
  rating: number | null;
  icon?: JSX.Element;
  color: string;
  label: string;
};

const RatingBar = ({ ratingInfo }: { ratingInfo: RatingInfo }) => {
  const { label, icon, color, rating } = ratingInfo;

  return (
    <div
      className="flex items-center gap-3 py-1 px-3 h-full w-full rounded"
      title={`${label} - ${rating ?? "No ratings"}`}
    >
      {label !== "" && (
        <div
          className="w-1/3 font-bold truncate hidden md:inline"
          title={label}
        >
          {label}
        </div>
      )}
      {icon && (
        <div className="w-1/6 font-bold text-md flex justify-center items-center md:hidden">
          {icon}
        </div>
      )}
      {rating ? (
        <div className="w-full h-2/5">
          <div className="bg-[#222222] rounded-full h-full">
            <div
              className={`${color} h-full rounded-full`}
              style={{ width: `${rating}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="text-gray-500 font-bold w-full">No ratings</div>
      )}
    </div>
  );
};

type AlbumRatingProps = {
  ratings: RatingInfo[];
  hideNoRating?: boolean;
};

const AlbumRating = ({ ratings, hideNoRating = false }: AlbumRatingProps) => {
  return (
    <div className="rounded text-center w-full h-full flex flex-col items-center justify-around bg-[#303030] ">
      {ratings.length > 0 &&
        ratings.map((rating, idx) => {
          if (hideNoRating && rating.rating === null)
            return <div key={idx}></div>;

          return (
            <div key={idx} className="rounded h-8 w-full cursor-default">
              {/* {idx !== 0 && <hr className="border-[#222222] text-center" />} */}
              <RatingBar ratingInfo={rating} />
            </div>
          );
        })}
    </div>
  );
};
export default AlbumRating;
