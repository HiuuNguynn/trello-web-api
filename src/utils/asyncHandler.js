/**
 * Async handler wrapper để tự động catch lỗi từ async route handlers
 * và pass vào error handling middleware
 * @param {Function} fn - Async function (controller handler)
 * @returns {Function} - Wrapped function với error handling
 */
export const asyncHandler = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
