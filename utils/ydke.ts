// Copyright (C) 2020  Kevin Lu
// SPDX-License-Identifier: LGPL-3.0-or-later

import { Deck } from 'utils';
import { encode, decode } from 'js-base64';

// Note: the following conversions depend on little-endian byte order and
// is approximately equivalent to a pointer cast. This could be made
// endianness-independent in the future but there is not much demand
// considering that the x86 and ARM architectures that this code will run on
// are little-endian.
function base64ToPasscodes(base64: string): string[] {
  return decode(base64)
    .split(',')
    .filter((el) => el);
}
function base64ToContext(base64: string): string {
  return decode(base64);
}

function passcodesToBase64(passcodes: string[]): string {
  return encode(passcodes.join(','));
}

function nameToBase64(name: string): string {
  return encode(name);
}

export function parseURL(ydke: string): Deck {
  const decodeCode = decode(ydke);
  const components = decodeCode.split('!').filter((el) => el);

  if (components.length < 5) {
    throw new Error('Missing ydke URL component');
  }

  return {
    name: base64ToContext(components[0]),
    createdBy: base64ToContext(components[1]),
    main: base64ToPasscodes(components[2]),
    extra: base64ToPasscodes(components[3]),
    side: base64ToPasscodes(components[4]),
  };
}

export function toURL(deck: Deck): string {
  return encode(
    nameToBase64(deck.name) +
      '!' +
      nameToBase64(deck.createdBy) +
      '!' +
      passcodesToBase64(deck.main) +
      '!' +
      passcodesToBase64(deck.extra) +
      '!' +
      passcodesToBase64(deck.side)
  );
}
