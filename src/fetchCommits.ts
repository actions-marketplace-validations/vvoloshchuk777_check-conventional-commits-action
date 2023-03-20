import axios from 'axios';
import { Commit } from './types';
import { error, getInput, info } from '@actions/core';

const fetchCommits = async (context): Promise<Commit[]> => {
  // push commits
  const commits = Array.isArray(context?.payload?.commits);
  if (commits) {
    return context.payload.commits;
  }

  // PR commits
  // Get a list of commits from the GH API:
  const commitsURL = context.payload.pull_request.commits_url;
  info(`url ${commitsURL}`);
  if (commitsURL) {
    try {
      const { data } = await axios.get(commitsURL, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${getInput('GITHUB_TOKEN')}`
        }
      });

      if (Array.isArray(data)) {
        return data.map(item => item.commit);
      }
    } catch (e) {
      error(`catch: ${e}`);

      return [];
    }
  }

  return [];
};

export default fetchCommits;
