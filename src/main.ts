import { context } from '@actions/github';
import * as core from '@actions/core';
import fetchCommits from './fetchCommits';
import { isValidMessageExists } from './isValidaMessage';

async function run() {
  core.info(
    'Checking if there is a commit message that follow the Conventional Commits specification'
  );

  const commits = await fetchCommits(context);
  if (commits.length === 0) {
    core.info('No commits to check');
    return;
  }

  if (!isValidMessageExists(commits)) {
    core.setFailed('No commit found with valid message');
  }

  core.setOutput('commits', commits);
  core.info('Success');
}

run();
