import Form from "react-bootstrap/Form";
import { Base as BaseProps } from "../interfaces/ModalBodyConfig";

const Wrapper: React.FC<BaseProps> = ({
  id,
  classNameGroup,
  label,
  children,
}) => {
  return (
    <Form.Group data-bs-theme="dark" controlId={id} className={classNameGroup}>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

export default Wrapper;
