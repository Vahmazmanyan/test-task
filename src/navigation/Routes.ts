import { Card, Cards } from "../components";

enum routes {
  main = "/",
  card = "/card/:id",
}

export const paths = [
  {
    component: Cards,
    path: routes.main,
    index: true,
  },
  {
    component: Card,
    path: routes.card,
  },
];
