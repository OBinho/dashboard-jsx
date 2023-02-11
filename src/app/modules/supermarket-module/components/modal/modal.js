import React from "react";
import {
  Button,
  Divider,
  InputAdornment,
  Modal,
  TextField,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Avatar from "@mui/material/Avatar";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectContact } from "../../store/contactSlice";
import { selectCountries } from "../../store/countriesSlice";
import ContactEmailSelector from "../../contact/email-selector/ContactEmailSelector";
import PhoneNumberSelector from "../../contact/phone-number-selector/PhoneNumberSelector";
import { useTheme } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { MuiTelInput } from "mui-tel-input";
import {
  SouthAmerica,
  Sell,
  ArrowBackIos,
  Domain,
  Storefront,
  LocationOn,
  Hail,
} from "@mui/icons-material";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  region: yup.string().required("You must enter a name"),
  tags: yup.string().required("You must enter a name"),
  adminName: yup.string().required("You must enter a name"),
  job: yup.string().required("You must enter a name"),
  phone: yup.string().required("You must enter a name"),
  email: yup.string().email().required("You must enter a email"),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const regions = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
function getStyles(name, regionName, theme) {
  return {
    fontWeight:
      regionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const tags = ["Varejo", "Atacado"];
function getTagStyles(name, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CreateSupermarketModal(props) {
  const [open, setOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [stores, setStores] = useState([]);
  const handleOpen = () => setOpen(true);
  const [isFirstModal, setIsFirstModal] = useState(true);
  const [regionName, setRegionName] = React.useState([]);
  const [tagName, setTagName] = React.useState([]);
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };
  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegionName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(typeof value === "string" ? value.split(",") : value);
  };
  const contact = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  useEffect(() => {
    setOpen(props.open);
  }, [props]);


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isFirstModal ? (
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="relative flex flex-col flex-auto items-center">
                <div className="w-full">
                  <div className="flex flex-auto items-end">
                    <Controller
                      control={control}
                      name="avatar"
                      render={({ field: { onChange, value } }) => (
                        <Box
                          sx={{
                            borderWidth: 4,
                            borderStyle: "solid",
                            borderColor: "background.paper",
                          }}
                          className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div>
                              <label
                                htmlFor="button-avatar"
                                className="flex p-8 cursor-pointer"
                              >
                                <input
                                  accept="image/*"
                                  className="hidden"
                                  id="button-avatar"
                                  type="file"
                                  onChange={async (e) => {
                                    function readFileAsync() {
                                      return new Promise((resolve, reject) => {
                                        const file = e.target.files[0];
                                        if (!file) {
                                          return;
                                        }
                                        const reader = new FileReader();

                                        reader.onload = () => {
                                          resolve(
                                            `data:${file.type};base64,${btoa(
                                              reader.result
                                            )}`
                                          );
                                          contact.logo = `data:${
                                            file.type
                                          };base64,${btoa(reader.result)}`;
                                        };

                                        reader.onerror = reject;

                                        reader.readAsBinaryString(file);
                                      });
                                    }

                                    const newImage = await readFileAsync();

                                    onChange(newImage);
                                  }}
                                />
                                <FuseSvgIcon className="text-white">
                                  heroicons-outline:camera
                                </FuseSvgIcon>
                              </label>
                            </div>
                            <div>
                              <IconButton
                                onClick={() => {
                                  onChange("");
                                }}
                              >
                                <FuseSvgIcon className="text-white">
                                  heroicons-solid:trash
                                </FuseSvgIcon>
                              </IconButton>
                            </div>
                          </div>
                          <Avatar
                            sx={{
                              backgroundColor: "background.default",
                              color: "text.secondary",
                            }}
                            className="object-cover w-full h-full text-64 font-bold"
                            src={value}
                            alt={contact?.name}
                          >
                            {contact?.name.charAt(0)}
                          </Avatar>
                        </Box>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div style={{ minWidth: "80%" }}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      className="mt-32"
                      {...field}
                      label="Rede"
                      placeholder="Nome da Rede"
                      id="name"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      variant="outlined"
                      required
                      fullWidth
                      style={{ maxHeight: "50px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FuseSvgIcon size={20}>
                              heroicons-solid:office-building
                            </FuseSvgIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <div style={{ display: "flex", marginTop: 12, marginRight: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                      marginRight: 4,
                      minWidth: "50%",
                    }}
                  >
                    <Controller
                      control={control}
                      name="region"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="regions">Regiões</InputLabel>
                          <Select
                            fullWidth
                            multiple
                            value={regionName}
                            onChange={handleRegionChange}
                            style={{ maxHeight: "50px" }}
                            input={
                              <OutlinedInput
                                style={{ width: "100%" }}
                                id="region"
                                required
                                error={!!errors.region}
                                {...field}
                              />
                            }
                            renderValue={(selected) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <SouthAmerica
                                  style={{ color: "#434343", marginRight: "4" }}
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {regions.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, regionName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        // <TextField
                        //   className="mt-32"
                        //   {...field}
                        //   label="Regiões"
                        //   placeholder="Regiões"
                        //   id="region"
                        //   error={!!errors.region}
                        //   helperText={errors?.region?.message}
                        //   variant="outlined"
                        //   required
                        //   fullWidth
                        //   style={{ maxHeight: "50px" }}
                        //   InputProps={{
                        //     startAdornment: (
                        //       <InputAdornment position="start">
                        //         <FuseSvgIcon size={20}>
                        //           heroicons-solid:globe-alt
                        //         </FuseSvgIcon>
                        //       </InputAdornment>
                        //     ),
                        //   }}
                        // />
                      )}
                    />
                  </div>
                  <div style={{ marginLeft: 4, minWidth: "50%" }}>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="tags">Tags</InputLabel>
                          <Select
                            fullWidth
                            multiple
                            value={tagName}
                            onChange={handleTagChange}
                            style={{ maxHeight: "50px" }}
                            input={
                              <OutlinedInput
                                style={{ width: "100%" }}
                                id="tags"
                                required
                                error={!!errors.tags}
                                {...field}
                              />
                            }
                            renderValue={(selected) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Sell
                                  style={{ color: "#434343", marginRight: "4" }}
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {tags.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getTagStyles(name, tagName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        // <TextField
                        //   className="mt-32"
                        //   {...field}
                        //   label="Tags"
                        //   placeholder="Tags"
                        //   id="tags"
                        //   error={!!errors.tags}
                        //   helperText={errors?.tags?.message}
                        //   variant="outlined"
                        //   required
                        //   fullWidth
                        //   style={{ maxHeight: "50px" }}
                        //   InputProps={{
                        //     startAdornment: (
                        //       <InputAdornment position="start">
                        //         <FuseSvgIcon size={20}>
                        //           heroicons-solid:tag
                        //         </FuseSvgIcon>
                        //       </InputAdornment>
                        //     ),
                        //   }}
                        // />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider style={{ marginTop: 16 }} />
            <div>
              <div style={{ display: "flex", maxWidth: "100%" }}>
                <div style={{ marginRight: 4, minWidth: "65%" }}>
                  <Controller
                    control={control}
                    name="adminName"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Administrador"
                        placeholder="Nome do administrador"
                        id="adminName"
                        error={!!errors.adminName}
                        helperText={errors?.adminName?.message}
                        variant="outlined"
                        required
                        style={{ maxHeight: "50px" }}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:office-building
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ marginLeft: 4, minWidth: "35%" }}>
                  <Controller
                    control={control}
                    name="job"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Cargo"
                        placeholder="Cargo"
                        id="job"
                        error={!!errors.job}
                        helperText={errors?.job?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:briefcase
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ minWidth: "35%", marginRight: 4 }}>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <MuiTelInput
                        className="mt-32"
                        {...field}
                        label="Telefone"
                        placeholder="Telefone"
                        id="phone"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:phone
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ minWidth: "65%", marginLeft: 4 }}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Email"
                        placeholder="Email"
                        id="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:mail
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Button
                className="mx-8"
                variant="contained"
                color="secondary"
                onClick={() => {
                  let newAdmin = [...admins];
                  if (
                    !newAdmin.find(
                      (x) => x.name == adminName.value && x.emain == email.value
                    )
                  ) {
                    newAdmin.push({
                      name: adminName.value,
                      email: email.value,
                      phone: phone.value,
                      job: job.value,
                    });
                    setValue("adminName", "");
                    setValue("email", "");
                    setValue("phone", "");
                    setValue("job", "");
                  }

                  // console.log(email?.value)
                  setAdmins(newAdmin);
                }}
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                <span className="mx-8">Adicionar</span>
              </Button>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 32,
                }}
              >
                <span style={{ fontWeight: "700" }}>Administradores</span>
              </div>
              <Divider style={{ marginTop: 8 }} />
              <div
                style={{ overflow: "scroll", maxHeight: 500, marginTop: 20 }}
              >
                {admins.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "50%",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>Nome</span>
                    <span style={{ fontWeight: "600" }}>Cargo</span>
                  </div>
                ) : (
                  <></>
                )}

                {admins.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: "48%",
                        }}
                      >
                        <span
                          style={{
                            textOverflow: "ellipsis",
                            width: 300,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </span>
                        <span
                          style={{
                            textOverflow: "ellipsis",
                            width: 150,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.job}
                        </span>
                      </div>

                      <div style={{ display: "flex" }}>
                        <EditIcon
                          onClick={() => {
                            let removeAdmin = [...admins];

                            setValue("adminName", item.name);
                            setValue("email", item.email);
                            setValue("phone", item.phone);
                            setValue("job", item.job);
                            removeAdmin = removeAdmin.filter((x) => x != item);
                            setAdmins(removeAdmin);
                          }}
                          style={{ marginRight: 8 }}
                        />
                        <HighlightOffIcon
                          onClick={() => {
                            let removeAdmin = [...admins];
                            removeAdmin = removeAdmin.filter((x) => x != item);
                            setAdmins(removeAdmin);
                          }}
                          style={{ color: "FF0000" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F2F2F2",
                marginLeft: -31,
                marginRight: -31,
                marginBottom: -30,
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="mx-8"
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  <span className="mx-8">Cancelar</span>
                </Button>
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  disabled={
                    admins.length == 0 ||
                    !getValues().name ||
                    regionName.length < 1 ||
                    tagName.length < 1
                  }
                  onClick={() => {
                    setIsFirstModal(false);
                  }}
                >
                  <span className="mx-8">Avançar</span>
                </Button>
              </div>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <Button
              onClick={() => {
                setIsFirstModal(true);
              }}
            >
              <ArrowBackIos />
            </Button>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="relative flex flex-col flex-auto items-center">
                <div className="w-full">
                  <div className="flex flex-auto items-end">
                    <Controller
                      control={control}
                      name="avatar"
                      render={({ field: { onChange, value } }) => (
                        <Box
                          sx={{
                            borderWidth: 4,
                            borderStyle: "solid",
                            borderColor: "background.paper",
                          }}
                          className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div>
                              <label
                                htmlFor="button-avatar"
                                className="flex p-8 cursor-pointer"
                              >
                                <input
                                  accept="image/*"
                                  className="hidden"
                                  id="button-avatar"
                                  type="file"
                                  onChange={async (e) => {
                                    function readFileAsync() {
                                      return new Promise((resolve, reject) => {
                                        const file = e.target.files[0];
                                        if (!file) {
                                          return;
                                        }
                                        const reader = new FileReader();

                                        reader.onload = () => {
                                          resolve(
                                            `data:${file.type};base64,${btoa(
                                              reader.result
                                            )}`
                                          );
                                          contact.logo = `data:${
                                            file.type
                                          };base64,${btoa(reader.result)}`;
                                        };

                                        reader.onerror = reject;

                                        reader.readAsBinaryString(file);
                                      });
                                    }

                                    const newImage = await readFileAsync();

                                    onChange(newImage);
                                  }}
                                />
                                <FuseSvgIcon className="text-white">
                                  heroicons-outline:camera
                                </FuseSvgIcon>
                              </label>
                            </div>
                            <div>
                              <IconButton
                                onClick={() => {
                                  onChange("");
                                }}
                              >
                                <FuseSvgIcon className="text-white">
                                  heroicons-solid:trash
                                </FuseSvgIcon>
                              </IconButton>
                            </div>
                          </div>
                          <Avatar
                            sx={{
                              backgroundColor: "background.default",
                              color: "text.secondary",
                            }}
                            className="object-cover w-full h-full text-64 font-bold"
                            src={value}
                            alt={contact?.name}
                          >
                            {contact?.name.charAt(0)}
                          </Avatar>
                        </Box>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div style={{ minWidth: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "#1C1C1C",
                    fontFamily: "Roboto",
                    fontWeight: 700,
                    fontSize: 34,
                  }}
                >
                  <Domain />
                  {getValues().name}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 12,
                    marginBottom: 8,
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "#1C1C1C",
                    gap: 4,
                    marginTop: 20,
                    paddingBottom: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Roboto",
                      fontSize: 16,
                    }}
                  >
                    <SouthAmerica
                      style={{ height: 20, width: 20, marginRight: 8 }}
                    />
                    {regionName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Roboto",
                      fontSize: 16,
                    }}
                  >
                    <Sell style={{ height: 20, width: 20, marginRight: 8 }} />
                    {tagName}
                  </div>
                </div>
              </div>
            </div>
            <Divider style={{ marginTop: 16 }} />
            <div>
              {/* Dados da loja */}
              <div style={{ display: "flex", maxWidth: "100%" }}>
                <div style={{ marginRight: 4, width: "20%" }}>
                  <Controller
                    control={control}
                    name="storeCode"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Código da Loja"
                        placeholder="Código"
                        id="storeCode"
                        error={!!errors.storeCode}
                        helperText={errors?.storeCode?.message}
                        variant="outlined"
                        required
                        style={{ maxHeight: "50px" }}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Sell style={{ width: 20, height: 20 }}>
                                heroicons-solid:office-building
                              </Sell>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ marginLeft: 4, width: "80%" }}>
                  <Controller
                    control={control}
                    name="storeName"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Nome da Loja"
                        placeholder="Nome"
                        id="storeName"
                        error={!!errors.storeName}
                        helperText={errors?.storeName?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Storefront style={{ width: 20, height: 20 }}>
                                heroicons-solid:briefcase
                              </Storefront>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div style={{ display: "flex", maxWidth: "100%" }}>
                <div style={{ marginRight: 4, width: "50%" }}>
                  <Controller
                    control={control}
                    name="storeAddress"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Endereço"
                        placeholder="Endereço"
                        id="storeAddress"
                        error={!!errors.storeAddress}
                        helperText={errors?.storeAddress?.message}
                        variant="outlined"
                        required
                        style={{ maxHeight: "50px" }}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn style={{ width: 20, height: 20 }}>
                                heroicons-solid:office-building
                              </LocationOn>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ marginLeft: 4, width: "20%" }}>
                  <Controller
                    control={control}
                    name="storeBairro"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Bairro"
                        placeholder="Bairro"
                        id="storeBairro"
                        error={!!errors.storeBairro}
                        helperText={errors?.storeBairro?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                      />
                    )}
                  />
                </div>
                <div style={{ marginLeft: 4, width: "30%" }}>
                  <Controller
                    control={control}
                    name="storeCity"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Cidade"
                        placeholder="Cidade"
                        id="storeCity"
                        error={!!errors.storeCity}
                        helperText={errors?.storeCity?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                      />
                    )}
                  />
                </div>
              </div>
              {/* Dados do gerente da loja */}
              <div style={{ display: "flex", maxWidth: "100%" }}>
                <div style={{ marginRight: 4, width: "100%" }}>
                  <Controller
                    control={control}
                    name="storeManager"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Gestor"
                        placeholder="Nome do gestor"
                        id="storeManager"
                        error={!!errors.storeManager}
                        helperText={errors?.storeManager?.message}
                        variant="outlined"
                        required
                        style={{ maxHeight: "50px" }}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Hail style={{ width: 20, height: 20 }}>
                                heroicons-solid:office-building
                              </Hail>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ minWidth: "35%", marginRight: 4 }}>
                  <Controller
                    control={control}
                    name="managerPhone"
                    render={({ field }) => (
                      <MuiTelInput
                        className="mt-32"
                        {...field}
                        label="Telefone"
                        placeholder="Telefone do gestor"
                        id="managerPhone"
                        error={!!errors.storeManagerPhone}
                        helperText={errors?.storeManagerPhone?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:phone
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ minWidth: "65%", marginLeft: 4 }}>
                  <Controller
                    control={control}
                    name="managerEmail"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Email"
                        placeholder="Email do Gestor"
                        id="managerEmail"
                        error={!!errors.managerEmail}
                        helperText={errors?.managerEmail?.message}
                        variant="outlined"
                        required
                        fullWidth
                        style={{ maxHeight: "50px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:mail
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Button
                className="mx-8"
                variant="contained"
                color="secondary"
                onClick={() => {
                  let newStore = [...stores];
                  if (
                    !newStore.find(
                      (x) =>
                        x.name == storeName.value &&
                        x.managerEmail == managerEmail.value
                    )
                  ) {
                    newStore.push({
                      code: storeCode.value,
                      name: storeName.value,
                      address: storeAddress.value,
                      bairro: storeBairro.value,
                      city: storeCity.value,
                      manager: storeManager.value,
                      phone: managerPhone.value,
                      email: managerEmail.value,
                    });
                    setValue("storeCode", "");
                    setValue("storeName", "");
                    setValue("storeAddress", "");
                    setValue("storeBairro", "");
                    setValue("storeCity", "");
                    setValue("storeManager", "");
                    setValue("managerPhone", "");
                    setValue("managerEmail", "");
                  }

                  setStores(newStore);
                }}
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                <span className="mx-8">Adicionar</span>
              </Button>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 32,
                }}
              >
                <span style={{ fontWeight: "700" }}>Lojas</span>
              </div>
              <Divider style={{ marginTop: 8 }} />
              <div
                style={{ overflow: "scroll", maxHeight: 500, marginTop: 20 }}
              >
                {stores.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{item.name}</span>
                      <div style={{ display: "flex" }}>
                        <EditIcon
                          onClick={() => {
                            let removeStore = [...stores];

                            setValue("storeCode", item.code);
                            setValue("storeName", item.name);
                            setValue("storeAddress", item.address);
                            setValue("storeBairro", item.bairro);
                            setValue("storeCity", item.city);
                            setValue("storeManager", item.manager);
                            setValue("managerPhone", item.phone);
                            setValue("managerEmail", item.email);
                            removeStore = removeStore.filter((x) => x != item);
                            setStores(removeStore);
                          }}
                          style={{ marginRight: 8 }}
                        />
                        <HighlightOffIcon
                          onClick={() => {
                            let removeStore = [...stores];
                            removeStore = removeStore.filter((x) => x != item);
                            setStores(removeStore);
                          }}
                          style={{ color: "FF0000" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F2F2F2",
                marginLeft: -31,
                marginRight: -31,
                marginBottom: -30,
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="mx-8"
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  <span className="mx-8">Cancelar</span>
                </Button>
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  disabled={admins.length == 0 || !getValues().name}
                  onClick={handleClose}
                >
                  <span className="mx-8">Salvar</span>
                </Button>
              </div>
            </div>
          </Box>
        )}
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

export default CreateSupermarketModal;
