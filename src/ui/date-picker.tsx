import Wrapper from "./wrapper";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker as BaseProps } from "../interfaces/ModalBodyConfig";

const DatePciker: React.FC<BaseProps> = ({
  id,
  classNameGroup,
  label,
  selected,
  onChange,
  dateFormat,
}) => {
  return (
    <Wrapper id={id} classNameGroup={classNameGroup} label={label}>
      <ReactDatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
      />
    </Wrapper>
  );
};

export default DatePciker;
