import { Icon } from "@iconify/react/dist/iconify.js";
import "./ActivityBox.scss";
import Divider from "../Divider/Divider";

type ActivityProps = {
  total: any;
  unit: string;
  type: string;
  showType?: "warning" | "success" | "info" | "error";
  text?: string;
  color: "#5A8DF0" | "#FE4646" | "#2DB67D" | "#F0CF5A";
};

const TYPE_STYLES: Record<string, { color: string; icon: string }> = {
  warning: { color: "#FFA361", icon: "ph:warning-bold" },
  success: { color: "#2DB67D", icon: "gg:check-o" },
  info: { color: "#5A8DF0", icon: "iconamoon:info-circle-duotone" },
  error: { color: "#FE4646", icon: "iconamoon:error-circle-duotone" },
};

const ActivityBox: React.FC<ActivityProps> = ({
  color,
  total,
  unit,
  type,
  text,
  showType,
}) => {
  // Determine styles based on showType
  const { color: typeColor, icon } = showType
    ? TYPE_STYLES[showType]
    : { color, icon: "lets-icons:check-ring" };

  return (
    <div className="box-container">
      <h1 style={{ color: typeColor }}>{total}</h1>
      <p>{unit}</p>
      <div className="type-box">
        <Icon icon={icon} />
        <p>{text}</p>
        {type}
      </div>
      <div className="see-more">
        <p>View</p>
        <Icon icon="iconamoon:arrow-right-2-duotone" />
      </div>
    </div>
  );
};

export default ActivityBox;
