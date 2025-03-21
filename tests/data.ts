export const failingsHands = [
  'errors from here on now',
  '2m3m4m:2m3m4m:2m3m4m:6M6M6M:XYZA*',
  '1m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2s3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2m3m4m5m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m3m3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M9M',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwew',
];

export const workingHands = [
  {
    input: '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
    expected: {
      tournament: ['(2m,3m,4m) (2m,3m,4m) (2m,3m,4m*) (6M,6M,6M) (7M,7M)'],
      leisure: [
        '(2m,3m,4m) (2m,3m,4m) (2m,3m,4m*) (6M,6M,6M) (7M,7M)',
        '(2m,2m,2m) (3m,3m,3m) (4m,4m,4m*) (6M,6M,6M) (7M,7M)',
      ],
    },
  },
  {
    input: '4m3m2m:2m3m4m:2m4m3m*:6M6M6M:7M7M',
    expected: {
      tournament: ['(2m,3m,4m) (2m,3m,4m) (2m,3m*,4m) (6M,6M,6M) (7M,7M)'],
      leisure: [
        '(2m,3m,4m) (2m,3m,4m) (2m,3m*,4m) (6M,6M,6M) (7M,7M)',
        '(2m,2m,2m) (3m,3m,3m*) (4m,4m,4m) (6M,6M,6M) (7M,7M)',
      ],
    },
  },
  {
    input: 'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwnw',
    expected: {
      tournament: ['(rd,rd,rd) (wd,wd,wd) (gd,gd,gd) (sw,sw,sw*) (nw,nw)'],
      leisure: ['(gd,gd,gd) (rd,rd,rd) (wd,wd,wd) (sw,sw,sw*) (nw,nw)'],
    },
  },
  {
    input: 'rdrdrd:1s1s1s:gdgdgd:swswsw*:nwnw',
    expected: {
      tournament: ['(rd,rd,rd) (1s,1s,1s) (gd,gd,gd) (sw,sw,sw*) (nw,nw)'],
      leisure: ['(1s,1s,1s) (gd,gd,gd) (rd,rd,rd) (sw,sw,sw*) (nw,nw)'],
    },
  },
  {
    input: '3P4P5P:5P5P5P:6P6P6P:7P7P7P*:8P8P',
    expected: {
      tournament: ['(3P,4P,5P) (5P,5P,5P) (6P,6P,6P) (7P,7P,7P*) (8P,8P)'],
      leisure: [
        '(3P,4P,5P) (5P,6P,7P) (5P,6P,7P) (5P,6P,7P*) (8P,8P)',
        '(3P,4P,5P) (5P,5P,5P) (6P,6P,6P) (7P,7P,7P*) (8P,8P)',
        '(3P,4P,5P) (5P,6P,7P) (6P,7P,8P) (6P,7P*,8P) (5P,5P)',
        //'(3P,4P,5P) (5P,6P,7P*) (6P,7P,8P) (6P,7P,8P) (5P,5P)',
      ],
    },
  },
];

export const winningHands = [
  {
    input: '2M3M4M:2P3P4P:2S3S4S*:4P5P6P:7M7M',
    expected: {
      yaku: [
        [
          {
            han: 1,
            name: 'Menzen tsumo',
            occurrences: 1,
          },
          {
            han: 1,
            name: 'Pinfu',
            occurrences: 1,
          },
          {
            han: 1,
            name: 'Tanyao',
            occurrences: 1,
          },
        ],
      ],
    },
  },
  {
    input: '2M3M4M:2M3M4M:2M3M4M*:6M6M6M:7M7M',
    expected: {
      yaku: [
        [
          {
            han: 1,
            name: 'Menzen tsumo',
            occurrences: 1,
          },
          {
            han: 1,
            name: 'Tanyao',
            occurrences: 1,
          },
        ],
      ],
    },
  },
];
