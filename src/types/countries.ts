export type Country = {
  code: string;
  name: string;
};

export type CountryApiResponse = {
  isoCode: string;
  name: { text: string }[];
};
