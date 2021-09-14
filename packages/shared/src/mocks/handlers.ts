import { rest } from 'msw';
import { getAnswer, getExamples, newAnswer } from './resolvers/answer';
import {
  getCategoryTags,
  getCommunityTags,
  getLanguages,
} from './resolvers/consts';
import {
  deleteFavoriteIndex,
  getFavoriteIndices,
  getIndex,
  getQuestions,
  getUserQuestions,
  newFavoriteIndex,
  newQuestion,
} from './resolvers/question';
import {
  editUser,
  getLoginUser,
  login,
  logout,
  newUser,
} from './resolvers/user';

export const handlers = [
  rest.get('/question', getQuestions),
  rest.get('/user/question-list', getUserQuestions),
  rest.get('/favorite-question', getFavoriteIndices),
  rest.get('/specific-question', getIndex),
  rest.get('/answer', getAnswer),
  rest.get('/example', getExamples),
  rest.get('/whoami', getLoginUser),
  rest.get('/categorytag', getCategoryTags),
  rest.get('/communitytag', getCommunityTags),
  rest.get('/language', getLanguages),
  rest.post('/question', newQuestion),
  rest.post('/favorite-question', newFavoriteIndex),
  rest.post('/answer', newAnswer),
  rest.post('/signup', newUser),
  rest.post('/user/edit', editUser),
  rest.post('/login', login),
  rest.post('/logout', logout),
  rest.delete('/favorite-question', deleteFavoriteIndex),
];
