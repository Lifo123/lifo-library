"use client";

import { Form as RACForm, type FormProps } from "react-aria-components/Form";
import {
  type LabelProps,
  Label as RACLabel,
} from "react-aria-components/Label";
import {
  type FieldErrorProps,
  FieldError as RACFieldError,
} from "react-aria-components/FieldError";
import { Text, type TextProps } from "react-aria-components/Text";

export function Form(props: FormProps) {
  return <RACForm {...props} />;
}

export function Label(props: LabelProps) {
  return <RACLabel {...props} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} />;
}

export function Description(props: TextProps) {
  return <Text slot="description" className="field-description" {...props} />;
}
