import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { InputProps, SxProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import React, { useState } from 'react';

type Props = {
  passwordIconColor?: 'secondary' | 'primary' | 'success' | 'warning' | 'inherit' | 'default' | 'info';
  type?: 'password' | 'number' | 'text';
  size?: 'medium' | 'small';
  inputProps?: InputProps;
  defaultValue?: string;
  dataTestId?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  autofill?: boolean;
  fieldName: string;
  minRows?: number;
  maxRows?: number;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  sx?: SxProps;
};

export const TextFieldController = ({
  passwordIconColor = undefined,
  multiline = false,
  fullWidth = true,
  disabled = false,
  autofill = false,
  inputProps = {},
  size = 'small',
  type = 'text',
  minRows = 1,
  maxRows = 1,
  dataTestId,
  fieldName,
  control,
  label,
  sx,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name }, formState: { errors } }) => {
        return (
          <TextField
            InputProps={{
              ...(type === 'password'
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} color={passwordIconColor} edge="end">
                          {showPassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}),
              ...inputProps,
              inputProps: {
                ...inputProps?.inputProps,
                form: {
                  autocomplete: 'off',
                },
                autoComplete: autofill ? '' : 'one-time-code',
                min: type === 'number' ? 1 : undefined,
              },
            }}
            onChange={(e) => {
              let value = e.target.value;
              if (type === 'number') {
                if (Number(value) < 1) value = '';
              }
              onChange(value);
            }}
            onKeyDown={(e) => {
              if (type === 'number' && (e.key === '+' || e.key === '-')) {
                e.preventDefault();
              }
            }}
            helperText={errors[name] && errors[name]?.message}
            type={showPassword ? 'text' : type}
            data-test-id={dataTestId}
            error={!!errors[name]}
            fullWidth={fullWidth}
            multiline={multiline}
            value={value || ''}
            disabled={disabled}
            autoComplete="off"
            minRows={minRows}
            maxRows={maxRows}
            onBlur={onBlur}
            label={label}
            size={size}
            sx={sx}
          />
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
