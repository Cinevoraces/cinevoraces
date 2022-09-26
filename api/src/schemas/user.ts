const userSchema = {
  $id: "user",
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    pseudo: {
      type: "string",
    },
    mail: {
      type: "string",
    },
    avatar_url: {
      type: "string",
    },
    role: {
      type: "string",
    },
    created_at: {
      type: "string",
    },
    updated_at: {
      type: "string",
    },
    movies: {
      type: "array",
      items: { $ref: "movie#" },
    },
    reviews: {
      type: "array",
      items: { $ref: "review#" },
    },
    metrics: {
      type: "object",
      properties: {
        bookmarked: { type: "number" },
        viewed: { type: "number" },
        liked: { type: "number" },
        rating: { type: "number" },
        commented: { type: "number" },
      },
    },
  },
  required: [
    "id",
    "pseudo",
    "mail",
    "avatar_url",
    "role",
    "created_at",
    "updated_at",
  ],
};

export default userSchema;
