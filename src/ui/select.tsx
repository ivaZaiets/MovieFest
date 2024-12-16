import Wrapper from "./wrapper";
import ReactSelect from "react-select";
import { Select as BaseProps } from "../interfaces/ModalBodyConfig";

const Select: React.FC<BaseProps> = ({
  id,
  classNameGroup,
  label,
  placeholder,
  value,
  onChange,
  onMenuOpen,
  options,
}) => {
  return (
    <Wrapper id={id} classNameGroup={classNameGroup} label={label}>
      <ReactSelect
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onMenuOpen={onMenuOpen}
        options={options}
        isMulti={true}
      />
    </Wrapper>
  );
};

export default Select;
