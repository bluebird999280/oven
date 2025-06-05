import { atom } from "jotai";
import { ImageSourcePropType } from "react-native";

export default {
  isModal : atom(false),
  isLogin : atom(false),
  isSignupModal : atom(false),
  isSummaryLoading : atom(false),
  userId : atom(""),
  rating : atom(null),
  nickname : atom("000"),
  authWork : atom<{workId : number, poster? : ImageSourcePropType, title : string}[]>([
    {
      workId : 1,
      poster : require("@assets/img/AppleTv.png"),
      title : "AppleTv"
    },
    {
      workId : 2,
      poster : require("@assets/img/CoupangPlay.png"),
      title : "CoupangPlay"
    },
    {
      workId : 3,
      poster : require("@assets/img/Netflix.png"),
      title : "Netflix"
    }
  ]),
  lastWorkId : atom(null),
  detailMovie : atom([]),
  clickedOtt : atom(null),
  clickedWork : atom<string>(""),
  selectedWork : atom<number[]>([]),
  searchedResult : atom([]),
  }