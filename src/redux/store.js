import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice";

const store = configureStore({
  reducer: {
    user_reducer: userReducer,
  },
});

// inital state of a store;
/**
 * {
    "user_reducer": {
        "ids": [],
        "entities": {},
        "articles": {
            "ids": [],
            "entities": {}
        },
        "comments": {
            "ids": [],
            "entities": {}
        }
    }
   }
 *
 */

export default store;
