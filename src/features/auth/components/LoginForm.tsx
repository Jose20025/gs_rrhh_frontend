import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { LogInIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { LoginSchema } from '../auth.schema';
import { loginSchema } from '../auth.schema';
import { login } from '../auth.service';

export const LoginForm = () => {
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data.error || 'Ocurrió un error inesperado';

        toast.error(errorMessage);
      }
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const user = await mutateAsync(data);

    if (user) {
      loginStore(user);
      toast.success('Bienvenido al sistema');

      navigate('/', { replace: true });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
        autoComplete="off"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Ingresar al sistema</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="usuario"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel htmlFor="usuario">Usuario</FormLabel>

                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel htmlFor="password">Contraseña</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            <span>Login</span>
            <LogInIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
