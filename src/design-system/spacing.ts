/**
 * Spacing scale for consistent margin and padding.
 * Maps to Chakra's default scale: 1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 10=40px
 * Each value is defined only once; semantic tokens reference this scale.
 */
export const spacingScale = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
} as const;

export const spacing = {
  /** Page horizontal padding */
  page: spacingScale[6],
  /** Page top padding */
  pageVertical: spacingScale[10],
  /** Card/surface inner padding */
  card: spacingScale[10],
  /** Between form sections */
  section: spacingScale[6],
  /** Vertical stack gap (e.g. form fields) */
  stack: spacingScale[6],
  /** Vertical stack gap in cards (e.g. not-found content) */
  stackCard: spacingScale[8],
  /** Margin below a field block (label + input) */
  field: spacingScale[6],
  /** Margin below a label */
  label: spacingScale[1],
  /** Gap between icon and text (tight) */
  inline: spacingScale[2],
  /** Gap between logo and title, or small inline groups */
  inlineTight: spacingScale[3],
  /** Small vertical gap (e.g. between form footer and link) */
  footer: spacingScale[2],
} as const;
