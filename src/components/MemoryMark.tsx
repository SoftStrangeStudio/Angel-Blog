export function MemoryMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? "memory-mark memory-mark--compact" : "memory-mark"}
      viewBox="0 0 240 320"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M120 304C114 241 126 186 111 126C101 85 107 45 124 14" />
      <path d="M116 204C84 191 65 169 55 136C88 144 107 163 116 204Z" />
      <path d="M118 170C149 153 166 128 171 96C141 109 123 133 118 170Z" />
      <path d="M111 126C80 115 61 92 50 59C82 68 102 90 111 126Z" />
      <path d="M117 82C144 67 158 46 162 20C137 29 121 50 117 82Z" />
      <circle cx="123" cy="16" r="7" />
    </svg>
  );
}
