import { writable, derived } from "svelte/store";

export type ResumeTab = "work" | "projects" | "skills";

export const resumeRoute = (tab: ResumeTab): Route => ({ page: "resume", tab });

export interface ReviewsRoute {
  page: "reviews";
  title?: string;
  unreviewed?: boolean;
  year?: number;
  minRating?: number;
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

function parseCurrentRoute(): Route {
  const hash = location.hash;
  const params = new URLSearchParams(location.hash.split("?")[1] || "");

  if (hash === "") {
    return { page: "resume", tab: "work" };
  } else if (hash.startsWith("#/resume")) {
    const tab = (hash.split("#/resume/")[1] || "work") as ResumeTab;
    return { page: "resume", tab };
  } else if (hash === "#/sudoku") {
    return { page: "sudoku" };
  } else if (hash.startsWith("#/reviews")) {
    const title = params.get("title") || undefined;
    const unreviewed = params.get("unreviewed") === "true";
    const year = parseInt(params.get("year") || "") || undefined;
    const minRating = parseInt(params.get("minRating") || "") || undefined;
    return { page: "reviews", title, unreviewed, year, minRating };
  } else if (hash.startsWith("#/recipes")) {
    const name = params.get("name") || undefined;
    const tags = (params.get("tags") || "").split(",").filter(t => t);
    return { page: "recipes", name, tags };
  } else {
    return { page: "resume", tab: "work" };
  }
};

export function routeToString(route: Route): string {
  if (route.page === "resume") {
    return `/#/resume/${route.tab}`;
  } else if (route.page === "sudoku") {
    return "/#/sudoku";
  } else if (route.page === "reviews") {
    const params = [
      ["title", route.title],
      ["unreviewed", route.unreviewed],
      ["year", route.year],
      ["minRating", route.minRating]
    ]
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`);

    if (params.length) {
      return `/#/reviews?${params.join("&")}`;
    } else {
      return `/#/reviews`;
    }
  } else {
    const params = [
      ["name", route.name],
      [
        "tags",
        (route.tags || [])
          .filter(t => t)
          .join(",")
      ]
    ]
      .filter(([_key, value]) => value)
      .map(([key, value]) => `${key}=${value}`);

    if (params.length) {
      return `/#/recipes?${params.join("&")}`;
    } else {
      return `/#/recipes`;
    }
  }
};

const innerRoute = writable<Route>(parseCurrentRoute());

window.onpopstate = () => {
  innerRoute.set(parseCurrentRoute());
};

export const pushRoute = (r: Route) => {
  history.pushState(null, "", routeToString(r));
  innerRoute.set(r);
};

export const replaceRoute = (r: Route) => {
  history.replaceState(null, "", routeToString(r));
  innerRoute.set(r);
};

export const route = derived(innerRoute, $inner => $inner);
