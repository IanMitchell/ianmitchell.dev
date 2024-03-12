import { cache } from "react";
import { getAllPosts, getPost } from "./blog-posts";

export const getCachedPostList = cache(getAllPosts);

export const getCachedPost = cache(getPost);
