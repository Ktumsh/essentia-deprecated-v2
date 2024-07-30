import { FC, SVGProps } from "react";

declare global {
  interface Window {
    YT: any;
  }
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface News {
  id: number;
  category?: string;
  title?: string;
  source_icon?: string;
  source_url?: string;
  creator?: string;
  pubDate?: string;
  views?: number;
  link?: string;
  image_url?: string;
}

export interface ModalData {
  id: number;
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  component?: FC;
}

export interface HealthFact {
  fact: string;
  image: string;
}
