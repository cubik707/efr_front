import { cultures } from '../../../state/cultures/cultures'

export const culturesArray = Object.entries(cultures).map(([value, label]) => ({ value, label }));