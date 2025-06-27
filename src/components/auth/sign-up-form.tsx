'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { paths } from '@/paths';
import useAuthStore from '@/store/auth-store';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'sonner';


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof FormValues | 'root', string>>>({});
  const [isPending, setIsPending] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const validateForm = () => {
    if (!formData.firstName) {
      return { error: 'First name is required' };
    }

    if (!formData.lastName) {
      return { error: 'Last name is required' };
    }

    if (!formData.email) {
      return { error: 'Email is required' };
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return { error: 'Invalid email address' };
    }

    if (!formData.password || formData.password.length < 6) {
      return { error: 'Password must be at least 6 characters' };
    }

    return {};
  };


  const handleSubmit = async (e: React.FormEvent) => {
    console.log('first')
    e.preventDefault();
    const validationError = validateForm();
    if (validationError.error) {
      toast.error(validationError.error, {
        style: { border: 'none', color: 'red' },
      });
      return;
    }


    // setIsPending(true);
    // setErrors({});

    // const response = await createUser(formData);
    // setIsPending(false);

    // if (response.error) {
    //   toast.error(response.error, {
    //     style: { border: 'none', color: 'red' },
    //   });
    //   setErrors({ root: response.error });
    //   return;
    // }

    // toast.success('Account created!', {
    //   description: 'Redirecting...',
    //   style: { border: 'none', color: 'green' },
    // });


    // // update user state and route to dashboard
    // updateUser(response.user);
    // router.push(`/dashboard`);
  };


const handleTogglePassword = () => {
  setShowPassword((prev) => !prev);
};


  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2" sx={{ color: '#4F0A3E'}}>
            Sign in
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* First Name */}
          <FormControl error={Boolean(errors.firstName)}>
            <InputLabel>First name</InputLabel>
            <OutlinedInput
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <FormHelperText>{errors.firstName}</FormHelperText>}
          </FormControl>

          {/* Last Name */}
          <FormControl error={Boolean(errors.lastName)}>
            <InputLabel>Last name</InputLabel>
            <OutlinedInput
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <FormHelperText>{errors.lastName}</FormHelperText>}
          </FormControl>

          {/* Email */}
          <FormControl error={Boolean(errors.email)}>
            <InputLabel>Email address</InputLabel>
            <OutlinedInput
              name="email"
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
          </FormControl>

          {/* Password */}
          <FormControl error={Boolean(errors.password)}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
          </FormControl>


          {/* Server Error */}
          {errors.root && <Alert severity="error">{errors.root}</Alert>}

          {/* Submit */}
          <Button disabled={isPending} type="submit" variant="contained" sx={{ backgroundColor: '#4F0A3E'}}>
            {isPending ? 'Signing up...' : 'Sign up'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
