import { rest } from 'msw';
import { getAnswer, newAnswer } from './resolvers/answer';
import {
  getQuestions,
  getUserQuestions,
  newQuestion,
  getFavoriteIndices,
  newFavoriteIndex,
  getIndex,
  deleteFavoriteIndex,
} from './resolvers/question';
import {
  editUser,
  getLoginUser,
  getUser,
  login,
  logout,
  newUser,
} from './resolvers/user';

export const handlers = [
  rest.get('/user', getUser),
  rest.get('/question', getQuestions),
  rest.get('/user/question-list', getUserQuestions),
  rest.get('/favorite-question', getFavoriteIndices),
  rest.get('/spesific-question', getIndex),
  rest.get('/answer', getAnswer),
  rest.get('/whoami', getLoginUser),
  rest.post('/question', newQuestion),
  rest.post('/favorite-question', newFavoriteIndex),
  rest.post('/answer', newAnswer),
  rest.post('/signup', newUser),
  rest.post('/user/edit', editUser),
  rest.post('/login', login),
  rest.post('/logout', logout),
  rest.delete('/favorite-question', deleteFavoriteIndex),
];
