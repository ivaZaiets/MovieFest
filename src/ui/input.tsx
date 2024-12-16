import Wrapper from "./wrapper";
import Form from "react-bootstrap/Form";
import { Input as BaseProps } from "../interfaces/ModalBodyConfig";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import sprite from "../../public/sprite.svg";

const Input: React.FC<BaseProps> = ({
  id,
  classNameGroup,
  classNameContol,
  type,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled,
  ...rest
}) => {
  return (
    <Wrapper id={id} classNameGroup={classNameGroup} label={label}>
      {disabled && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={id}>This feature is currently unavailable</Tooltip>
          }
        >
          <Button variant="link" className="px-2">
            <svg width="15" height="15" className="mb-1">
              <use fill="#f45656" xlinkHref={`${sprite}#error`} />
            </svg>
          </Button>
        </OverlayTrigger>
      )}

      <Form.Control
        className={classNameContol}
        type={type !== "textarea" ? type : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        {...(type === "textarea" ? { as: "textarea" } : {})}
        {...rest}
      />
    </Wrapper>
  );
};

export default Input;
