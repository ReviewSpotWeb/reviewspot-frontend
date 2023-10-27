import moment from "moment";

export const formatReleaseDate = (releaseDate: string): string => {
  return moment(releaseDate).format("MMMM Do, YYYY");
};
