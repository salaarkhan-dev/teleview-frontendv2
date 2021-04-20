export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

// Users endpoints
export const USER_URL = API_URL + "users/";
export const USER_REGISTER_URL = USER_URL + "register/";
export const USER_LOGIN_URL = USER_URL + "login/";
export const USER_LOGOUT_URL = USER_URL + "logout/";
export const USER_EDIT_URL = "/edit/";
export const USER_DELETE_URL = "/delete/";

// Teams endpoints
export const TEAM_URL = API_URL + "teams/";
export const TEAM_CREATE_URL = TEAM_URL + "create/";
export const TEAM_EDIT_URL = "/edit/";
export const TEAM_DELETE_URL = "/delete/";
export const TEAM_JOIN_URL = "/join/";
export const TEAM_LEAVE_URL = "/leave/";
export const TEAM_CANCEL_URL = "/cancel/";
export const TEAM_OWNERS_URL = "/owners/";
export const TEAM_MEMBERS_URL = "/members/";
export const TEAM_MAKE_OWNER_URL = "/makeowner/";
export const TEAM_REMOVE_OWNER_URL = "/removeowner/";
export const TEAM_REMOVE_MEMBER_URL = "/remove/";
export const TEAM_PENDING_MEMBERS_URL = "/pendingmembers/";
export const TEAM_APPROVE_PENDING_MEMBERS_URL = "/approve/";
export const TEAM_DECLINE_PENDING_MEMBERS_URL = "/decline/";

//Channels enpoints
export const CHANNEL_URL = "/channels/";
export const CHANNEL_CREATE_URL = CHANNEL_URL + "create/";
export const CHANNEL_EDIT_URL = "/edit/";
export const CHANNEL_DELETE_URL = "/delete/";

//Posts endpoints
export const POST_URL = API_URL + "/posts/";
export const POST_CREATE_URL = POST_URL + "create/";
export const POST_EDIT_URL = "/edit/";
export const POST_DELETE_URL = "/delete/";

//Meetings endpoints
export const MEETING_URL = API_URL + "/meetings/";
export const MEETING_CREATE_URL = MEETING_URL + "create/";
export const MEETING_DELETE_URL = "/delete/";
export const MEETING_MEMBERS_URL = "/meetingmembers/";
export const MEETING_MEMBERS_REMOVE_URL = "/remove/";
export const MEETING_JOIN_URL = MEETING_MEMBERS_URL + "/join/";
export const MEETING_LEAVE_URL = MEETING_MEMBERS_URL + "/leave/";
