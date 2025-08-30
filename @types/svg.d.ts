declare module '*.svg' {
  import React from 'react';

  // Экспорт по умолчанию - URL строка
  const content: string;
  export default content;

  // Named export для ReactComponent
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string}
  >;
}
