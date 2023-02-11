import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import PhoneNumberInput from '../phone-number-selector/PhoneNumberInput';

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  name: yup.string(),
});

const defaultValues = {
  email: '',
  name: '',
};

function EmailInput(props) {
  const { value, hideRemove } = props;

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(value);
  }, [reset, value]);

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    props.onChange(data);
  }

  return (    
    <form className="flex space-x-16 mb-16" onChange={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            className=""
            label="Nome do Administrador"
            placeholder="Nome do Administrador"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors?.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            className=""
            label="Email"
            placeholder="Email do Administrador"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {!hideRemove && (
        <IconButton onClick={props.onRemove}>
          <FuseSvgIcon size={20}>heroicons-solid:trash</FuseSvgIcon>
        </IconButton>
      )}
    </form>
  );
}

PhoneNumberInput.defaultProps = {
  hideRemove: false,
};

export default EmailInput;
