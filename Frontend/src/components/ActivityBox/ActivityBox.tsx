import { Icon } from "@iconify/react/dist/iconify.js";
import "./ActivityBox.scss";
type ActivityProps = {
  total: number;
  unit: string;
  type: string;
  color: "#5A8DF0" | "#FE4646" | "#2DB67D" | "#F0CF5A";
};
const ActivityBox: React.FC<ActivityProps> = ({ color, total, unit, type }) => {
  return (
    <div className="box-container">
      <h1 style={{ color: color }}>{total}</h1>
      <p>{unit}</p>
      <p className="type-box">
        <Icon icon="lets-icons:check-ring" />
        <p>To be </p>
        {type}
      </p>
    </div>
  );
};

export default ActivityBox;
