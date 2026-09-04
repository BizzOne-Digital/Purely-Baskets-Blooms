export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export function actionSuccess<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function actionError<T = never>(
  error: string,
  fieldErrors?: Record<string, string[]>
): ActionResult<T> {
  return { success: false, error, fieldErrors };
}

export function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}
