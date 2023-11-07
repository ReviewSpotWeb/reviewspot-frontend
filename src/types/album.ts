import { PaginationInfo } from "./pagination";

type ExternalURLs = { [key: string]: string };

export interface Artist {
  external_urls: ExternalURLs;
  href: string;
  id: string;
  name: string;
  type: string;
  url: string;
}

interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: Track[];
  };
  type: string;
  uri: string;
}

export type AlbumList = {
  albums: Album[];
  limit: number;
  offset: number;
  total: number;
  next: PaginationInfo | null;
  prev: PaginationInfo | null;
};
