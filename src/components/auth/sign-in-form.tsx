'use client';

import { loginUser } from "@/apiClient/authAPI";
import useAuthStore from "@/store/auth-store";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

import { paths } from '@/paths';
import { toast } from 'sonner';

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; root?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsPending(true);
    setErrors({});

      const response = await loginUser(formData);
      setIsPending(false);


      if (response.error) {
        toast.error(response.error, {
          style: {
            border: "none",
            color: "red",
            backgroundColor: 'white'
          },
        });
      } else {
        toast.success("Login Successful", {
          description: "Taking you to dashboard",
          style: {
            border: "none",
            color: "green",
          },
        });

        // update user state and route to dashboard
        updateUser(response.user);
        router.push(`/dashboard`);
      }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Email Field */}
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

          {/* Password Field */}
          <FormControl error={Boolean(errors.password)}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                showPassword ? (
                  <EyeIcon
                    cursor="pointer"
                    fontSize="var(--icon-fontSize-md)"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeSlashIcon
                    cursor="pointer"
                    fontSize="var(--icon-fontSize-md)"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />
            {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
          </FormControl>

          {/* Forgot Password */}
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>

          {/* Server Error */}
          {errors.root && <Alert severity="error">{errors.root}</Alert>}

          {/* Submit Button */}
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
