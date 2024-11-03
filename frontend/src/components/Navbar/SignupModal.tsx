import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignup } from '../../queries/useSignup';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

interface SignupFormInputs {
  displayName: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  displayName: yup.string().required('Display Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
  });

  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    signup(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography id="signup-modal-title" variant="h6" component="h2">
            Sign Up
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Display Name"
            type="text"
            fullWidth
            required
            margin="normal"
            {...register('displayName')}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSigningUp}
            sx={{ mt: 2 }}
          >
            {isSigningUp ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SignupModal;
