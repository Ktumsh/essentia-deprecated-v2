import Link from "next/link";
import ProfileForm from "./profile-form";
import ProfileInfo from "./profile-info";
import { Image as UIImage } from "@nextui-org/react";
import Image from "next/image";

const Dashboard = ({ session }: any) => {
  return (
    <section className="flex flex-col items-stretch grow shrink size-full">
      <div className="flex flex-col size-full bg-white dark:bg-base-dark">
        <Link
          href=""
          aria-hidden="true"
          role="link"
          className="relative flex h-72 bg-black/30 transition-colors"
        >
          <div className="overflow-hidden">
            <div className="pb-[33.333%] w-full"></div>
            <div className="absolute inset-0 size-full">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center size-full"
                style={{ backgroundImage: "url()" }}
              ></div>
              <UIImage
                removeWrapper
                as={Image}
                width={984}
                height={288}
                src=""
                alt=""
                draggable={true}
                classNames={{
                  img: "absolute inset-0 object-cover object-center size-full",
                }}
              />
            </div>
          </div>
        </Link>
        <ProfileInfo session={session} />
        <div className="h-full p-5">
          <ProfileForm />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
