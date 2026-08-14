import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      usersService.login(email, password),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => usersService.register(email, password, name),
  });
}