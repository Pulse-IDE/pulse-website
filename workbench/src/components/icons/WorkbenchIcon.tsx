import type { SVGProps } from "react";

export type WorkbenchIconName =
  | "pulse"
  | "files"
  | "git"
  | "extensions"
  | "settings"
  | "terminal"
  | "folder"
  | "file"
  | "chevron";

type Props = SVGProps<SVGSVGElement> & {
  name: WorkbenchIconName;
};

function IconPaths({ name }: { name: WorkbenchIconName }) {
  switch (name) {
    case "pulse":
      return (
        <path
          d="M4 14h4l2-6 4 12 2-6h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "files":
      return (
        <>
          <path d="M14 4h6l2 2v14H6V4h4" />
          <path d="M14 4v4h4" />
        </>
      );
    case "git":
      return (
        <>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="12" r="2.5" />
          <path d="M6 8.5v7M8.5 6h5a2.5 2.5 0 0 1 2.5 2.5V15" />
        </>
      );
    case "extensions":
      return (
        <>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </>
      );
    case "settings":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </>
      );
    case "terminal":
      return (
        <>
          <path d="M4 17l5-4-5-4" />
          <path d="M12 17h8" />
        </>
      );
    case "folder":
      return <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />;
    case "file":
      return (
        <>
          <path d="M8 4h8l4 4v12H8V4z" />
          <path d="M16 4v4h4" />
        </>
      );
    case "chevron":
      return <path d="M9 6l6 6-6 6" />;
    default:
      return null;
  }
}

export function WorkbenchIcon({ name, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      <IconPaths name={name} />
    </svg>
  );
}
