// components/InfiniteScrollContainer.tsx
import React from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
  isFetchingMore: boolean;
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className,
  isFetchingMore,
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView: boolean) {
      if (inView && !isFetchingMore) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
}

//ref element at the bottom, which is used to detect when the user has scrolled down to this point and needs to load more content.

// The useInView hook is used to detect when an element (in this case, the bottom of the container) is close to entering the viewport. It triggers the onBottomReached function when the element is within 200px of the viewport, allowing you to load more content. The onChange function ensures that new content is only loaded if it's not already fetching data, preventing multiple requests at once.
