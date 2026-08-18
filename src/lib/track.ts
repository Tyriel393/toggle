export type TrackPayload = Record<string, string | number | boolean | null>

export type TrackEvent = {
  id: number
  name: string
  payload: TrackPayload
  at: number
}

/*
 * Instrumentation stub. In production this would be the analytics client
 * (Mixpanel or equivalent); here it feeds the console and the demo Events
 * panel so the funnel from the metrics plan is visible in the prototype.
 */
let nextId = 1
const buffer: TrackEvent[] = []
const listeners = new Set<() => void>()

export function track(name: string, payload: TrackPayload = {}): void {
  const event: TrackEvent = { id: nextId++, name, payload, at: Date.now() }
  buffer.push(event)
  if (buffer.length > 50) buffer.shift()
  console.info(`[track] ${name}`, payload)
  for (const listener of listeners) listener()
}

let snapshot: readonly TrackEvent[] = []

export function subscribeTrack(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getTrackLog(): readonly TrackEvent[] {
  if (snapshot.length !== buffer.length || snapshot[snapshot.length - 1] !== buffer[buffer.length - 1]) {
    snapshot = [...buffer]
  }
  return snapshot
}
