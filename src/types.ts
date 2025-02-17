export type Gender = "ذكر" | "أنثى"
export const BOT_URL = "https://t.me/gherasal3elm_bot"
export type Filter = "Certs only" | "Ijazat only";

export type SerialResponse = {
  success: boolean,
  id: number
}

export type Submission = {
  name: string,
  gender: Gender,
  watchedAll: boolean,
}