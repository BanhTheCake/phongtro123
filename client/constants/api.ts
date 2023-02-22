export const BASE_URL = 'http://localhost:3003/v1/api';

// Auth
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const REFRESH_TOKEN = `${BASE_URL}/auth/refresh`;
export const CHECK_AUTH = `${BASE_URL}/auth/checkAuth`;
export const CHANGE_PASS_URL = `${BASE_URL}/auth/change-password`;

// Category
export const GET_SLUGS_URL = `${BASE_URL}/category/all-slugs`;

// Post
export const GET_ALL_POSTS_URL = `${BASE_URL}/post/all`;
export const GET_ALL_POSTS_PAGINATION_URL = `${BASE_URL}/post/all/pagination`;
export const GET_NEW_POSTS_URL = `${BASE_URL}/post/new-posts`;
export const CREATE_NEW_POST_URL = `${BASE_URL}/post/create`;
export const GET_OWNER_POSTS = `${BASE_URL}/post/owner-posts`;
export const GET_CURRENT_POST = `${BASE_URL}/post/current-post`;
export const GET_DETAILS_POST = `${BASE_URL}/post/details-post`;
export const UPDATE_CURRENT_POST = `${BASE_URL}/post/update`;
export const DELETE_POST_BY_ID = `${BASE_URL}/post/delete`;

// Price
export const GET_ALL_PRICES_URL = `${BASE_URL}/price`;

// Area
export const GET_ALL_AREAS_URL = `${BASE_URL}/area`;

// Province
export const GET_ALL_PROVINCE_URL = `${BASE_URL}/province/all`;
export const GET_TOTAL_PROVINCE_URL = `https://vapi.vnappmob.com/api/province/`;
export const GET_CURRENT_DISTRICT_URL = `https://vapi.vnappmob.com/api/province/district`;

// User
export const GET_CURRENT_USER_URL = `${BASE_URL}/user/current`;
export const UPDATE_DATA_USER = `${BASE_URL}/user/update`;
