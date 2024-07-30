import { Metadata } from "next";
import HandleAI from "@/components/ai/handle-ai";

export const metadata: Metadata = {
  title: "Essentia AI",
};

const AIPage = () => {
  return (
    <>
      <div className="page-bg-v2 fixed inset-0 size-full bg-cover bg-light-gradient-v2 dark:bg-none"></div>
      <HandleAI />
    </>
  );
};

export default AIPage;
