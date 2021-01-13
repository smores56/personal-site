import { writable, derived } from "svelte/store";

export type ResumeTab = "work" | "projects" | "skills";

export const resumeRoute = (tab: ResumeTab): Route => ({ page: "resume", tab });

export interface ReviewsRoute {
  page: "reviews";
  title?: string;
  unreviewed?: boolean;
  year?: number;
  reviewed?: string;
}

export interface RecipesRoute {
  page: "recipes";
  name?: string;
  tags?: string[];
}

export type Route =
  | { page: "resume"; tab: ResumeTab }
  | { page: "sudoku" }
  | ReviewsRoute
  | RecipesRoute;

export const parseRoute = (path: string, params: URLSearchParams): Route => {
  if (path === "/#/") {
    return { page: "resume", tab: "work" };
  } else if (path.startsWith("/#/resume")) {
    const tab = (path.split("/#/resume/")[1] || "work") as ResumeTab;
    return { page: "resume", tab };
  } else if (path === "/#/sudoku") {
    return { page: "sudoku" };
  } else if (path.startsWith("/#/reviews")) {
    const title = params.get("title") || undefined;
    const unreviewed = params.get("unreviewed") === "true";
    const year = parseInt(params.get("year") || "") || undefined;
    const reviewed = params.get("reviewed") || undefined;
    return { page: "reviews", title, unreviewed, year, reviewed };
  } else if (path.startsWith("/#/recipes")) {
    const name = params.get("name") || undefined;
    const tags = (params.get("tags") || "").split(",").filter(t => t);
    return { page: "recipes", name, tags };
  } else {
    return { page: "resume", tab: "work" };
  }
};

export const routeToString = (route: Route): string => {
  if (route.page === "resume") {
    return `/#/resume/${route.tab}`;
  } else if (route.page === "sudoku") {
    return "/#/sudoku";
  } else if (route.page === "reviews") {
    const params = [
      ["title", route.title],
      ["unreviewed", route.unreviewed],
      ["year", route.year],
      ["reviewed", route.reviewed]
    ]
      .filter(([_key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return `/#/reviews?${params}`;
  } else {
    const params = [
      ["name", route.name],
      [
        "tags",
        (route.tags || [])
          .filter(t => t)
          .join(",")
      ]
    ].filter(([_key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return `/#/recipes?${params}`;
  }
};

const innerRoute = writable<Route>(parseRoute("/" + location.hash, new URLSearchParams(location.search)));

export const pushRoute = (r: Route) => {
  history.pushState(null, "", routeToString(r));
  innerRoute.set(r);
};

export const replaceRoute = (r: Route) => {
  history.replaceState(null, "", routeToString(r));
  innerRoute.set(r);
};

export const route = derived(innerRoute, $inner => $inner);
