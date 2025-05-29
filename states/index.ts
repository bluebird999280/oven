import { atom } from "jotai";

export default {
  isModal : atom(false),
  isLogin : atom(false),
  isStared : atom(false),
  isSignupModal : atom(false),
  isSummaryLoading : atom(false),
  userId : atom(""),
  rating : atom(null),
  nickname : atom("000"),
  authWork : atom<{workId : number, poster? : string, title : string}[]>([]),
  lastWorkId : atom(null),
  detailMovie : atom([]),
  clickedOtt : atom(null),
  clickedWork : atom(null),
  selectedWork : atom<number[]>([]),
  searchedResult : atom([]),
  }