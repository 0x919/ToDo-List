import { isAxiosError } from "axios";

/**
 *
 * @param err The error object to handle
 * @returns A user-friendly error message
 */
export function handleAxiosError(err: unknown) {
  return isAxiosError(err) && err.response?.data.error ? err.response?.data.error : "An unknown error occured";
}
