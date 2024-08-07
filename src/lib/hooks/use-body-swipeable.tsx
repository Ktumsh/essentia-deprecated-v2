import { useSwipeable, SwipeableHandlers } from "react-swipeable";

const useBodySwipeable = (
  onSwipedLeft: () => void,
  onSwipedRight: () => void
): SwipeableHandlers => {
  return useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });
};

export default useBodySwipeable;
