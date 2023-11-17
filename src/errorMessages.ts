import { JsonSchemaObject } from "./JsonSchema.js"
import { Refs } from "./Refs.js"

export type ErrorMessages<
  T extends JsonSchemaObject,
  OmitProperties extends string = "",
> = Partial<
  Omit<{ [key in keyof T]: string }, OmitProperties | "type" | "errorMessages">
>

export function addErrorMessage<
  T extends { errorMessage?: ErrorMessages<any> },
>(res: T, key: keyof T, errorMessage: string | undefined, refs: Refs) {
  if (!refs?.errorMessages) return
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage,
    }
  }
}

export function setResponseValueAndErrors<
  Json7Type extends JsonSchemaObject & {
    errorMessage?: ErrorMessages<Json7Type>
  },
  Key extends keyof Omit<Json7Type, "errorMessage">,
>(
  res: Json7Type,
  key: Key,
  value: Json7Type[Key],
  errorMessage: string | undefined,
  refs: Refs,
) {
  res[key] = value
  addErrorMessage(res, key, errorMessage, refs)
}
