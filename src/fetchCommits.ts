import axios from 'axios';
import { Commit } from './types';
import { info } from '@actions/core';

const fetchCommits = async (context): Promise<Commit[]> => {
  // push commits
  const commits = Array.isArray(context?.payload?.commits);
  info(`push commits: ${JSON.stringify(commits)}`);
  if (commits) {
    return context.payload.commits;
  }

  // PR commits
  // Get a list of commits from the GH API:
  const commitsURL = context.payload.pull_request.commits_url;
  info(`url: ${commitsURL}`);
  if (commitsURL) {
    try {
      const { data } = await axios.get(commitsURL);
      info(`data: ${data}`);

      if (Array.isArray(data)) {
        return data.map(item => item.commit);
      }
    } catch (e) {
      info(`catch: ${e}`);

      return [];
    }
  }

  return [];
};

export default fetchCommits;
