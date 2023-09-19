import { HeaderParameter } from './parameter';

export type Header = Omit<HeaderParameter, 'name' | 'in'>;
