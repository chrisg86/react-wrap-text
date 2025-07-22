import type { ReactNode } from 'react';

export function wrapMatchesInText(
  input: string,
  target: string,
  render: (match: string, index: number) => ReactNode
): ReactNode[] {
  if (!target) return [input];

  const parts = input.split(target);
  const result: ReactNode[] = [];

  parts.forEach((part, index) => {
    result.push(part);
    if (index < parts.length - 1) {
      result.push(render(target, index));
    }
  });

  return result;
}
