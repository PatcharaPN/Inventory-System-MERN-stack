import { Icon } from "@iconify/react/dist/iconify.js";
import "./ActivityBox.scss";
import Divider from "../Divider/Divider";

type ActivityProps = {
  total: any;
  unit: string;
  type: string;
  showType?: "warning" | "success" | "info" | "error" | "incoming";
  text?: string;
  color: "#5A8DF0" | "#FE4646" | "#2DB67D" | "#F0CF5A";
};

const TYPE_STYLES: Record<string, { color: string; icon: string }> = {
  warning: { color: "#FFA361", icon: "ph:warning-bold" },
  success: { color: "#2DB67D", icon: "gg:check-o" },
  info: { color: "#5A8DF0", icon: "icon-park-outline:ad-product" },
  error: { color: "#FE4646", icon: "ri:bill-line" },
  incoming: {
    color: "#7F5AF0",
    icon: "ic:outline-upcoming",
  },
};
const ActivityBox: React.FC<ActivityProps> = ({
  color,
  total,
  unit,
  type,
  text,
  showType,
}) => {
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
