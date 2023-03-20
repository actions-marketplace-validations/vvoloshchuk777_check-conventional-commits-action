import { Commit } from './types';

const DEFAULT_COMMITS = ['feat', 'fix', 'docs', 'chore', 'test', 'refactor', 'perf'];

export const isValidMessage = (message: string, availableTypes = DEFAULT_COMMITS): boolean => {
  if (message.startsWith('Revert ') || message.startsWith('Merge ')) {
    return false;
  }

  // Validation.
  let [commitType] = message.split(':');
  commitType = commitType.toLowerCase();

  // remove scope.
  if (commitType.match(/\(\S*?\)/)) {
    commitType = commitType.replace(/\(\S*?\)/, '');
  }

  commitType = commitType
    .replace(/\!/g, '') // Remove breaking change notifier
    .replace(/\s/g, '') // Remove whitespaces
    .replace(/()/g, '') // Remove all whitespace
    .replace(/[^a-z]/g, ''); // Leave [a-z] characters.

  return availableTypes.includes(commitType);
};

export const isValidMessageExists = (commits: Commit[]) => {
  return commits.some(commit => isValidMessage(commit.message));
};
