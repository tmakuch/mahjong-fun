import { Hand } from './hand';

const hands = [
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '4m3m2m:2m3m4m:2m4m3m*:6M6M6M:7M7M',
  '2m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M9M',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwnw',
  'rdrdrd:wdwdwd:gdgdgd:swswsw*:nwew',
  'errors from here on now',
  '2m3m4m:2m3m4m:2m3m4m:6M6M6M:XYZA*',
  '1m3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2s3m4m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '2m3m4m5m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
  '3m3m3m3m3m:2m3m4m:2m3m4m*:6M6M6M:7M7M',
];

drawTable(parseHands(hands));

function parseHands(rawHands: string[]) {
  return rawHands.map((rawHand) => {
    let tournament: string[] | string;
    let leisure: string[] | string;
    try {
      tournament = Hand.findAllWinningSets(rawHand, false).map((h) =>
        h.toString(),
      );
    } catch (e) {
      tournament = (e as Error).message ?? e;
    }
    try {
      leisure = Hand.findAllWinningSets(rawHand, true).map((h) => h.toString());
    } catch (e) {
      leisure = (e as Error).message ?? e;
    }
    return {
      Hand: rawHand,
      'Tournament count': tournament,
      'Leisure count': leisure,
    };
  });
}

function drawTable(output: Array<Record<string, string[] | string>>) {
  const columnsLengths: Record<string, number> = {};
  output.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const key = column as keyof ReturnType<typeof parseHands>[0];
      columnsLengths[key] = Math.max(
        row[key] instanceof Array
          ? Math.max(...row[key].map((_) => _.length))
          : row[key].length,
        columnsLengths[key] ?? 0,
      );
    });
  });
  let firstLine = '┌─';
  let header = '| ';
  let separator = '├─';
  let lastLine = '└─';
  const headerEntries = Object.entries(columnsLengths);
  headerEntries.forEach(([key, length]) => {
    firstLine +=
      '─'.repeat(length) +
      (headerEntries[headerEntries.length - 1][0] !== key ? '─┬─' : '─┐');
    header +=
      key.padEnd(length, ' ') +
      (headerEntries[headerEntries.length - 1][0] !== key ? ' | ' : ' |');
    separator +=
      '─'.repeat(length) +
      (headerEntries[headerEntries.length - 1][0] !== key ? '─┼─' : '─┤');
    lastLine +=
      '─'.repeat(length) +
      (headerEntries[headerEntries.length - 1][0] !== key ? '─┴─' : '─┘');
  });
  console.log(firstLine);
  console.log(header);
  console.log(separator);
  output.forEach((row, idx) => {
    const lines: Record<string, string>[] = [];
    Object.keys(row).forEach((column) => {
      const key = column as keyof ReturnType<typeof parseHands>[0];
      if (!(row[key] instanceof Array)) {
        lines[0] = lines[0] ?? {};
        lines[0][key] = row[key];
      } else {
        row[key].forEach((value, idx) => {
          lines[idx] = lines[idx] ?? {};
          lines[idx][key] = value;
        });
      }
    });
    lines.forEach((line) => {
      console.log(
        '| ' +
          headerEntries
            .map(([key, length]) => (line[key] ?? '').padEnd(length, ' '))
            .join(' | ') +
          ' |',
      );
    });
    if (idx !== output.length - 1) {
      console.log(separator);
    }
  });
  console.log(lastLine);
}
