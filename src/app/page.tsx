"use client"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/state/store";
import { fetchPosts } from "@/lib/state/features/postsSlice";
import Loading from "@/components/ui/loading";
import ErrorPage from "@/components/ui/error";
import Post from "@/components/post";
import bookFlipping from "@/lotties/book-loading.json"
import Pagination from "@/components/pagination";


const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, posts, perPage, page, totalPosts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    // Fetch posts
    dispatch(fetchPosts({ per_page: perPage, page: page }));
  }, []);

  return (
      <main className="grid gap-4">
        {/* Loading screen */}
    {status === "loading" && (
      <Loading message="Loading posts..." animationData={bookFlipping} />
    )}

{/* Error screen */}
    {status === "failed" && (
      <ErrorPage message={error as string} />
    )}

    {/* Success screen */}
          {status === "succeeded" && posts.map((post, index) => (
              <Post key={index} post={post} />
          ))}

      {/* Pagination */}
      {status === "succeeded" && totalPosts > perPage && (
        <Pagination
          currentPage={page}
          totalPosts={totalPosts}
          perPage={perPage}
        />
      )}
      </main>
  );
}

export default Home;