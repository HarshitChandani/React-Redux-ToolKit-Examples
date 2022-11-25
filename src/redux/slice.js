import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "users/fetchData",
  async (_, { dispatch }) => {
    const data = await axios({
      method: "GET",
      url: "http://localhost:3000/users",
    });
    if (data.status === 200) {
      const response = data.data;
      dispatch(userActions.addManyUser(response));

      const comments = response
        .map(({ id, comments }) =>
          comments.map((comment) => ({ ...comment, user_id: id }))
        )
        .flat();
      dispatch(userActions.addManyComments(comments));

      const articles = response
        .map(({ id, articles }) =>
          articles.map((article) => ({ ...article, user_id: id }))
        )
        .flat();
      dispatch(userActions.addManyArticles(articles));
    }
  }
);

const usersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const articleAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const commentAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const userSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    articles: articleAdapter.getInitialState(),
    comments: commentAdapter.getInitialState(),
  }),
  reducers: {
    addManyUser: usersAdapter.addMany,
    addManyComments: (state, { payload }) => {
      commentAdapter.addMany(state.comments, payload);
    },
    addManyArticles: (state, { payload }) => {
      articleAdapter.addMany(state.articles, payload);
    },
    //  removeUser: usersAdapter.removeOne,
  },
});

export const userActions = userSlice.actions;

export { usersAdapter, articleAdapter, commentAdapter };

export const userReducer = userSlice.reducer;
