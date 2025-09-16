const limits = new Map()

export function rateLimit(key, max, windowMs) {
  const now = Date.now()
  const userLimits = limits.get(key) || { count: 0, reset: now + windowMs }
  
  if (now > userLimits.reset) {
    userLimits.count = 1
    userLimits.reset = now + windowMs
  } else {
    userLimits.count++
  }
  
  limits.set(key, userLimits)
  
  return {
    limited: userLimits.count > max,
    remaining: Math.max(0, max - userLimits.count),
    reset: userLimits.reset
  }
}