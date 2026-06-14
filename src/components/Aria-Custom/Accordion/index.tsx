"use client";

import { Button } from "react-aria-components/Button";
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosureProps,
  type DisclosurePanelProps,
  type HeadingProps,
  Heading,
} from "react-aria-components/Disclosure";
import {
  DisclosureGroup as RACDisclosureGroup,
  type DisclosureGroupProps,
} from "react-aria-components/DisclosureGroup";
import { ChevronRight } from "lucide-react";

export function Accordion(props: DisclosureProps) {
  return <AriaDisclosure {...props} />;
}

export function AccordionHeader({ children, ...props }: HeadingProps) {
  return (
    <Heading {...props}>
      <Button slot="trigger" className="disclosure-button">
        <ChevronRight size={16} />
        <span>{children}</span>
      </Button>
    </Heading>
  );
}

export function AccordionPanel(props: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel {...props}>
      <div>{props.children}</div>
    </AriaDisclosurePanel>
  );
}

export function AccordionGroup(props: DisclosureGroupProps) {
  return <RACDisclosureGroup {...props} />;
}
