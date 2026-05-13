
//Props like vaul (emil) for internationalization API
export type BasePropsDrawer = {
  //Controll Height
  height?: number;

  //HTML Props
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;

  // drag?: boolean;
  // modal?: boolean;
  direction?: "top" | "bottom" | "left" | "right";

  onAnimationEnd?: () => void;

  //From react stately
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;

  //Experimental SnapPoints
  // enableSnapPoints?: boolean;
  // defaultSnapPoint?: string;
  // snapPoints?: Record<string, number>; // 0 0 1;
  // fadeFrom?: string;
}
