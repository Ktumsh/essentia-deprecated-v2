import { Metadata } from "next";
import HandleAI from "@/components/ai/handle-ai";

export const metadata: Metadata = {
  title: "Essentia AI",
};

const AIPage = () => {
  return (
    <>
      <HandleAI />
    </>
  );
};

export default AIPage;
