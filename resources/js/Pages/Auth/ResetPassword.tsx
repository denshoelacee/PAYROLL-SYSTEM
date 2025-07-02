import { useEffect, useState, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, router } from '@inertiajs/react';

interface ResetPasswordProps {
  employee_id: number;
  expires_at: string;
}

export default function ResetPassword({ employee_id, expires_at }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    employee_id: employee_id,
    password: '',
    password_confirmation: '',
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const expiry = new Date(expires_at).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        router.visit('/session-expired', { replace: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expires_at]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('reset-password'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <div className="text-sm text-red-600 mb-4">
        Session expires in: <strong>{formatTime(timeLeft)}</strong>
      </div>

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="employee_id" value="Employee ID" className="text-white" />
          <div className="bg-gray-300 rounded-xl">
            <TextInput
              id="employee_id"
              type="number"
              name="employee_id"
              value={data.employee_id}
              className="mt-1 block w-full bg-gray-300"
              autoComplete="username"
              disabled
            />
          </div>
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" className="text-white" />
          <div className="bg-gray-300 rounded-xl">
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full text-black bg-gray-300"
              autoComplete="new-password"
              isFocused={true}
              onChange={(e) => setData('password', e.target.value)}
            />
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />
          <div className="bg-gray-300 rounded-xl">
            <TextInput
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full bg-gray-300"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
          </div>
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
