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
      tournament: ['(2m,3m,4m) (2m,3m,4m) (2m,3m,4m) (6M,6M,6M) (7M,7M)'],
      leisure: [
        '(2m,3m,4m) (2m,3m,4m) (2m,3m,4m) (6M,6M,6M) (7M,7M)',
        '(2m,2m,2m) (3m,3m,3m) (4m,4m,4m) (6M,6M,6M) (7M,7M)',
      ],
    },
  },
  {
    input: '4m3m2m:2m3m4m:2m4m3m*:6M6M6M:7M7M',
    expected: {
      tournament: ['(2m,3m,4m) (2m,3m,4m) (2m,3m,4m) (6M,6M,6M) (7M,7M)'],
      leisure: [
        '(2m,3m,4m) (2m,3m,4m) (2m,3m,4m) (6M,6M,6M) (7M,7M)',
        '(2m,2m,2m) (3m,3m,3m) (4m,4m,4m) (6M,6M,6M) (7M,7M)',
      ],
    },
  },
  {
    input: 'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwnw',
    expected: {
      tournament: ['(rd,rd,rd) (wd,wd,wd) (gd,gd,gd) (sw,sw,sw) (nw,nw)'],
      leisure: ['(gd,gd,gd) (rd,rd,rd) (wd,wd,wd) (sw,sw,sw) (nw,nw)'],
    },
  },
  {
    input: 'rdrdrd:1s1s1s:gdgdgd:swswsw*:nwnw',
    expected: {
      tournament: ['(rd,rd,rd) (1s,1s,1s) (gd,gd,gd) (sw,sw,sw) (nw,nw)'],
      leisure: ['(1s,1s,1s) (gd,gd,gd) (rd,rd,rd) (sw,sw,sw) (nw,nw)'],
    },
  },
];
