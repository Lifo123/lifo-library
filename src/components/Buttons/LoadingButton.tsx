"use client";
import {
  PressEvent,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { LoaderCircleIcon } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $loading, loading } from "../Loading/Loading.Store";

type ButtomPromiseProps = {
  onPress?: (e: PressEvent) => Promise<any>;
} & RACButtonProps;

export function ButtonPromise({
  id = "global",
  isPending,
  ...props
}: ButtomPromiseProps) {
  const RECORD = useStore($loading, { keys: [id] });
  const isActuallyPending = RECORD[id] ?? isPending ?? false;

  const handlePress = async (e: PressEvent) => {
    if (props.onPress) {
      loading.start(id);
      await props.onPress(e);
      loading.end(id);
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
