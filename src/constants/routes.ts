export const ROUTES = {
  login: "/login",
  register: "/register",
  afterLogin: "/recipes",
};

export const PROTECTED_ROUTES: string[] = [ROUTES.afterLogin];
export const AUTH_ROUTES: string[] = [ROUTES.login, ROUTES.register];
