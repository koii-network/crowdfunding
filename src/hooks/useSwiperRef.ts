import React from "react";

export const useSwiperRef = () => {
  const [wrapper, setWrapper] = React.useState<any>(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [wrapper, ref];
};
