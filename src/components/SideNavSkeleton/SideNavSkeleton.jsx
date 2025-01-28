
import { motion } from "framer-motion"
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const SideNavLoading = () => {
    return (
      <motion.aside
          className={`w-64 bg-yellow-500 text-white`}
          initial={false}
          animate={{ width: "256px" }}
        >
          <div className="flex items-center justify-between p-4">
            <Link href="/" className="text-2xl font-bold">
              Ashroy
            </Link>
          </div>
          <div className="flex flex-col space-y-4 mt-8 mx-2">
            <div className="flex flex-row justify-between space-x-2 items-center">
              <Skeleton className={"rounded-full p-2 h-2 w-2"} />
              <Skeleton className={"w-full p-2 h-2"} />
            </div>
            <div className="flex flex-row justify-between space-x-2 items-center">
              <Skeleton className={"rounded-full p-2 h-2 w-2 "} />
              <Skeleton className={"w-full p-2 h-2"} />
            </div>
            <div className="flex flex-row justify-between space-x-2 items-center">
              <Skeleton className={"rounded-full p-2 h-2 w-2 "} />
              <Skeleton className={"w-full p-2 h-2"} />
            </div>
          </div>
        </motion.aside>
    );
  };

export default SideNavLoading