import get from 'lodash.get';
import axios from 'axios';
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
      const { data } = await axios.get(commitsURL);

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
