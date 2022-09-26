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
