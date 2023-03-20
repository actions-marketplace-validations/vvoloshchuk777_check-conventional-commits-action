import { context } from '@actions/github';
import fetchCommits from './fetchCommits';
import { isValidMessageExists } from './isValidaMessage';
import { info, setFailed, setOutput } from '@actions/core';

async function run() {
  info('Checking if there is a commit message that follow the Conventional Commits specification');

  const commits = await fetchCommits(context);
  if (commits.length === 0) {
    info('No commits to check');
    return;
  }

  if (!isValidMessageExists(commits)) {
    setFailed('No commit found with valid message');
  }

  setOutput('commits', commits);
  info('Success');
}

run();
