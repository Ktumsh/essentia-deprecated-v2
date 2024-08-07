import { Tooltip } from "@nextui-org/react";

import { SidebarIcon } from "../icons/icons";
import { tooltipStyles } from "@/styles/tooltip-styles";

interface SidebarToggleProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  toggleSidebar,
  sidebarOpen,
}) => {
  if (sidebarOpen) return null;

  return (
    <div className="fixed top-20 left-0 p-3 rounded-r-xl bg-white dark:bg-base-dark border-l-0 border border-gray-200 dark:border-white/10 origin-left slide-animation-in z-10 flex flex-row items-center justify-center">
      <Tooltip
        content="Abrir barra lateral"
        delay={800}
        closeDelay={0}
        classNames={{
          content: tooltipStyles.content,
        }}
      >
        <button
          onClick={toggleSidebar}
          className="h-10 rounded-lg px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150"
        >
          <SidebarIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default SidebarToggle;
