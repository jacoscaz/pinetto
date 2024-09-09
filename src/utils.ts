
import type { DatetimeFn } from './types';

export const datetimeVoid: DatetimeFn = () => '';

export const datetimeISO: DatetimeFn = () => `${new Date().toISOString()} `;

