import { writable } from 'svelte/store';

export const customers = writable([]);
export const selectedCustomer = writable(null);
