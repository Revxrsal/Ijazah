export type Gender = "ذكر" | "أنثى"

export type SerialResponse = {
  success: boolean,
  serial: number
}

export type Submission = {
  name: string,
  gender: Gender,
  watchedAll: boolean,
}