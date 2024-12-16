import { useRef } from "react";
import Wrapper from "./wrapper";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { InputFile as BaseProps } from "../interfaces/ModalBodyConfig";

const InputFile: React.FC<BaseProps> = ({
  id,
  classNameGroup,
  label,
  classNameContol,
  isFileLoading,
  error,
  setError,
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Wrapper id={id} classNameGroup={classNameGroup} label={label}>
      {isFileLoading ? (
        <div className="d-flex justify-content-center">
          <PulseLoader size={8} color="#b07fe0" />
        </div>
      ) : (
        <>
          {error && <p className="text-danger mb-2">File size too large</p>}

          <Form.Control
            type="file"
            className="d-none"
            ref={fileInputRef}
            onChange={onChange}
          />

          <div
            className="d-flex position-relative form-container"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
              setError(false);
            }}
          >
            <Button className="position-absolute file-btn">Choose file</Button>

            <Form.Control
              type="text"
              readOnly
              className={classNameContol}
              value={value}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default InputFile;
