import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  set,
  update,
  setIsModalShow,
  setCustomMovie,
  removeCustomMovie,
} from "../features/watchListSlice";
import { foundMovie } from "../utils/foundMovie";
import { convertDateToDateString } from "../utils/convertDateToDateString";
import { DEFAULT_URL } from "../utils/default_url";
import {
  ModalBodyConfig,
  Option,
  Input as InputProps,
  Select as SelectProps,
  DatePicker as DatePickerProps,
  InputFile as InputFileProps,
} from "../interfaces/ModalBodyConfig";
import { MultiValue } from "react-select";
import BootstrapModal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../ui/input";
import DatePicker from "../ui/date-picker";
import Select from "../ui/select";
import InputFile from "../ui/input-file";
import "../styles/components/Modal.scss";
import sprite from "../../public/sprite.svg";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { watchList, isModalShow, customMovie } = useAppSelector(
    (state) => state.watchList
  );

  const [isFileLoading, setIsFileLoading] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsFileLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "movie_fest_upload_preset");
    data.append("cloud_name", "datk3nk0f");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/datk3nk0f/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const uploadedImageUrl = await response.json();
      dispatch(
        setCustomMovie({
          ...customMovie,
          poster_path: uploadedImageUrl.url,
          custom_file_name: file.name,
        })
      );
    } catch (err) {
      setError(true);
      dispatch(
        setCustomMovie({
          ...customMovie,
          custom_file_name: "No file chosen",
        })
      );
      console.warn("Error:", err);
    } finally {
      setIsFileLoading(false);
    }
  };

  const getGenresData = async () => {
    if (genres && genres.length !== 0) return;

    try {
      const response = await fetch(
        `${DEFAULT_URL}genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setGenres(data.genres);
    } catch (err) {
      console.warn("Error:", err);
    }
  };

  const clear = () => {
    dispatch(setIsModalShow(false));
    dispatch(removeCustomMovie());
    setError(false);
  };

  const options = genres.map((genre) => {
    return {
      value: genre.id,
      label: genre.name,
    };
  });

  const modalBodyConfig: ModalBodyConfig[] = [
    {
      id: "formFile",
      classNameGroup: "mb-3",
      label: "Upload the movie poster",
      classNameContol: "form-control--file",
      isFileLoading,
      error,
      setError,
      value: customMovie.custom_file_name || "",
      onChange: handleFileUpload,
      isFormFile: true,
    },
    {
      id: "formTitle",
      classNameGroup: "mb-3",
      label: "Add the movie title",
      type: "text",
      placeholder: "In the Wake of Love",
      value: customMovie.title || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        dispatch(setCustomMovie({ ...customMovie, title: event.target.value })),
    },
    {
      id: "formDatePicker",
      classNameGroup: "d-flex flex-column mb-3",
      label: "Add the movie release date",
      selected: customMovie.release_date
        ? new Date(customMovie.release_date)
        : null,
      onChange: (date: Date | null) => {
        if (date) {
          dispatch(
            setCustomMovie({
              ...customMovie,
              release_date: convertDateToDateString(date),
            })
          );
        }
      },
      dateFormat: "dd.MM.yyyy",
      isDatePicker: true,
    },
    {
      id: "formRaiting",
      classNameGroup: "d-flex flex-column mb-3",
      classNameContol: "form-control--num",
      label: "Add the movie rating ( 0-10 )",
      type: "number",
      min: 0,
      max: 10,
      value: String(customMovie.vote_average),
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        dispatch(
          setCustomMovie({ ...customMovie, vote_average: +event.target.value })
        ),
      onKeyDown: (event) => event.preventDefault(),
    },
    {
      id: "formSelect",
      classNameGroup: "mb-3",
      label: "Pick the movie genres",
      placeholder: "Adventure, Family, Fantasy",
      value:
        customMovie.genres?.map((genre) => {
          return {
            value: genre.id,
            label: genre.name,
          };
        }) || [],
      onChange: (selected: MultiValue<Option>) => {
        dispatch(
          setCustomMovie({
            ...customMovie,
            genres: selected.map((option) => {
              return {
                id: option.value,
                name: option.label,
              };
            }),
          })
        );
      },
      onMenuOpen: getGenresData,
      options,
      isSelect: true,
    },
    {
      id: "formOverview",
      classNameGroup: "mb-3",
      classNameContol: "form-control--textarea",
      label: "Add the movie description",
      type: "textarea",
      as: "textarea",
      placeholder:
        "A movie about life and love, taking you on a journey filled with emotions, meaningful moments...",
      rows: 6,
      value: customMovie.overview || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        dispatch(
          setCustomMovie({ ...customMovie, overview: event.target.value })
        ),
    },
    {
      id: "formDirector",
      classNameGroup: "mb-3",
      classNameContol: "form-control--textarea form-control--disabled",
      label: "Add the movie director",
      type: "text",
      placeholder: "Steven Spielberg",
      disabled: true,
    },
    {
      id: "formActors",
      classNameGroup: "mb-3",
      classNameContol: "form-control--textarea form-control--disabled",
      label: "Add the movie actors",
      type: "textarea",
      as: "textarea",
      placeholder:
        "Rebel Wilson, Timothee Chalamet, Priyanka Chopra, Jason Momoa, Liam Hemsworth",
      rows: 6,
      disabled: true,
    },
  ];

  const renderComponent = (item: ModalBodyConfig) => {
    return item.isDatePicker ? (
      <DatePicker key={item.id} {...(item as DatePickerProps)} />
    ) : item.isSelect ? (
      <Select key={item.id} {...(item as SelectProps)} />
    ) : item.isFormFile ? (
      <InputFile key={item.id} {...(item as InputFileProps)} />
    ) : (
      <Input key={item.id} {...(item as InputProps)} />
    );
  };

  return (
    <BootstrapModal
      size="lg"
      show={isModalShow}
      onHide={clear}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootstrapModal.Header className="d-flex justify-content-between">
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          Create movie
        </BootstrapModal.Title>
        <Button variant="link" className="p-0 close-btn" onClick={clear}>
          <svg width="25" height="25">
            <use stroke="white" xlinkHref={`${sprite}#close`} />
          </svg>
        </Button>
      </BootstrapModal.Header>

      <BootstrapModal.Body className="d-flex flex-column flex-sm-row gap-0 gap-sm-4">
        {[[0, 5], [5]].map((arr) => (
          <div key={arr[0]} className="d-flex flex-column w-100">
            {modalBodyConfig
              .slice(arr[0], arr[1] ? arr[1] : undefined)
              .map((item) => renderComponent(item))}
          </div>
        ))}
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        <Button
          className="px-4"
          onClick={() => {
            if (foundMovie(watchList, customMovie)) {
              dispatch(update(customMovie));
            } else {
              dispatch(
                set({
                  ...customMovie,
                  id: Date.now() + Math.floor(Math.random() * 1000),
                })
              );
            }
            clear();
          }}
        >
          Save
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
