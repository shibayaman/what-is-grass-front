import { Resolver } from './resolverType';

export const getUser: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      username: 'AtamaHagetaro',
      email: 'hage@hage.com',
      password: 'ecc144',
    })
  );
};

export const newUser: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      user_id: 123,
      username: 'AtamaHagetaro',
      email: 'hage@hage.com',
      token: 'a',
    })
  );
};

export const editUser: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      username: 'AtamaHagetaro',
      email: 'hage@hage.com',
    })
  );
};

export const loginUser: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      id: 100,
      username: 'AtamaHagetaro',
      email: 'hage@hage.com',
      acces_token: '1',
    })
  );
};

export const logout: Resolver = (_, res, ctx) => {
  return res(ctx.status(204));
};

export const getLoginUser: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: 100,
      username: 'AtamaHagetaro',
      email: 'hage@hage.com',
      acces_token: '1',
    })
  );
};
