const queue: any[] = []
const activePreFlushCbs: any[] = []
let isFlushPending = false
const p = Promise.resolve()
export function nextTick(fn?) {
  return fn ? p.then(fn) : p
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job)
  }

  // 微任务执行job
  queueFlush()
}

export function queuePreFlushCb(job) {
  activePreFlushCbs.push(job)

  queueFlush()
}

/**
 * @description: 使用Promise来异步执行job，减少更新的次数
 * @param {*}
 * @return {*}
 */
function queueFlush() {
  if (isFlushPending) {
    return
  }
  isFlushPending = true

  nextTick(flushJobs)
}

function flushJobs() {
  isFlushPending = false

  flushPreFlushCbs()

  let job
  while ((job = queue.shift())) {
    job && job()
  }
}
function flushPreFlushCbs() {
  for (let i = 0; i < activePreFlushCbs.length; i++) {
    activePreFlushCbs[i]()
  }
}
