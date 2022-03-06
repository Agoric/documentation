// @ts-check
import '@agoric/zoe/exported.js';
import { Far } from '@endo/marshal';

/** @type { <K, V>(m: Map<K, V>, k: K, d: V) => V } */
const setDefault = (m, k, d) => {
  if (m.has(k)) {
    return m.get(k);
  } else {
    m.set(k, d);
    return d;
  }
};

// ack: https://stackoverflow.com/a/568618/7963
function* genPrimes() {
  /** @type {Map<bigint, bigint[]>} */
  const divisors = new Map();
  let q = 2n;
  for (;;) {
    if (!divisors.has(q)) {
      yield q;
      divisors.set(q * q, [q]);
    } else {
      for (const p of divisors.get(q)) {
        setDefault(divisors, p + q, []).push(p);
      }
    }
    q += 1n;
  }
}

/**
 * Pay increasing Award points to those who provide successive primes.
 *
 * @param { ContractFacet } zcf
 */
const start = async zcf => {
  const points = await zcf.makeZCFMint('Award');
  const { brand } = points.getIssuerRecord();
  let value = 1n; // to start

  const primes = genPrimes();
  let step = primes.next();

  /** @type { OfferHandler } */
  const play = (seat, { guess }) => {
    if (guess === step.value) {
      points.mintGains(harden({ Award: { brand, value } }), seat);
      seat.exit();
      step = primes.next();
      value += 1n; // pay more Award points next time
      return 'win';
    }
    return 'guess again';
  };

  const publicFacet = Far('points for primes', {
    makeInvitation: () => zcf.makeInvitation(play, 'play'),
  });
  return harden({ publicFacet });
};

harden(start);
export { start };
