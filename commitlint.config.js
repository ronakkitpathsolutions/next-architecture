const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],

    // allow any case in subject
    'subject-case': [0],

    // allow trailing full stop in subject
    'subject-full-stop': [0],

    // increase header max length
    'header-max-length': [2, 'always', 1500],
  },
};

export default commitlintConfig;
