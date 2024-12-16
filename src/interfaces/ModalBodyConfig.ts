import { MultiValue } from "react-select";

export interface Base {
  id: string;
  classNameGroup?: string;
  label: string;
  classNameContol?: string;
  isDatePicker?: true;
  isSelect?: true;
  isFormFile?: boolean;
  children?: React.ReactNode;
}

export interface Input extends Base {
  type: "text" | "number" | "textarea";
  as?: "textarea";
  placeholder?: string;
  value?: string | number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  rows?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export interface DatePicker extends Base {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat: string;
}

export type Option = {
  value: number;
  label: string;
};

export interface Select extends Base {
  placeholder?: string;
  value: Option[];
  onChange: (selected: MultiValue<Option>) => void;
  onMenuOpen: () => Promise<void>;
  options: Option[];
}

export interface InputFile extends Base {
  isFileLoading: boolean;
  error: boolean;
  setError: (value: boolean) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export type ModalBodyConfig = Input | DatePicker | Select | InputFile;
