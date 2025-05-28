import { atom } from "jotai";

export default {
    isLogin : atom(false),
    nickname : atom("000"),
    userId : atom(""),
    isModal : atom(false),
    isSignupModal : atom(false),
    searchedResult : atom([]),
    authWork : atom([]),
    selectedWork : atom([]),
    detailMovie : atom([]),
    clickedOtt : atom(null),
    clickedWork : atom(null),
    rating : atom(null),
    isStared : atom(false),
    isSummaryLoading : atom(false),
    lastWorkId : atom(null),
  }
