export const colors = {
  backgrounds: [
    { name: "bg-primary", variable: "--color-bg-primary", hex: "#ffffff", label: "Primary Background" },
    { name: "bg-secondary", variable: "--color-bg-secondary", hex: "#f7f7f7", label: "Secondary Background" },
    { name: "bg-tertiary", variable: "--color-bg-tertiary", hex: "#f0f0f0", label: "Tertiary Background" },
    { name: "bg-card", variable: "--color-bg-card", hex: "#f2f2f2", label: "Card Background" },
  ],
  text: [
    { name: "text-primary", variable: "--color-text-primary", hex: "#111111", label: "Primary Text" },
    { name: "text-secondary", variable: "--color-text-secondary", hex: "#555555", label: "Secondary Text" },
    { name: "text-muted", variable: "--color-text-muted", hex: "#999999", label: "Muted Text" },
    { name: "text-inverse", variable: "--color-text-inverse", hex: "#ffffff", label: "Inverse Text" },
  ],
  accents: [
    { name: "accent-primary", variable: "--color-accent-primary", hex: "#2563eb", label: "Primary Accent" },
    { name: "accent-hover", variable: "--color-accent-hover", hex: "#1d4ed8", label: "Accent Hover" },
    { name: "accent-subtle", variable: "--color-accent-subtle", hex: "#eff6ff", label: "Accent Subtle" },
  ],
  state: [
    { name: "success", variable: "--color-success", hex: "#16a34a", label: "Success" },
    { name: "warning", variable: "--color-warning", hex: "#d97706", label: "Warning" },
    { name: "error", variable: "--color-error", hex: "#dc2626", label: "Error" },
    { name: "success-subtle", variable: "--color-success-subtle", hex: "#f0fdf4", label: "Success Subtle" },
    { name: "warning-subtle", variable: "--color-warning-subtle", hex: "#fffbeb", label: "Warning Subtle" },
    { name: "error-subtle", variable: "--color-error-subtle", hex: "#fef2f2", label: "Error Subtle" },
  ],
};

export const typography = [
  { name: "Display", variable: "--text-display", size: "3.5rem", px: "56px", className: "text-display" },
  { name: "H1", variable: "--text-h1", size: "2.5rem", px: "40px", className: "text-h1" },
  { name: "H2", variable: "--text-h2", size: "2rem", px: "32px", className: "text-h2" },
  { name: "H3", variable: "--text-h3", size: "1.5rem", px: "24px", className: "text-h3" },
  { name: "H4", variable: "--text-h4", size: "1.25rem", px: "20px", className: "text-h4" },
  { name: "H5", variable: "--text-h5", size: "1.125rem", px: "18px", className: "text-h5" },
  { name: "H6", variable: "--text-h6", size: "1rem", px: "16px", className: "text-h6" },
  { name: "Body", variable: "--text-body", size: "1rem", px: "16px", className: "text-body" },
  { name: "Small", variable: "--text-small", size: "0.875rem", px: "14px", className: "text-small" },
  { name: "XSmall", variable: "--text-xsmall", size: "0.75rem", px: "12px", className: "text-xsmall" },
  { name: "Caption", variable: "--text-caption", size: "0.6875rem", px: "11px", className: "text-caption" },
];

export const spacing = [
  { name: "1", value: "0.25rem", px: "4px" },
  { name: "2", value: "0.5rem", px: "8px" },
  { name: "3", value: "0.75rem", px: "12px" },
  { name: "4", value: "1rem", px: "16px" },
  { name: "5", value: "1.25rem", px: "20px" },
  { name: "6", value: "1.5rem", px: "24px" },
  { name: "8", value: "2rem", px: "32px" },
  { name: "10", value: "2.5rem", px: "40px" },
  { name: "12", value: "3rem", px: "48px" },
  { name: "16", value: "4rem", px: "64px" },
  { name: "20", value: "5rem", px: "80px" },
  { name: "24", value: "6rem", px: "96px" },
];

export const radii = [
  { name: "none", value: "0px", px: "0px", className: "rounded-none" },
  { name: "sm", value: "2px", px: "2px", className: "rounded-sm" },
  { name: "md", value: "4px", px: "4px", className: "rounded-md" },
  { name: "lg", value: "6px", px: "6px", className: "rounded-lg" },
  { name: "xl", value: "8px", px: "8px", className: "rounded-xl" },
  { name: "2xl", value: "10px", px: "10px", className: "rounded-2xl" },
  { name: "full", value: "9999px", px: "circular", className: "rounded-full" },
];
