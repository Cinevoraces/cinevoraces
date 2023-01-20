interface BodyData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FetchOptions extends RequestInit {
  headers: {
    [key: string]: string;
  }
}

export type { BodyData, FetchOptions };
