const globalMetricsSchema = {
  $id: "globalMetrics",
  type: "object",
  required: [
    "seasons_count",
    "movies_count",
    "countries_count",
  ],
  properties: {
    seasons_count: { type: "number" },
    movies_count: { type: "number" },
    countries_count: { type: "number" },
  },
};

const userMetricsSchema = {
  $id: "userMetrics",
  type: "object",
  required: [
    "propositions_count",
    "comments_count",
    "likes_count",
    "watchlist_count",
    "ratings_count",
  ],
  properties: {
    propositions_count: { type: "number" },
    comments_count: { type: "number" },
    likes_count: { type: "number" },
    watchlist_count: { type: "number" },
    ratings_count: { type: "number" },
  },
};

export { globalMetricsSchema, userMetricsSchema };
