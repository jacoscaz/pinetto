
import type { DatetimeFn } from './types.js';

export const datetimeVoid: DatetimeFn = () => '';

export const datetimeISO: DatetimeFn = () => `${new Date().toISOString()} `;

