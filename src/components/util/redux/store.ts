import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "../../../reducers/albums-reducer";
import activeTabReducer from "../../../reducers/tab-reducer";
import reviewsReducer from "../../../reducers/reviews-reducer";
import commentsReducer from "../../../reducers/comments-reducer";
import profileReducer from "../../../reducers/profile-reducer";
import userReducer from "../../../reducers/user-reducer";
import popularReviewsReducer from "../../../reducers/popular-reviews-reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    albums: albumsReducer,
    reviews: reviewsReducer,
    popularReviews: popularReviewsReducer,
    comments: commentsReducer,
    profile: profileReducer,
    activeTab: activeTabReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
