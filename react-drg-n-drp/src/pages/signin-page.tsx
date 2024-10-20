import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { login } from '@/lib/requests';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const [, setCookie] = useCookies(['auth']);
  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCookie('auth', data.access_token);
      toast({
        title: 'Successfull sign in!',
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: error.name,
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <div className="h-screen flex align-center">
      <Card className="mx-auto my-auto max-w-sm lg:min-w-96">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your information to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email', { required: true })}
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register('password', {
                  required: { value: true, message: 'There has to be a password' },
                  minLength: { value: 8, message: 'Password should be at least 8 characters long' },
                })}
                id="password"
                type="password"
                name="password"
                placeholder="***********"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isPending ? <LoadingSpinner className="w-6 h-6" /> : 'Sign in'}
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with GitHub
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Do not have an account?{' '}
            <a href="/sign-up" className="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
