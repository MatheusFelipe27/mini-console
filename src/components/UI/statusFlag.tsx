interface StatusFlagProps {
  status: string;
}

const statusFlagMapperColor: Record<string, string> = {
  Low: "#FECACA",
  Medium: "#FDE68A",
  High: "#A7F3D0",
};

const statusDisplayMapper: Record<string, string> = {
  Low: "Low Chance",
  Medium: "Medium Chance",
  High: "High Chance",
};

const statusTextColor: Record<string, string> = {
  Low: "#991B1B",
  Medium: "#92400E",
  High: "#065F46",
};

const StatusFlag = ({ status }: StatusFlagProps) => {
  return (
    <>
      <div
        className={`rounded-full flex items-center py-1 justify-center w-fit px-2`}
        style={{ backgroundColor: statusFlagMapperColor[status] }}
      >
        <span
          className={`font-[600] text-[12px] bg-transparent`}
          style={{ color: statusTextColor[status] }}
        >
          {statusDisplayMapper[status]}
        </span>
      </div>
    </>
  );
};

export default StatusFlag;
