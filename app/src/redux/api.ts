import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from 'redux/store';
import { createApi, FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { login, logout } from 'redux/slices/user';
import Cookies from 'js-cookie';

const baseQuery = retry(fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API, // For docker configuration with nginx, should be '/api'
  prepareHeaders: (headers, {getState, endpoint}) => {
    const accessToken = (getState() as RootState).user.accessToken;
    const refreshToken = Cookies.get('refreshToken');
    if (headers.get('authorization')) return headers;
    if (endpoint === 'refreshToken') headers.set('authorization', `Bearer ${refreshToken}`);
    if (accessToken && endpoint !== 'refreshToken') headers.set('authorization', `Bearer ${accessToken}`);
    return headers;
  }}), {maxRetries: 0});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args, api, extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && 'status' in result.error && result.error.status === 401) {
    // Ask for token update
    const refreshToken = Cookies.get('refreshToken');
    const refreshResult = await baseQuery({url: 'v1/refreshTokens', headers: {
      'authorization': `Bearer ${refreshToken}`
    }}, api, extraOptions);
    if (refreshResult.data) { // Store the new token if granted
      api.dispatch(login(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else { // Disconnect user if denied
      api.dispatch(logout());
    }}
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth, tagTypes: ['Movie', 'MoviesArray', 'Reviews', 'Propositions', 'Users', 'UserParams'],
  endpoints: (build) => ({
    // SESSION
    register: build.mutation<string, {[key: string]: string}>({
      query: (user) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    login: build.mutation<user, {[key: string]: string}>({
      query: (user) => ({ url: '/v1/users/login', method:'POST', body: user}),
    }),
    refreshToken: build.query<refreshToken, void>({
      query: () =>  ({url: '/v1/refreshTokens', method: 'GET'}),
      providesTags: ['UserParams']
    }),
    // GET
    getAllFilters: build.query<DBFilters[], void>({
      query: () => ({url: '/v1/metrics/filters', method: 'GET'})
    }),
    getOneMovie: build.query<DBMovie, id>({
      query: (id) => ({url: `/v1/movies/id/${id}`, method: 'GET'}),
      transformResponse: (res: DBMovie[]) => res[0],
      providesTags: ['Movie']
    }),
    getLastMovie: build.query<DBMovie, void>({
      query: () => ({url: 'v1/movies/lastmovie', method: 'GET'})
    }),
    getAllMovies: build.query<DBMovie[], string>({
      query: (query) =>  ({url: `/v1/movies/search/${query}`, method: 'GET'}),
      providesTags: ['MoviesArray']
    }),
    getUserMetrics: build.query<{[key: string]: number}[], id>({
      query: (id) => ({url: `/v1/metrics/${id}`, method: 'GET'})
    }),
    getAllUserMetrics: build.query<{[key: string]: string}, void>({
      query: () => ({url: '/v1/metrics', method: 'GET'}),
      transformResponse: (res: {[key: string]: string}[]) => res[0]
    }),
    getOneReview: build.query<DBUserReview, {userId: id, movieId: id}>({
      query: ({userId, movieId}) => ({url: `/v1/reviews/${userId}/${movieId}`, method: 'GET'}),
      transformResponse: (res: DBUserReview[]) => res[0],
      providesTags: ['Reviews']
    }),
    getAllReviews: build.query<DBReview[], id>({
      query: (id) => ({url: `/v1/reviews/${id}/comments`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    getOneUser: build.query<{[key: string]: string}, id>({
      query: (id) => ({url: `/v1/users/${id}`, method: 'GET'}),
      providesTags: ['UserParams']
    }),
    getPendingProposal: build.query<DBMovie, id>({
      query: (id) => ({url: `/v1/propositions/${id}`, method: 'GET'}),
    }),
    getHasUserProposed: build.query<{[key: string]: boolean}, number>({
      query: (id) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET'})
    }),
    getSlots: build.query<slot[], void>({
      query: () => ({url: '/v1/propositions/availableSlots', method: 'GET'})  
    }),
    // PUT
    putUser: build.mutation<string, {userId: number, user: {[key: string]: string}}>({
      query: ({user, userId}) => ({url: `v1/users/modify/${userId}`, method: 'PUT', body: user}),
      invalidatesTags: ['UserParams'] 
    }),
    putUserPic: build.mutation<void, {userId: id, formData: FormData}>({
      query: ({userId, formData}) => ({url: `v1/users/addProfilePic/${userId}`, method: 'PUT', body: formData}),
      invalidatesTags: ['UserParams'] 
    }),
    putSlot: build.mutation<string, {publishing_date: string}>({
      query: (body) => ({url: '/v1/propositions/book/', method: 'PUT', body: body})
    }),
    putInteraction: build.mutation<string, {userId: id, movieId: id, body: interactionBody}>({
      query: ({userId, movieId, body}) => ({url : `/v1/reviews/${userId}/${movieId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Movie', 'MoviesArray', 'Reviews'] 
    }),
    // POST
    postMovie: build.mutation<string, proposalBody>({
      query: (body => ({url: 'v1/movies/newmovie/', method: 'POST', body: body}))
    }), 
    postInteraction: build.mutation<string, {userId: id, movieId: id}>({
      query: ({userId, movieId}) => ({url : `/v1/reviews/${userId}/${movieId}`, method: 'POST'})   
    }),
    // ADMIN
    adminPublishMovie: build.mutation<string, {movieId: id, body: {isPublished: boolean}}>({
      query: ({movieId, body}) => ({url: `/v1/movies/publishing/${movieId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Propositions'] 
    }),
    adminRevokeMovie: build.mutation<string, {movieId: id}>({
      query: ({movieId}) => ({url : `/v1/movies/${movieId}`, method: 'DELETE'}),
      invalidatesTags: ['Propositions'] 
    }),
    adminPutSlot: build.mutation<string, {publishing_date: string}>({
      query: (body) => ({url: '/v1/propositions/unbook/', method: 'PUT', body: body})
    }),
    adminPutUser: build.mutation<string, {userId: id, body: {role: string}}>({
      query: ({userId, body}) => ({url : `/v1/users/modify/${userId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Users'] 
    }),
    adminDeleteUser: build.mutation<string, {userId: id}>({
      query: ({userId}) => ({url : `/v1/users/${userId}`, method: 'DELETE'}),
      invalidatesTags: ['Users'] 
    }),
    adminGetData: build.query<{propositions: DBMovie[], users: DBUser[]}, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const propositions = await fetchWithBQ('/v1/propositions/pendingPropositions');
        const users = await fetchWithBQ('/v1/users');
        return {data : {
          users: users.data as DBUser[],
          propositions: propositions.data as DBMovie[]
        }};
      },
      providesTags: ['Users', 'Propositions']
    }),
  })});

export const { 
  useRegisterMutation,
  useLoginMutation,
  useLazyRefreshTokenQuery,
  useGetAllFiltersQuery,
  useGetOneMovieQuery,
  useGetLastMovieQuery,
  useGetAllMoviesQuery,
  useGetUserMetricsQuery,
  useGetAllUserMetricsQuery,
  useGetOneReviewQuery,
  useGetAllReviewsQuery,
  useGetOneUserQuery,
  useGetPendingProposalQuery,
  useGetHasUserProposedQuery,
  useGetSlotsQuery,
  usePutUserMutation,
  usePutUserPicMutation,
  usePutSlotMutation,
  usePutInteractionMutation,
  usePostMovieMutation,
  usePostInteractionMutation,
  useAdminPublishMovieMutation,
  useAdminRevokeMovieMutation,
  useAdminPutSlotMutation,
  useAdminGetDataQuery,
  useAdminPutUserMutation,
  useAdminDeleteUserMutation
} = api;