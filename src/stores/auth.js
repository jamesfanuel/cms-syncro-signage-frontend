import { writable } from "svelte/store";
import { getUserSession } from "../../usecases/auth";

export const auth = writable({
    ...getUserSession(),
});
