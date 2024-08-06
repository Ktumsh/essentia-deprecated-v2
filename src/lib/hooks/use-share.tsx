export const useShare = () => {
  return {
    share: (text: string) => {
      return navigator.share({ text });
    },
  };
};
