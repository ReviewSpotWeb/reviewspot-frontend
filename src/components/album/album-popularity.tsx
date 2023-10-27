const PopularityBar = ({
  label,
  popularity,
  color,
}: {
  label: string;
  popularity: number | null;
  color: string;
}) => {
  return (
    <div className="flex items-center gap-3 py-1 px-3">
      <div className="w-1/3 font-bold">{label}</div>
      <div className="w-2/3">
        {popularity ? (
          <div className="bg-[#222222] rounded-full">
            <div
              className={`${color} h-2.5 rounded-full`}
              style={{ width: `${popularity}%` }}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500 font-bold">No ratings</div>
        )}
      </div>
    </div>
  );
};

const AlbumPopularity = ({
  popularity,
  rating,
}: {
  popularity: number;
  rating: number | null;
}) => {
  // popularity is spotify
  // rating is reviewspot
  return (
    <div className="rounded bg-[#303030] text-center border border-transparent hover:border-blue-500">
      <PopularityBar
        label={"Spotify"}
        popularity={popularity}
        color={"bg-green-500"}
      />
      <hr className="border-[#222222] text-center" />
      <PopularityBar
        label={"ReviewSpot"}
        popularity={rating}
        color={"bg-yellow-400"}
      />
    </div>
  );
};
export default AlbumPopularity;
