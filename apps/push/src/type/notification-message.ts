export type NotificationMessage = {
  title: string,
  body: string
}

export const createNotificationMessage = (title: string, body: string) => {
  return {title: title,  body: body}
}
