export const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function formatTimeString(time: string | null): string {
  if (!time) return '00:00'

  const [hour, minute] = time.split(':')

  return `${hour}:${minute}`
}
