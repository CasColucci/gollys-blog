export type Stage = "seedling" | "growing" | "evergreen" | "neglected";

export type Post = {
  n: number;
  title: string;
  slug: string;
  date: string;
  long: string;
  excerpt: string;
  tags: string[];
  project: string;
  stage: Stage;
  img: boolean;
};
