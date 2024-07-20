import { alertError } from "$lib/components/alert";

// wrapper to execute a pocketbase client request and generate alerts on failure
export async function alertOnFailure(request: () => void) {
  try {
    await request();
  } catch (e: any) {
    const {
      message,
      data: { data = {} },
    } = e;
    if (message) alertError(message);
    for (const key in data) {
      const { message } = data[key];
      if (message) alertError(`${key}: ${message}`);
    }
  }
}
