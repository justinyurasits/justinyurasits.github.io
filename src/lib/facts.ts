// How pages read the facts register. Only claims about Justin and his products come from
// here (product spec §5). Fees are never read by pages.
import data from '../../content/facts.json';
import { parseRegister, productStatus as statusOf } from './register.mjs';

export const facts = parseRegister(data);
export const productStatus = (key: string) => statusOf(facts, key);
