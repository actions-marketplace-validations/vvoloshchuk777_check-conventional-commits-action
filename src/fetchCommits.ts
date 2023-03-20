import get from 'lodash.get';
import { request } from 'undici';
import { Commit } from './types';

const fetchCommits = async (context): Promise<Commit[]> => {
  // push commits
  const commits = Array.isArray(get(context, 'payload.commits'));
  if (commits) {
    return context.payload.commits;
  }

  // PR commits
  // Get a list of commits from the GH API:
  const commitsURL = get(context, 'payload.pull_request.commits_url');
  if (commitsURL) {
    try {
      const { body } = await request(commitsURL);

      const data = await body;

      if (Array.isArray(data)) {
        return data.map(item => item.commit);
      }
    } catch (e) {
      return [];
    }
  }

  return [];
};

export default fetchCommits;
