import { queryParam, ssp } from "sveltekit-search-params";

export const titleFilter = queryParam("title", ssp.string());
export const reviewedFilter = queryParam("reviewed", ssp.boolean());
export const minRatingFilter = queryParam("minRating", ssp.number());
export const yearFilter = queryParam("year", ssp.number());
export const offsetFilter = queryParam("offsetFilter", ssp.number());
