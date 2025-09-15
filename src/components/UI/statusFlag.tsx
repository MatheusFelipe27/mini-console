interface StatusFlagProps {
  status: string;
}

const statusFlagMapperColor: Record<string, string> = {
  Deconverted: "#FECACA",
  Interested: "#FDE68A",
  Converted: "#A7F3D0",
};

const statusTextColor: Record<string, string> = {
  Deconverted: "#991B1B",
  Interested: "#92400E",
  Converted: "#065F46",
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
          {status}
        </span>
      </div>
    </>
  );
};

export default StatusFlag;
