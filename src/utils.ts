export function isPrimitive(value: unknown) {
  return (
    value == null || (typeof value !== "object" && typeof value !== "function")
  );
}
