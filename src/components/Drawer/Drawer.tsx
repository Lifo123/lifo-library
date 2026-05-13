import { useStore } from "@nanostores/react";
import { BasePropsDrawer } from "./types";
import { $drawer, drawer } from "./drawer.store";
import { AnimatePresence } from "motion/react";
import { Modal, ModalOverlay } from "react-aria-components";
import { motion } from "@Utils/index";
import InnerDrawer from "./InnerDrawer";

const MotionOverlay = motion.create(ModalOverlay);

export default function Drawer({
  id,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  direction = "bottom",
  ...props
}: BasePropsDrawer) {
  if (!id) throw new Error("Id is required field");

  const RECORD = useStore($drawer, { deps: [id], keys: [id] });
  const isCurrentOpen = RECORD[id] ?? false;

  return (
    <AnimatePresence>
      {isCurrentOpen && (
        <MotionOverlay
          isOpen={true}
          onOpenChange={() => drawer.hide(id)}
          isDismissable={isDismissable}
          isKeyboardDismissDisabled={isKeyboardDismissDisabled}

          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { type: "tween", duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            pointerEvents: "none",
          }}
          className="drawer-overlay"
          style={{
            backgroundColor: "#0000004d",
          }}
        >
          <Modal>
            <InnerDrawer id={id} direction={direction} {...props} />
          </Modal>
        </MotionOverlay>
      )}
    </AnimatePresence>
  );
}
