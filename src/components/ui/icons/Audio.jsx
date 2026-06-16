const AudioIcon = ({
  size = 24,
  color = "#DC0000",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 14H11L18 7V29L11 22H5.5V14Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 13C23.5 14.2 24.5 15.95 24.5 18C24.5 20.05 23.5 21.8 22 23"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 9C29 11.3 31 14.5 31 18C31 21.5 29 24.7 26 27"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default AudioIcon;
