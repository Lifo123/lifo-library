"use client";
import {
  PressEvent,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { LoaderCircleIcon } from "lucide-react";
import { useStore } from "@nanostores/react";
import { _loading, loading } from "../Loading/Loading.Store";

type ButtomPromiseProps = {
  onPress?: (e: PressEvent) => Promise<any>;
} & RACButtonProps;

export function ButtonPromise({
  id = "global",
  isPending,
  ...props
}: ButtomPromiseProps) {
  const LOADERS = useStore(_loading, { keys: [id] });
  const isActuallyPending = LOADERS[id].state ?? isPending ?? false;

  const handlePress = async (e: PressEvent) => {
    if (props.onPress) {
      loading.start(id);
      await props.onPress(e);
      loading.stop(id);
    }
  };

  return (
    <RACButton {...props} isPending={isActuallyPending} onPress={handlePress}>
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          <span className="label">{children}</span>
          {isPending && (
            <span className="track">
              <LoaderCircleIcon
                size={20}
                aria-label="Saving..."
                strokeWidth={2.3}
              />
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
