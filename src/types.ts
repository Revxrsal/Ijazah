export type Gender = "ذكر" | "أنثى"
export const BOT_URL = "https://t.me/gherasal3elm_bot"

export type SerialResponse = {
  success: boolean,
  serial: number
}

export type Submission = {
  name: string,
  gender: Gender,
  watchedAll: boolean,
}