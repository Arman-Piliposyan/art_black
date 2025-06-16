import { Colors } from '/src/globalStyles/colors';

type NameInfoType =
  | {
      sentenceName: string;
      contextName: string;
      phaseName: string;
    }
  | undefined;

export const stringCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const nodeNameGenerator = (nameInfo: NameInfoType, name: string) => {
  if (nameInfo && nameInfo.contextName) {
    const contextName = stringCapitalize(nameInfo.contextName);
    const phaseName = stringCapitalize(nameInfo.phaseName);
    const sentenceName = stringCapitalize(nameInfo.sentenceName);
    return `${contextName} ${phaseName} ${sentenceName}`;
  }
  const nodeNameArray = name.split('_');
  const newNodeNameArray = nodeNameArray.map((name: string, _, array: string[]) => {
    if (name[0] === '@') {
      const finalName = array[0].slice(1);
      return stringCapitalize(finalName);
    }
    return stringCapitalize(name);
  });
  return newNodeNameArray.join(' ');
};

export const ScrollBarStylesGenerator = (
  height?: string,
  maxHeight?: string,
  hasOverflowX?: boolean,
  color?: string,
) => {
  return {
    '&::-webkit-scrollbar': {
      backgroundColor: color ? color + 25 : Colors.simulacrumPrimary + '25',
      borderRadius: '8px',
      opacity: '0.1',
      height: '4px',
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: color ? color + 25 : Colors.simulacrumPrimary + '25',
      borderRadius: '8px',
      opacity: '0.1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: color ? color : Colors.simulacrumPrimary,
      borderRadius: '8px',
    },
    overflow: hasOverflowX ? 'auto' : 'hidden',
    maxHeight: maxHeight ? maxHeight : null,
    height: height ? height : null,

    paddingRight: '6px',

    overflowY: 'auto',
  };
};

export const hexColorDarkGenerator = (originalColor: string) => {
  const originalR = parseInt(originalColor.slice(1, 3), 16);
  const originalG = parseInt(originalColor.slice(3, 5), 16);
  const originalB = parseInt(originalColor.slice(5, 7), 16);

  const darkR = Math.round(originalR * 0.5);
  const darkG = Math.round(originalG * 0.5);
  const darkB = Math.round(originalB * 0.5);

  const darkColorHex = '#' + ((1 << 24) | (darkR << 16) | (darkG << 8) | darkB).toString(16).slice(1);
  return darkColorHex;
};
